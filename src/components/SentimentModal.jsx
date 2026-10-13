import React from 'react';
import { 
  X, 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  CheckCircle, 
  MessageSquare, 
  BarChart3, 
  Zap,
  Ticket
} from 'lucide-react';

export default function SentimentModal({ movie, onClose, onBookNow }) {
  if (!movie) return null;
  const { sentiment } = movie;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0c101a] border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="relative p-6 sm:px-8 border-b border-slate-800 bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-purple-400">
                  CineAI NLP Sentiment Microservice
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">Sunnychanu Technologies</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                Sentiment Summary: {movie.title}
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Main Score & Verdict Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-950/40 border border-purple-500/30 flex flex-col items-center justify-center text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                {sentiment.score}%
              </div>
              <div className="text-xs font-semibold text-purple-200 mt-1 uppercase tracking-wide">
                Positive Sentiment
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Based on {sentiment.totalReviews.toLocaleString()} reviews
              </div>
            </div>

            <div className="sm:col-span-2 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-center">
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" /> AI Synthesized Verdict
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {sentiment.verdict}
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                "{sentiment.summary}"
              </p>
            </div>
          </div>

          {/* Aspect-Based Sentiment Ratings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <BarChart3 size={15} className="text-cyan-400" /> Aspect-Based Sentiment Dimensions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(sentiment.aspects).map(([key, val]) => {
                const label = key === 'visuals' ? 'Visual Effects & Cinematography' 
                            : key === 'soundDesign' ? 'Sound Design & Musical Score'
                            : key === 'storyPacing' ? 'Story Structure & Screenplay'
                            : 'Performances & Acting Depth';
                return (
                  <div key={key} className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">{label}</span>
                      <span className="font-mono font-bold text-cyan-400">{val}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500" 
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pros */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-2 mb-3">
                <ThumbsUp size={15} /> Audience Praises
              </div>
              <ul className="space-y-2">
                {sentiment.pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-2 mb-3">
                <ThumbsDown size={15} /> Critical Considerations
              </div>
              <ul className="space-y-2">
                {sentiment.cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Verified Quotes */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare size={14} /> Representative Verified Impressions
            </div>
            <div className="space-y-2 text-xs text-slate-300 italic">
              <p>• "The sound mixing will vibrate your soul. Must watch in 70mm IMAX." — verified booking #TX-891</p>
              <p>• "A masterclass in modern storytelling. The third act keeps you on the edge of your recliner." — verified booking #TX-344</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 sm:px-8 border-t border-slate-800 bg-[#090d16] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onBookNow(movie);
            }}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
          >
            <Ticket size={16} />
            <span>Book Tickets For {movie.title}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
