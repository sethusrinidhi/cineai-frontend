import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieCatalog from './components/MovieCatalog';
import AiDiscovery from './components/AiDiscovery';
import MyBookings from './components/MyBookings';
import AdminDashboard from './components/AdminDashboard';
import SeatingGrid from './components/SeatingGrid';
import SentimentModal from './components/SentimentModal';
import CheckoutModal from './components/CheckoutModal';
import ArchitectureModal from './components/ArchitectureModal';
import AiAssistantWidget from './components/AiAssistantWidget';
import { MOVIES_DATA } from './data/moviesData';
import { 
  ShieldCheck, 
  Sparkles, 
  Film, 
  Heart, 
  Terminal, 
  Layers, 
  BookOpen, 
  Database,
  Lock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('MOVIES'); // 'MOVIES' | 'RECOMMENDATIONS' | 'BOOKINGS' | 'ADMIN'
  const [currentUser, setCurrentUser] = useState({
    id: 'usr_sunnychanu',
    name: 'Sunny Chanu',
    role: 'USER', // 'USER' | 'ADMIN'
    jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdW5ueWNoYW51Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl19'
  });

  // Booking history
  const [bookings, setBookings] = useState([
    {
      ticketId: 'CN-SUNNY-784291',
      movieTitle: 'Interstellar: 10th Anniversary Re-Release',
      screenName: 'Screen 1 (IMAX Grand Laser)',
      time: '07:15 PM',
      date: 'Oct 12, 2026',
      seats: ['D7', 'D8'],
      total: 30.50,
      lockToken: 'ACID-TX-INIT88',
      bookingTimestamp: new Date().toISOString()
    }
  ]);

  // Modal States
  const [isSeatingOpen, setIsSeatingOpen] = useState(false);
  const [isSentimentOpen, setIsSentimentOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  // Active Selections for Booking
  const [selectedMovie, setSelectedMovie] = useState(MOVIES_DATA[0]);
  const [selectedScreen, setSelectedScreen] = useState(MOVIES_DATA[0].screens[0]);
  const [selectedTime, setSelectedTime] = useState(MOVIES_DATA[0].screens[0].times[0]);
  const [initialSeats, setInitialSeats] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);

  // Handlers
  const handleBookMovie = (movie, screen = null, time = null, seatCount = 2) => {
    setSelectedMovie(movie);
    const chosenScreen = screen || movie.screens[0];
    setSelectedScreen(chosenScreen);
    setSelectedTime(time || chosenScreen.times[0]);
    // Pre-select seats if requested by AI
    if (seatCount === 1) setInitialSeats(['D6']);
    else if (seatCount === 2) setInitialSeats(['D6', 'D7']);
    else if (seatCount === 3) setInitialSeats(['D5', 'D6', 'D7']);
    else setInitialSeats([]);

    setIsSeatingOpen(true);
  };

  const handleViewSentiment = (movie) => {
    setSelectedMovie(movie);
    setIsSentimentOpen(true);
  };

  const handleProceedToCheckout = (data) => {
    setCheckoutData(data);
    setIsSeatingOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBookingCompleted = (ticket) => {
    setBookings(prev => [ticket, ...prev]);
  };

  const handleToggleRole = () => {
    const nextRole = currentUser.role === 'USER' ? 'ADMIN' : 'USER';
    setCurrentUser(prev => ({
      ...prev,
      role: nextRole
    }));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.length}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        currentUser={currentUser}
        onToggleRole={handleToggleRole}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab 1: Movies & Showcase */}
        {activeTab === 'MOVIES' && (
          <div>
            <HeroBanner 
              onBookMovie={handleBookMovie}
              onViewSentiment={handleViewSentiment}
              onAskAi={(prompt) => {
                // If user uses hero search bar, simulate opening AI Copilot response
                const assistantBtn = document.querySelector('button[title*="Copilot"]') || null;
                alert(`CineAI Intent Parsed: "${prompt}".\nOpening relevant movie details or seating grid.`);
                const found = MOVIES_DATA.find(m => prompt.toLowerCase().includes(m.title.toLowerCase().split(' ')[0]));
                if (found) {
                  handleBookMovie(found);
                } else {
                  handleBookMovie(MOVIES_DATA[0]);
                }
              }}
            />

            <MovieCatalog 
              onBookMovie={handleBookMovie}
              onViewSentiment={handleViewSentiment}
            />
          </div>
        )}

        {/* Tab 2: AI Recommendations */}
        {activeTab === 'RECOMMENDATIONS' && (
          <AiDiscovery 
            onBookMovie={handleBookMovie}
            onViewSentiment={handleViewSentiment}
          />
        )}

        {/* Tab 3: My E-Tickets */}
        {activeTab === 'BOOKINGS' && (
          <MyBookings 
            bookings={bookings}
            onBrowseMovies={() => setActiveTab('MOVIES')}
          />
        )}

        {/* Tab 4: Admin Console */}
        {activeTab === 'ADMIN' && (
          <AdminDashboard />
        )}

      </main>

      {/* Floating AI Assistant Copilot */}
      <AiAssistantWidget 
        onTriggerBooking={(movie, screenName, time, count) => {
          const m = movie || MOVIES_DATA[0];
          const s = m.screens.find(s => s.name === screenName) || m.screens[0];
          handleBookMovie(m, s, time || s.times[0], count);
        }}
        onTriggerSentiment={(movie) => {
          handleViewSentiment(movie || MOVIES_DATA[0]);
        }}
      />

      {/* Modals */}
      {isSeatingOpen && (
        <SeatingGrid 
          movie={selectedMovie}
          selectedScreen={selectedScreen}
          selectedTime={selectedTime}
          initialSeats={initialSeats}
          onClose={() => setIsSeatingOpen(false)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {isSentimentOpen && (
        <SentimentModal 
          movie={selectedMovie}
          onClose={() => setIsSentimentOpen(false)}
          onBookNow={(m) => handleBookMovie(m)}
        />
      )}

      {isCheckoutOpen && checkoutData && (
        <CheckoutModal 
          bookingData={checkoutData}
          onClose={() => setIsCheckoutOpen(false)}
          onBookingCompleted={handleBookingCompleted}
        />
      )}

      {isArchitectureOpen && (
        <ArchitectureModal 
          onClose={() => setIsArchitectureOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/80 bg-[#090d16] text-xs text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
              C
            </div>
            <div>
              <div className="text-white font-bold text-sm">CineAI by Sunnychanu</div>
              <div className="text-[11px] text-slate-400">
                Brand Ecosystem: Sunnychanu Technologies • B.Tech Major Project
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <button 
              onClick={() => setIsArchitectureOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              Academic Synopsis
            </button>
            <button 
              onClick={() => setActiveTab('ADMIN')}
              className="hover:text-cyan-400 transition-colors"
            >
              ACID Lock Telemetry
            </button>
            <button 
              onClick={() => setActiveTab('RECOMMENDATIONS')}
              className="hover:text-cyan-400 transition-colors"
            >
              ML Recommender
            </button>
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:text-white transition-colors"
            >
              Back to Top ↑
            </a>
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            Spring Boot 3 • MySQL ACID • React + Tailwind • Python AI
          </div>
        </div>
      </footer>

    </div>
  );
}
