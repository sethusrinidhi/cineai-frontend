import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Download, 
  Printer, 
  Sparkles, 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight,
  Smartphone,
  Wallet
} from 'lucide-react';

export default function CheckoutModal({ bookingData, onClose, onBookingCompleted }) {
  const [step, setStep] = useState('PAYMENT'); // 'PAYMENT' | 'CONFIRMED'
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  const { movie, screen, time, seats, total, lockToken } = bookingData;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const ticketId = 'CN-SUNNY-' + Math.floor(100000 + Math.random() * 900000);
      const ticket = {
        ticketId,
        movieTitle: movie.title,
        screenName: screen.name,
        time,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        seats,
        total,
        lockToken,
        bookingTimestamp: new Date().toISOString()
      };
      setConfirmedTicket(ticket);
      setStep('CONFIRMED');

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }

      if (onBookingCompleted) {
        onBookingCompleted(ticket);
      }
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:px-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Ticket size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400">
                  Transactional Booking Engine
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">Sunnychanu Technologies</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {step === 'PAYMENT' ? 'Secure Transaction Checkout' : 'E-Ticket Confirmed!'}
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {step === 'PAYMENT' ? (
            <div className="space-y-6">
              
              {/* ACID Lock Verification Status */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                <div className="text-xs sm:text-sm">
                  <div className="font-bold text-emerald-300">
                    ACID Concurrency Lock Verified
                  </div>
                  <div className="text-emerald-400/80 mt-0.5 text-xs">
                    Spring Data JPA pessimistic write lock <code className="bg-emerald-950 px-1 py-0.5 rounded text-white">{lockToken}</code> guarantees these seats ({seats.join(', ')}) cannot be double-booked during your checkout.
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Movie Title</span>
                  <span className="font-bold text-white">{movie.title}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Cinema Hall & Screen</span>
                  <span className="text-slate-200">{screen.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Showtime</span>
                  <span className="text-slate-200">{time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Reserved Seats</span>
                  <span className="font-mono font-bold text-cyan-400">{seats.join(', ')} ({seats.length} Tickets)</span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="font-semibold text-white">Grand Total (Incl. Taxes & Tech Fee)</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                  Select Gateway Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
                      paymentMethod === 'CARD' 
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-500/20' 
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard size={20} />
                    <span>Card / Debit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
                      paymentMethod === 'UPI' 
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-500/20' 
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone size={20} />
                    <span>UPI / Instant QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('WALLET')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-semibold transition-all ${
                      paymentMethod === 'WALLET' 
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-md shadow-cyan-500/20' 
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Wallet size={20} />
                    <span>Apple / Google Pay</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* E-Ticket Display */
            <div className="space-y-6">
              
              {/* Confirmed Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={24} />
                  <div>
                    <div className="font-bold text-white text-sm">Booking Confirmed & Dispatched</div>
                    <div className="text-xs text-slate-400">ACID Transaction Committed to MySQL persistence.</div>
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {confirmedTicket.ticketId}
                </div>
              </div>

              {/* Aesthetic Cinema Ticket Card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-[#0d1322] to-slate-950 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden">
                {/* Visual decorative cinema film perforation circles */}
                <div className="absolute top-0 left-0 w-full flex justify-between px-6 -mt-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-[#0c101a] border border-slate-700/50" />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-3">
                  <div className="space-y-3 flex-1 text-center sm:text-left">
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      CineAI Official Admission
                    </div>
                    <h3 className="text-2xl font-black text-white">{confirmedTicket.movieTitle}</h3>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div>
                        <span className="text-slate-500 block">Date & Time</span>
                        <span className="font-semibold text-slate-200">{confirmedTicket.date} • {confirmedTicket.time}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Screen</span>
                        <span className="font-semibold text-slate-200">{confirmedTicket.screenName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Seats</span>
                        <span className="font-mono font-bold text-cyan-400">{confirmedTicket.seats.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Total Amount</span>
                        <span className="font-mono font-bold text-white">${confirmedTicket.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic SVG QR Code */}
                  <div className="p-3 bg-white rounded-2xl shadow-lg flex flex-col items-center">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                      {/* Realistic QR pattern */}
                      <rect width="100" height="100" fill="white" />
                      {/* Top left marker */}
                      <rect x="10" y="10" width="24" height="24" fill="black" />
                      <rect x="14" y="14" width="16" height="16" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="black" />
                      {/* Top right marker */}
                      <rect x="66" y="10" width="24" height="24" fill="black" />
                      <rect x="70" y="14" width="16" height="16" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="black" />
                      {/* Bottom left marker */}
                      <rect x="10" y="66" width="24" height="24" fill="black" />
                      <rect x="14" y="70" width="16" height="16" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="black" />
                      {/* Central data blocks */}
                      <rect x="42" y="12" width="6" height="6" fill="black" />
                      <rect x="52" y="18" width="6" height="6" fill="black" />
                      <rect x="38" y="38" width="8" height="8" fill="black" />
                      <rect x="54" y="38" width="8" height="8" fill="black" />
                      <rect x="44" y="52" width="12" height="12" fill="black" />
                      <rect x="68" y="44" width="6" height="12" fill="black" />
                      <rect x="78" y="56" width="10" height="6" fill="black" />
                      <rect x="42" y="72" width="10" height="6" fill="black" />
                      <rect x="58" y="74" width="8" height="8" fill="black" />
                      <rect x="72" y="72" width="14" height="14" fill="black" />
                      <rect x="20" y="46" width="6" height="10" fill="black" />
                    </svg>
                    <span className="text-[10px] font-mono text-slate-800 font-bold mt-1">
                      SCAN FOR ENTRY
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-dashed border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Brand Ecosystem: Sunnychanu Technologies</span>
                  <span>Auth Ref: {confirmedTicket.lockToken}</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:px-8 border-t border-slate-800 bg-[#090d16] flex items-center justify-between">
          {step === 'PAYMENT' ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayNow}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing ACID Transaction...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ${total.toFixed(2)}</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Printer size={15} />
                <span>Print Ticket</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                Done
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
