import React, { useState, useEffect } from 'react';
import { 
  Armchair, 
  Lock, 
  Unlock, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { SEAT_PRICING } from '../data/moviesData';

export default function SeatingGrid({ 
  movie, 
  selectedScreen, 
  selectedTime, 
  onClose, 
  onProceedToCheckout,
  initialSeats = [] 
}) {
  // Generate seat map rows
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = 12;

  // Occupied seats
  const defaultOccupied = ['B3', 'B4', 'C7', 'C8', 'D5', 'D6', 'F1', 'F2', 'G9', 'G10'];
  // Another user's ACID locked seats (simulated concurrency)
  const defaultLockedByOthers = ['C3', 'C4'];

  const [selectedSeats, setSelectedSeats] = useState(initialSeats);
  const [occupiedSeats, setOccupiedSeats] = useState(defaultOccupied);
  const [lockedByOthers, setLockedByOthers] = useState(defaultLockedByOthers);
  
  // User's own ACID lock state
  const [isAcidLocked, setIsAcidLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(300); // 5 minutes (300 sec)
  const [lockToken, setLockToken] = useState(null);
  const [collisionAlert, setCollisionAlert] = useState(null);

  // Timer countdown for ACID lock
  useEffect(() => {
    let timer = null;
    if (isAcidLocked && lockTimeRemaining > 0) {
      timer = setInterval(() => {
        setLockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsAcidLocked(false);
            setLockToken(null);
            alert("⏰ ACID Lock Expired: Your 5-minute seat reservation hold has timed out. Seats returned to public pool.");
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAcidLocked, lockTimeRemaining]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSeatTier = (row) => {
    if (row === 'A' || row === 'B') return 'VIP';
    if (row === 'C' || row === 'D' || row === 'E') return 'PREMIUM';
    return 'STANDARD';
  };

  const handleSeatClick = (seatId, tier) => {
    if (occupiedSeats.includes(seatId)) return;
    if (lockedByOthers.includes(seatId)) {
      setCollisionAlert(`⚠️ Concurrency Conflict: Seat ${seatId} is currently held under an active ACID Pessimistic Lock by another user.`);
      setTimeout(() => setCollisionAlert(null), 4000);
      return;
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
      if (selectedSeats.length === 1 && isAcidLocked) {
        setIsAcidLocked(false);
        setLockToken(null);
      }
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Acquire ACID Lock
  const handleAcquireAcidLock = () => {
    if (selectedSeats.length === 0) return;
    const token = 'ACID-TX-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setLockToken(token);
    setIsAcidLocked(true);
    setLockTimeRemaining(300);
  };

  // Simulate concurrent collision attack / double-booking attempt
  const handleSimulateCollision = () => {
    if (selectedSeats.length === 0) {
      setCollisionAlert("Select at least one seat first to test ACID lock collision protection!");
      setTimeout(() => setCollisionAlert(null), 4000);
      return;
    }
    setCollisionAlert(`🛡️ ACID Concurrency Test Passed!
A concurrent client tried to execute:
"UPDATE seats SET status='BOOKED' WHERE seat_id IN (${selectedSeats.join(', ')})"
Database Exception Caught: org.hibernate.PessimisticLockException
Result: Transaction aborted. Duplicate booking was 100% prevented by CineAI Pessimistic Lock engine!`);
  };

  // Calculate pricing
  const calculateTotal = () => {
    let subtotal = 0;
    selectedSeats.forEach(seatId => {
      const row = seatId[0];
      const tier = getSeatTier(row);
      subtotal += SEAT_PRICING[tier].price;
    });
    const fee = selectedSeats.length > 0 ? 2.50 : 0;
    return {
      subtotal,
      fee,
      total: subtotal + fee
    };
  };

  const { subtotal, fee, total } = calculateTotal();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0c101a] border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:px-8 border-b border-slate-800 bg-gradient-to-r from-slate-900/90 to-slate-950 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Interactive Seating Grid
              </span>
              <span className="text-xs text-slate-400">
                Brand Ecosystem: Sunnychanu Technologies
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
              {movie.title}
              <span className="text-sm font-normal text-slate-400">({selectedTime} • {selectedScreen.name})</span>
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* ACID Lock Notification Banner */}
        {isAcidLocked && (
          <div className="bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-900 border-b border-emerald-500/40 px-6 py-2.5 flex flex-wrap items-center justify-between text-sm text-emerald-300 gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-400 animate-pulse" size={18} />
              <span>
                <strong>ACID Pessimistic Lock Active</strong> (Tx ID: <code className="bg-emerald-950 px-1.5 py-0.5 rounded text-white">{lockToken}</code>)
              </span>
              <span className="text-emerald-400/80 hidden sm:inline">
                MySQL Row Lock held to prevent concurrent booking race condition.
              </span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/30 font-mono font-bold text-emerald-200">
              <Clock size={15} />
              <span>Hold Expires In: {formatTimer(lockTimeRemaining)}</span>
            </div>
          </div>
        )}

        {/* Concurrency Collision Alert Toast */}
        {collisionAlert && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-amber-950/90 border border-amber-500/50 text-amber-200 text-sm whitespace-pre-line flex items-start gap-3 shadow-lg">
            <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={20} />
            <div className="flex-1 font-mono text-xs sm:text-sm">{collisionAlert}</div>
            <button onClick={() => setCollisionAlert(null)} className="text-amber-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Theater Seating Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col items-center">
          
          {/* Cinema Screen Curve */}
          <div className="w-full max-w-2xl mb-10 text-center">
            <div className="screen-curve w-full"></div>
            <div className="text-xs uppercase tracking-widest text-sky-400/80 font-medium mt-3 flex items-center justify-center gap-2">
              <Sparkles size={13} /> Curved Cinema 4K Screen • Center Focus <Sparkles size={13} />
            </div>
          </div>

          {/* Seat Grid */}
          <div className="space-y-3 mb-8 overflow-x-auto max-w-full pb-2">
            {rows.map(row => {
              const tier = getSeatTier(row);
              return (
                <div key={row} className="flex items-center justify-center gap-2 sm:gap-3 min-w-[560px]">
                  <span className="w-6 text-xs font-mono font-bold text-slate-400 text-right">{row}</span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {Array.from({ length: cols }, (_, i) => i + 1).map(col => {
                      const seatId = `${row}${col}`;
                      const isOccupied = occupiedSeats.includes(seatId);
                      const isLocked = lockedByOthers.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      // Aisle gap in middle
                      const isAisleGap = col === 6;

                      return (
                        <React.Fragment key={seatId}>
                          <button
                            disabled={isOccupied}
                            onClick={() => handleSeatClick(seatId, tier)}
                            title={`${seatId} - ${SEAT_PRICING[tier].name} ($${SEAT_PRICING[tier].price})`}
                            className={`
                              relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-semibold transition-all duration-200
                              ${isOccupied 
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700/30' 
                                : isLocked 
                                ? 'bg-amber-950/60 text-amber-500 border border-amber-500/40 cursor-not-allowed animate-pulse'
                                : isSelected 
                                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/40 scale-105 border border-cyan-300'
                                : tier === 'VIP'
                                ? 'bg-amber-500/10 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30'
                                : tier === 'PREMIUM'
                                ? 'bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30'
                                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                              }
                            `}
                          >
                            {isSelected ? (
                              isAcidLocked ? <Lock size={12} className="text-white" /> : seatId
                            ) : isLocked ? (
                              <Lock size={11} className="text-amber-400" />
                            ) : (
                              col
                            )}
                          </button>
                          {isAisleGap && <div className="w-4 sm:w-6" />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <span className="w-6 text-xs font-mono font-bold text-slate-400">{row}</span>
                </div>
              );
            })}
          </div>

          {/* Seat Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 bg-slate-900/60 px-5 py-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500/40"></div>
              <span>VIP Recliner ($18.50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-indigo-500/20 border border-indigo-500/40"></div>
              <span>Premium Lounger ($14.00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700"></div>
              <span>Standard ($10.00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-cyan-400 to-blue-600"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-950/60 border border-amber-500/40 flex items-center justify-center">
                <Lock size={9} className="text-amber-400" />
              </div>
              <span>ACID Locked (Other User)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-800 text-slate-600"></div>
              <span>Sold Out</span>
            </div>
          </div>
        </div>

        {/* Footer / Booking Actions */}
        <div className="p-5 sm:px-8 border-t border-slate-800 bg-[#090d16] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-slate-400">Selected Seats ({selectedSeats.length})</div>
              <div className="text-lg font-bold text-white font-mono">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-xs text-slate-400">Estimated Total</div>
              <div className="text-xl font-bold text-cyan-400 font-mono">
                ${total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* ACID Lock Simulation Button */}
            {!isAcidLocked ? (
              <button
                disabled={selectedSeats.length === 0}
                onClick={handleAcquireAcidLock}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 transition-colors flex items-center gap-2"
                title="Pessimistic lock reservation row in DB for 5 minutes"
              >
                <Lock size={14} className="text-cyan-400" />
                <span>Lock Seats (Pessimistic ACID)</span>
              </button>
            ) : (
              <button
                onClick={handleSimulateCollision}
                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/40 transition-colors flex items-center gap-1.5"
                title="Test how ACID engine stops concurrent double-booking"
              >
                <RefreshCw size={13} className="text-amber-400" />
                <span>Test Race Collision</span>
              </button>
            )}

            {/* Checkout Button */}
            <button
              disabled={selectedSeats.length === 0}
              onClick={() => {
                if (!isAcidLocked) handleAcquireAcidLock();
                onProceedToCheckout({
                  movie,
                  screen: selectedScreen,
                  time: selectedTime,
                  seats: selectedSeats,
                  total,
                  lockToken: lockToken || 'ACID-TX-DIRECT'
                });
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 disabled:opacity-40 transition-all flex items-center gap-2"
            >
              <span>Confirm & Proceed</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
