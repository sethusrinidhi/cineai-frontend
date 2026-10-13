import React, { useState } from 'react';
import { 
  Film, 
  Sparkles, 
  Armchair, 
  Ticket, 
  ShieldCheck, 
  BookOpen, 
  User, 
  Lock, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  bookingCount, 
  onOpenArchitecture, 
  onOpenAuth,
  currentUser,
  onToggleRole
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-[#07090e]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('MOVIES')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#090d16] rounded-2xl flex items-center justify-center">
              <Film size={22} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                v1.0
              </span>
            </div>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              By Sunnychanu Technologies
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('MOVIES')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'MOVIES' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            Movies & Showtime
          </button>

          <button
            onClick={() => setActiveTab('RECOMMENDATIONS')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'RECOMMENDATIONS' 
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>AI Discovery</span>
          </button>

          <button
            onClick={() => setActiveTab('BOOKINGS')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'BOOKINGS' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Ticket size={14} />
            <span>My E-Tickets</span>
            {bookingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                {bookingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('ADMIN')}
            className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'ADMIN' 
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck size={14} />
            <span>Admin Console</span>
          </button>
        </nav>

        {/* Right Actions: Synopsis & JWT Auth Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Project Synopsis Trigger */}
          <button
            onClick={onOpenArchitecture}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition-colors shadow-sm"
            title="View B.Tech Major Project Synopsis and Multi-Tier Architecture"
          >
            <BookOpen size={14} className="text-cyan-400" />
            <span className="hidden sm:inline">Project Synopsis</span>
          </button>

          {/* User Role / JWT Pill */}
          <button
            onClick={onToggleRole}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 flex items-center gap-2 transition-all"
            title="Click to toggle between USER and ADMIN role (simulates JWT Claims)"
          >
            <div className={`w-2 h-2 rounded-full ${currentUser.role === 'ADMIN' ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span className="text-[11px]">
              {currentUser.role === 'ADMIN' ? 'ROLE_ADMIN' : 'ROLE_USER'}
            </span>
          </button>

        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 bg-[#07090e] px-2 py-2 text-[11px] font-semibold text-slate-400">
        <button 
          onClick={() => setActiveTab('MOVIES')}
          className={`px-3 py-1.5 rounded-lg ${activeTab === 'MOVIES' ? 'text-cyan-400 bg-cyan-950/40' : ''}`}
        >
          Movies
        </button>
        <button 
          onClick={() => setActiveTab('RECOMMENDATIONS')}
          className={`px-3 py-1.5 rounded-lg ${activeTab === 'RECOMMENDATIONS' ? 'text-purple-400 bg-purple-950/40' : ''}`}
        >
          AI Match
        </button>
        <button 
          onClick={() => setActiveTab('BOOKINGS')}
          className={`px-3 py-1.5 rounded-lg ${activeTab === 'BOOKINGS' ? 'text-cyan-400 bg-cyan-950/40' : ''}`}
        >
          Tickets ({bookingCount})
        </button>
        <button 
          onClick={() => setActiveTab('ADMIN')}
          className={`px-3 py-1.5 rounded-lg ${activeTab === 'ADMIN' ? 'text-indigo-400 bg-indigo-950/40' : ''}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
}
