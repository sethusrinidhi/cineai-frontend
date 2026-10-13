import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Users, 
  Film, 
  DollarSign, 
  Clock, 
  AlertCircle, 
  BarChart3, 
  CheckCircle2, 
  RefreshCw,
  Server
} from 'lucide-react';
import { MOVIES_DATA, THEATER_SCREENS } from '../data/moviesData';

export default function AdminDashboard() {
  const [activeLocks, setActiveLocks] = useState([
    {
      id: 'LOCK-TX-8491',
      movieTitle: 'Dune: Part Two',
      screen: 'Screen 1 (IMAX Grand Laser)',
      seats: ['D7', 'D8'],
      userId: 'usr_sarah92',
      ipAddress: '192.168.1.42',
      remainingSeconds: 214,
      status: 'HELD (PESSIMISTIC_WRITE)'
    },
    {
      id: 'LOCK-TX-9032',
      movieTitle: 'Oppenheimer',
      screen: 'Screen 2 (VIP Onyx Lounge)',
      seats: ['B4', 'B5'],
      userId: 'usr_robert88',
      ipAddress: '10.0.0.15',
      remainingSeconds: 140,
      status: 'HELD (PESSIMISTIC_WRITE)'
    }
  ]);

  const [collisionLogs, setCollisionLogs] = useState([
    {
      id: 'COLL-01',
      timestamp: '17:21:44',
      seat: 'D7',
      primaryUser: 'usr_sarah92 (Lock Held)',
      conflictingUser: 'usr_alex23 (Rejected)',
      exception: 'org.hibernate.PessimisticLockException - Lock timeout',
      resolved: 'HTTP 409 Conflict returned - Double booking strictly prevented'
    },
    {
      id: 'COLL-02',
      timestamp: '17:18:02',
      seat: 'C4',
      primaryUser: 'usr_devon (Lock Held)',
      conflictingUser: 'usr_maya (Rejected)',
      exception: 'MySQL Error 1205: Lock wait timeout exceeded',
      resolved: 'Transaction rolled back automatically'
    }
  ]);

  const handleForceRelease = (lockId) => {
    setActiveLocks(activeLocks.filter(l => l.id !== lockId));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Brand Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Admin Control Center
            </span>
            <span className="text-xs text-slate-400">
              Brand Ecosystem: Sunnychanu Technologies
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            CineAI Enterprise Operations Console
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, MySQL pessimistic locking tables, occupancy monitoring, and AI recommendations tuning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Server size={14} />
            <span>Spring Boot Core: Active (Port 8080)</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Box Office</div>
            <div className="text-2xl font-black text-white font-mono mt-1">$48,290.00</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <span>+14.8% vs last week</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active ACID Locks</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">{activeLocks.length} Active</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Max hold timeout: 5 minutes
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Collisions Prevented</div>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">100%</div>
            <div className="text-[11px] text-emerald-400 mt-1">
              0 Duplicate seat bookings
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldCheck size={22} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Cinema Occupancy</div>
            <div className="text-2xl font-black text-purple-400 font-mono mt-1">87.4%</div>
            <div className="text-[11px] text-slate-400 mt-1">
              Across 3 premium halls
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Users size={22} />
          </div>
        </div>

      </div>

      {/* Active ACID Locks Monitor Table */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-amber-400" />
            <h3 className="text-lg font-bold text-white">Live ACID Pessimistic Seat Lock Table</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Table: <code className="text-amber-400">cineai_seat_locks</code> (MySQL InnoDB)
          </span>
        </div>

        {activeLocks.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No active locks currently held. All seats unlocked and available in public pool.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                <tr>
                  <th className="pb-3">Transaction ID</th>
                  <th className="pb-3">Movie & Hall</th>
                  <th className="pb-3">Seats</th>
                  <th className="pb-3">Holder</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">TTL Remaining</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {activeLocks.map(lock => (
                  <tr key={lock.id} className="text-slate-300">
                    <td className="py-3 text-cyan-400 font-bold">{lock.id}</td>
                    <td className="py-3 font-sans font-medium text-white">
                      {lock.movieTitle} <span className="text-slate-500 text-[11px]">({lock.screen})</span>
                    </td>
                    <td className="py-3 text-amber-300 font-bold">{lock.seats.join(', ')}</td>
                    <td className="py-3 text-slate-400 font-sans">{lock.userId} ({lock.ipAddress})</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {lock.status}
                      </span>
                    </td>
                    <td className="py-3 text-emerald-400 font-bold">{lock.remainingSeconds}s</td>
                    <td className="py-3 text-right font-sans">
                      <button
                        onClick={() => handleForceRelease(lock.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                      >
                        Force Release
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Concurrent Collision Prevention Audit Log */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400" />
            <h3 className="text-lg font-bold text-white">ACID Concurrency Double-Booking Interceptions</h3>
          </div>
          <span className="text-xs text-slate-400">
            Pessimistic concurrency control audit log
          </span>
        </div>

        <div className="space-y-3">
          {collisionLogs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">[{log.timestamp}] Collision Event #{log.id} on Seat {log.seat}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-sans">
                  Resolved Automatically
                </span>
              </div>
              <div className="text-slate-300">
                Primary Lock Holder: <span className="text-white">{log.primaryUser}</span> | Conflicting Requester: <span className="text-rose-400">{log.conflictingUser}</span>
              </div>
              <div className="text-slate-500 text-[11px]">
                Internal JPA Trace: <code>{log.exception}</code>
              </div>
              <div className="text-emerald-400 text-[11px] font-sans">
                ✓ {log.resolved}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
