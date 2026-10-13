import React, { useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Cpu, 
  Zap, 
  Film, 
  Ticket, 
  BarChart3, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { MOVIES_DATA } from '../data/moviesData';

export default function AiDiscovery({ onBookMovie, onViewSentiment }) {
  // Taste vector dimensions: [Sci-Fi, Action, Drama, Visuals]
  const [preferences, setPreferences] = useState({
    scifi: 85,
    action: 70,
    drama: 75,
    visuals: 90
  });

  // Movie feature weights: [scifi, action, drama, visuals]
  const movieProfiles = {
    'movie-1': { scifi: 95, action: 88, drama: 80, visuals: 98 }, // Dune 2
    'movie-2': { scifi: 60, action: 50, drama: 98, visuals: 92 }, // Oppenheimer
    'movie-3': { scifi: 98, action: 65, drama: 92, visuals: 96 }, // Interstellar
    'movie-4': { scifi: 80, action: 95, drama: 70, visuals: 99 }, // Spider-Man
    'movie-5': { scifi: 92, action: 85, drama: 68, visuals: 94 }, // Cyberpunk 2099
    'movie-6': { scifi: 40, action: 88, drama: 85, visuals: 95 }  // The Batman 2
  };

  // Compute cosine similarity between preference vector and movie feature vector
  const computeSimilarity = (p, m) => {
    const dotProduct = (p.scifi * m.scifi) + (p.action * m.action) + (p.drama * m.drama) + (p.visuals * m.visuals);
    const magP = Math.sqrt(p.scifi**2 + p.action**2 + p.drama**2 + p.visuals**2);
    const magM = Math.sqrt(m.scifi**2 + m.action**2 + m.drama**2 + m.visuals**2);
    if (magP === 0 || magM === 0) return 0;
    return Math.round((dotProduct / (magP * magM)) * 100);
  };

  // Ranked movies by computed vector score
  const rankedMovies = MOVIES_DATA.map(movie => {
    const profile = movieProfiles[movie.id] || { scifi: 70, action: 70, drama: 70, visuals: 70 };
    const score = computeSimilarity(preferences, profile);
    return {
      ...movie,
      computedScore: score
    };
  }).sort((a, b) => b.computedScore - a.computedScore);

  const presets = [
    { label: "Mind-Bending Sci-Fi & IMAX", scifi: 95, action: 70, drama: 85, visuals: 98 },
    { label: "High-Octane Action Thriller", scifi: 70, action: 98, drama: 50, visuals: 90 },
    { label: "Emotional Deep Masterpieces", scifi: 60, action: 40, drama: 98, visuals: 85 }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            Vector Embedding Recommender
          </span>
          <span className="text-xs text-slate-400">
            Sunnychanu Technologies ML Microservice
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          Personalized Cinema Taste Vector Engine
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Adjust your multidimensional preference coordinates to compute real-time cosine similarity against movie latent embeddings.
        </p>
      </div>

      {/* Preset Vector Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 shrink-0">Profile Presets:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setPreferences({
              scifi: preset.scifi,
              action: preset.action,
              drama: preset.drama,
              visuals: preset.visuals
            })}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-purple-950/40 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40 transition-colors whitespace-nowrap"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Interactive Vector Sliders */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-semibold">Sci-Fi & Cosmos Weight</span>
            <span className="font-mono font-bold text-cyan-400">{preferences.scifi}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={preferences.scifi}
            onChange={e => setPreferences({ ...preferences, scifi: parseInt(e.target.value) })}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-semibold">Action & Adrenaline</span>
            <span className="font-mono font-bold text-amber-400">{preferences.action}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={preferences.action}
            onChange={e => setPreferences({ ...preferences, action: parseInt(e.target.value) })}
            className="w-full accent-amber-400 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-semibold">Drama & Emotional Depth</span>
            <span className="font-mono font-bold text-pink-400">{preferences.drama}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={preferences.drama}
            onChange={e => setPreferences({ ...preferences, drama: parseInt(e.target.value) })}
            className="w-full accent-pink-400 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-semibold">Visual Grandeur & IMAX</span>
            <span className="font-mono font-bold text-purple-400">{preferences.visuals}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={preferences.visuals}
            onChange={e => setPreferences({ ...preferences, visuals: parseInt(e.target.value) })}
            className="w-full accent-purple-400 cursor-pointer"
          />
        </div>

      </div>

      {/* Ranked Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Zap size={18} className="text-amber-400" />
          <span>Real-Time Cosine Similarity Rankings</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedMovies.map((movie, rank) => (
            <div 
              key={movie.id}
              className="rounded-3xl bg-slate-900/60 border border-slate-800 p-5 flex flex-col justify-between space-y-4 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-xl shadow-md shrink-0" 
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      #{rank + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                      {movie.computedScore}% MATCH
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1 leading-snug">{movie.title}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">{movie.genres.join(', ')}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Rating: <strong className="text-white">IMDb {movie.imdbRating}</strong></div>
                </div>
              </div>

              {/* Similarity bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Cosine Similarity Vector</span>
                  <span className="text-purple-300 font-mono font-bold">{movie.computedScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" 
                    style={{ width: `${movie.computedScore}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                <button
                  onClick={() => onViewSentiment(movie)}
                  className="px-2 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <BarChart3 size={13} className="text-purple-400" />
                  <span>Sentiment</span>
                </button>
                <button
                  onClick={() => onBookMovie(movie, movie.screens[0], movie.screens[0].times[0])}
                  className="px-2 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-1 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <Ticket size={13} />
                  <span>Book Now</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
