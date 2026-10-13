import React from 'react';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Film,
  Download
} from 'lucide-react';

export default function MyBookings({ bookings = [], onBrowseMovies }) {
  if (bookings.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
          <Ticket size={28} />
        </div>
        <h3 className="text-xl font-bold text-white">No Active Cinema Bookings Found</h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          You haven't reserved any movie tickets yet. Use our conversational AI or browse the movie catalog to book your seats with ACID concurrency protection.
        </p>
        <button
          onClick={onBrowseMovies}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
        >
          Explore Movies & Book Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <span>My E-Tickets & Gate Passes</span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            {bookings.length} Confirmed
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Present your digital barcode or QR code at cinema turnstiles for contactless entry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking, idx) => (
          <div 
            key={booking.ticketId || idx}
            className="rounded-3xl bg-gradient-to-br from-slate-900 via-[#0d1322] to-slate-950 border border-slate-800 p-6 shadow-xl relative overflow-hidden"
          >
            {/* Ticket Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  CONFIRMED & PERSISTED
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">{booking.movieTitle}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{booking.screenName}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Ticket Pass ID</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{booking.ticketId}</span>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="py-4 grid grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 text-[11px] block">Showtime</span>
                <span className="font-semibold text-white">{booking.time}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Reserved Seats</span>
                <span className="font-mono font-bold text-cyan-400">{booking.seats.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Paid Amount</span>
                <span className="font-mono font-bold text-emerald-400">${booking.total?.toFixed(2)}</span>
              </div>
            </div>

            {/* QR Code and Verification footer */}
            <div className="pt-4 border-t border-dashed border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* SVG Mini QR */}
                <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="24" height="24" fill="black" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" fill="black" />
                    <rect x="66" y="10" width="24" height="24" fill="black" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" fill="black" />
                    <rect x="10" y="66" width="24" height="24" fill="black" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" fill="black" />
                    <rect x="42" y="42" width="16" height="16" fill="black" />
                  </svg>
                </div>
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-300 font-mono block">Auth: {booking.lockToken}</span>
                  <span className="text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={12} /> ACID Double-Booking Verified
                  </span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
