import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  Clock, 
  Ticket, 
  BarChart3, 
  Search, 
  Filter, 
  Film,
  ChevronRight
} from 'lucide-react';
import { MOVIES_DATA } from '../data/moviesData';

export default function MovieCatalog({ onBookMovie, onViewSentiment }) {
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = ['ALL', 'Sci-Fi', 'Action', 'Drama', 'Adventure', 'Animation'];

  const filteredMovies = MOVIES_DATA.filter(movie => {
    const matchesGenre = selectedGenre === 'ALL' || movie.genres.includes(selectedGenre);
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Catalog Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Now Showing & AI Recommendations</span>
            <Sparkles size={20} className="text-cyan-400" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified cinema listings optimized with predictive neural seat allocations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search movie title, director, genre..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Genre Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedGenre === genre
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {genre === 'ALL' ? 'All Cinema Releases' : genre}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map(movie => (
          <div 
            key={movie.id}
            className="group glass-card rounded-3xl overflow-hidden flex flex-col border border-slate-800/80 hover:border-slate-700 transition-all duration-300"
          >
            {/* Poster Header */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-[#0c101a]/40 to-transparent" />
              
              {/* Badges on Poster */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/90 text-slate-950 backdrop-blur-md shadow-md">
                  {movie.cineAiMatch}% AI Match
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-200 border border-purple-500/30 backdrop-blur-md">
                  {movie.sentiment.score}% Positive Sentiment
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10">
                <Star size={12} className="fill-amber-400" />
                <span>{movie.imdbRating}</span>
              </div>

              {/* Formats at bottom of poster */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <div className="flex gap-1.5">
                  {movie.formats.map((fmt, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 text-[10px] font-mono border border-slate-700">
                      {fmt}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{movie.duration}</span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {movie.synopsis}
                </p>
                <div className="text-[11px] text-slate-400 mt-2">
                  Director: <span className="text-slate-200 font-medium">{movie.director}</span>
                </div>
              </div>

              {/* Showtimes Pills */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Available Showtimes:</span>
                  <span className="text-cyan-400 font-normal">Click to Book</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.screens[0].times.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => onBookMovie(movie, movie.screens[0], time)}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => onViewSentiment(movie)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BarChart3 size={14} className="text-purple-400" />
                  <span>Review AI</span>
                </button>

                <button
                  onClick={() => onBookMovie(movie, movie.screens[0], movie.screens[0].times[0])}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <Ticket size={14} />
                  <span>Select Seats</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
