import React from 'react';
import { 
  X, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Terminal, 
  BookOpen, 
  CheckCircle2, 
  Award,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function ArchitectureModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c101a] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Academic Header */}
        <div className="p-6 sm:px-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-950 flex items-start justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING — B.TECH MAJOR PROJECT SYNOPSIS
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              CineAI by Sunnychanu
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 mt-1">
              An Intelligent Movie Discovery and Conversational Ticket Booking Platform
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
              <span><strong>Brand Ecosystem:</strong> Sunnychanu Technologies</span>
              <span>•</span>
              <span><strong>Domain:</strong> AI/ML & Enterprise Full-Stack Web Systems</span>
              <span>•</span>
              <span><strong>Status:</strong> Major Project Proposal & Technical Abstract</span>
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-xs sm:text-sm">
          
          {/* Abstract Section */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <BookOpen size={16} /> Official Abstract
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Traditional online cinema ticketing platforms rely heavily on manual search queries, multi-page filters, and rigid seat allocation grids. This project presents <strong>CineAI by Sunnychanu</strong>, a next-generation movie discovery and booking platform that integrates Artificial Intelligence directly into the commercial ticketing workflow. CineAI elevates the ticketing experience by offering natural language conversational booking assistance, personalized movie recommendation systems, and automated seat preference optimizations.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The system architecture consists of a decoupled multi-tier design. The backend core is built using <strong>Spring Boot</strong>, providing RESTful micro-services secured via <strong>Spring Security</strong> and stateless <strong>JSON Web Tokens (JWT)</strong>. Data persistence is managed using a normalized <strong>MySQL</strong> relational database, engineered with strict <strong>ACID compliance and pessimistic locking algorithms</strong> to prevent duplicate seat bookings during high-concurrency ticket sales. The frontend presentation layer is developed in <strong>React with Tailwind CSS</strong>, featuring interactive visual seat maps and a real-time AI booking assistant widget. An auxiliary <strong>AI service layer in Python</strong> processes natural language queries and computes recommendation vectors using machine learning algorithms.
            </p>
          </div>

          {/* Interactive Multi-Tier Architectural Diagram */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers size={16} className="text-indigo-400" /> Decoupled Multi-Tier Architecture Pipeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Frontend Presentation */}
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
                  <Terminal size={14} /> 1. Presentation Layer
                </div>
                <div className="font-bold text-white text-sm">React.js + Tailwind CSS</div>
                <ul className="space-y-1 text-slate-400 text-xs list-disc list-inside">
                  <li>Real-time dynamic visual seat map</li>
                  <li>CineAI Copilot conversational assistant</li>
                  <li>Aspect-based review sentiment visualizer</li>
                  <li>SVG QR Code digital ticket dispatch</li>
                </ul>
              </div>

              {/* Spring Boot Core Engine */}
              <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase">
                  <ShieldCheck size={14} /> 2. Core Booking Engine
                </div>
                <div className="font-bold text-white text-sm">Spring Boot 3 + Spring Data JPA</div>
                <ul className="space-y-1 text-slate-400 text-xs list-disc list-inside">
                  <li>Spring Security & stateless JWT Auth</li>
                  <li>ACID Pessimistic Locking (<code className="text-amber-300">PESSIMISTIC_WRITE</code>)</li>
                  <li>5-minute auto-releasing lock daemon</li>
                  <li>RESTful microservice endpoints</li>
                </ul>
              </div>

              {/* Auxiliary AI Microservice */}
              <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
                  <Cpu size={14} /> 3. Auxiliary AI Service
                </div>
                <div className="font-bold text-white text-sm">Python / FastAPI ML Microservice</div>
                <ul className="space-y-1 text-slate-400 text-xs list-disc list-inside">
                  <li>NLP intent & entity parsing</li>
                  <li>Cosine vector similarity recommendations</li>
                  <li>Sentiment aspect rating model</li>
                  <li>Context-aware conversational state</li>
                </ul>
              </div>

            </div>

            {/* Persistence Layer */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                    Persistence Layer • ACID Compliant MySQL Engine
                  </div>
                  <div className="text-xs text-slate-300">
                    Strict isolation level (<code>TRANSACTION_REPEATABLE_READ</code>), row-level locks on <code>cineai_seat_locks</code> to eliminate race conditions and double-booking.
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold shrink-0">
                100% Collision-Proof
              </div>
            </div>
          </div>

          {/* Core Modules & Capabilities Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> B.Tech Major Project Modules & Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wide text-cyan-300">
                  1. Conversational AI
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>Natural language seat reservation</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>Context-aware search assistant</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>Sentiment-based review summarizer</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wide text-indigo-300">
                  2. Core Booking Engine
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span>ACID-compliant concurrent seat locking</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span>JWT secure authentication</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                    <span>Transactional booking workflow</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wide text-purple-300">
                  3. Interactive UI Layer
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                    <span>Real-time dynamic theater seating grid</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                    <span>Personalized movie recommendations</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                    <span>Responsive user & admin dashboard</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 sm:px-8 border-t border-slate-800 bg-[#090d16] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            CineAI by Sunnychanu • Project Abstract & Specification
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
}
