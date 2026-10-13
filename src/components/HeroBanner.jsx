import React, { useState } from 'react';
import { 
  Sparkles, 
  Ticket, 
  BarChart3, 
  Play, 
  Star, 
  Clock, 
  Send, 
  Bot, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { MOVIES_DATA } from '../data/moviesData';

export default function HeroBanner({ onBookMovie, onViewSentiment, onAskAi }) {
  const featuredMovie = MOVIES_DATA[0]; // Dune: Part Two
  const [promptInput, setPromptInput] = useState('');

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onAskAi(promptInput.trim());
    setPromptInput('');
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-2xl mb-12">
      
      {/* Background Graphic & Gradients */}
      <div className="absolute inset-0 z-0">
        <img 
          src={featuredMovie.backdrop} 
          alt={featuredMovie.title} 
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/70 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-4xl space-y-6">
        
        {/* CineAI Match Tag */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles size={14} className="text-cyan-400" />
            <span>{featuredMovie.cineAiMatch}% AI Match Score</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span>IMDb {featuredMovie.imdbRating}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs">
            <Clock size={13} />
            <span>{featuredMovie.duration}</span>
          </div>
        </div>

        {/* Title and Tagline */}
        <div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {featuredMovie.title}
          </h1>
          <p className="text-base sm:text-lg text-cyan-300/90 font-medium italic mt-2">
            "{featuredMovie.tagline}"
          </p>
        </div>

        {/* Synopsis */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl line-clamp-3">
          {featuredMovie.synopsis}
        </p>

        {/* Formats and Director */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400">Available in:</span>
          {featuredMovie.formats.map((fmt, i) => (
            <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 font-mono font-bold">
              {fmt}
            </span>
          ))}
          <span className="text-slate-500 mx-2">•</span>
          <span className="text-slate-400">Directed by <strong className="text-white">{featuredMovie.director}</strong></span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => onBookMovie(featuredMovie)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 hover:scale-[1.02] transition-all"
          >
            <Ticket size={18} />
            <span>Book Instant Seats</span>
          </button>

          <button
            onClick={() => onViewSentiment(featuredMovie)}
            className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <BarChart3 size={18} className="text-purple-400" />
            <span>AI Review Sentiment ({featuredMovie.sentiment.score}% Positive)</span>
          </button>
        </div>

        {/* Conversational AI Search Quick Bar */}
        <div className="pt-4 max-w-2xl">
          <form 
            onSubmit={handlePromptSubmit}
            className="relative flex items-center rounded-2xl bg-slate-900/90 border border-slate-700/80 focus-within:border-cyan-500/80 shadow-lg p-1.5 transition-all"
          >
            <div className="pl-3 pr-2 text-cyan-400">
              <Bot size={20} />
            </div>
            <input 
              type="text"
              value={promptInput}
              onChange={e => setPromptInput(e.target.value)}
              placeholder="Ask CineAI: 'Book 2 seats for Dune at 6:45 PM' or 'Recommend sci-fi thrillers'..."
              className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
            >
              <span>Ask AI</span>
              <Send size={13} />
            </button>
          </form>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Natural language queries automatically trigger Spring Boot ACID reservation workflows.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
