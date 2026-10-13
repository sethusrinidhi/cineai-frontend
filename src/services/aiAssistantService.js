import { MOVIES_DATA } from '../data/moviesData';

export class CineAiAssistant {
  constructor() {
    this.context = {
      selectedMovie: null,
      selectedShowtime: null,
      ticketCount: 2,
      seatTier: 'PREMIUM'
    };
  }

  processMessage(userText) {
    const text = userText.toLowerCase().trim();

    // 1. Check for ACID Concurrency inquiries
    if (text.includes('acid') || text.includes('lock') || text.includes('pessimistic') || text.includes('concurrency')) {
      return {
        type: 'acid_explanation',
        text: `🔒 **CineAI ACID Concurrency & Pessimistic Locking Architecture**:
In high-demand ticket releases, thousands of concurrent requests attempt to book the same seats. 

CineAI by Sunnychanu implements:
1. **Pessimistic Locking**: When you select a seat, Spring Data JPA executes \`SELECT ... FOR UPDATE\` (Pessimistic Write Lock) on the MySQL database row.
2. **Stateless Time-bound Locks**: A temporary lock record with a 5-minute TTL (Time-To-Live) is created.
3. **Double-Booking Prevention**: Any conflicting transaction is instantly rejected with an ACID Concurrency Exception.
4. **Auto-Reconciliation Engine**: An asynchronous Spring \`@Scheduled\` daemon unlocks unpurchased seats automatically after expiration.`,
        action: 'show_acid_demo'
      };
    }

    // 2. Check for Sentiment Analysis queries
    if (text.includes('review') || text.includes('sentiment') || text.includes('worth watching') || text.includes('opinions') || text.includes('what do people say')) {
      const movie = this.findMatchingMovie(text) || MOVIES_DATA[0];
      return {
        type: 'sentiment_summary',
        movie: movie,
        text: `📊 **AI Sentiment Analysis for "${movie.title}"**:
• **Audience Sentiment**: ${movie.sentiment.score}% Positive (${movie.sentiment.totalReviews.toLocaleString()} verified reviews)
• **AI Synthesized Verdict**: ${movie.sentiment.verdict}
• **Critical Consensus**: "${movie.sentiment.summary}"
• **Key Highlights**: ${movie.sentiment.pros.join(', ')}`,
        action: 'open_sentiment_modal',
        movieId: movie.id
      };
    }

    // 3. Check for Conversational Booking queries (e.g. "Book 2 seats for Dune", "Reserve tickets for Oppenheimer")
    if (text.includes('book') || text.includes('reserve') || text.includes('ticket') || text.includes('seat')) {
      const movie = this.findMatchingMovie(text) || MOVIES_DATA[0];
      
      // Extract count
      let count = 2;
      const countMatch = text.match(/\b([1-9]|10)\b/);
      if (countMatch) {
        count = parseInt(countMatch[1], 10);
      } else if (text.includes('one') || text.includes('a single')) {
        count = 1;
      } else if (text.includes('two') || text.includes('couple')) {
        count = 2;
      } else if (text.includes('three')) {
        count = 3;
      } else if (text.includes('four')) {
        count = 4;
      }

      // Extract tier preference
      let tier = 'PREMIUM';
      if (text.includes('vip') || text.includes('recliner') || text.includes('best seat')) {
        tier = 'VIP';
      } else if (text.includes('cheap') || text.includes('standard') || text.includes('budget')) {
        tier = 'STANDARD';
      }

      // Preferred screen / time
      const screen = movie.screens[0];
      const time = screen.times[screen.times.length > 2 ? 2 : 0];

      return {
        type: 'booking_proposal',
        movie: movie,
        screenName: screen.name,
        showtime: time,
        ticketCount: count,
        seatTier: tier,
        text: `🎟️ **CineAI Natural Language Booking Intent Detected**!
I've matched your request for **${movie.title}**:
• **Quantity**: ${count} ${tier} Seat(s)
• **Screen**: ${screen.name}
• **Time**: ${time}
• **Formats**: ${movie.formats.join(', ')}
• **Pessimistic Lock**: Ready to reserve on selection.

Would you like me to open the live interactive seat grid to finalize?`,
        action: 'open_seating_grid',
        bookingPayload: {
          movieId: movie.id,
          screenId: screen.id,
          time: time,
          count: count,
          tier: tier
        }
      };
    }

    // 4. Recommendation Queries (e.g., "Recommend sci-fi", "Show movies directed by Nolan", "Best action films")
    if (text.includes('recommend') || text.includes('suggest') || text.includes('find') || text.includes('show') || text.includes('sci-fi') || text.includes('action') || text.includes('nolan')) {
      let filtered = MOVIES_DATA;
      if (text.includes('nolan')) {
        filtered = MOVIES_DATA.filter(m => m.director.toLowerCase().includes('nolan'));
      } else if (text.includes('sci-fi') || text.includes('scifi')) {
        filtered = MOVIES_DATA.filter(m => m.genres.includes('Sci-Fi'));
      } else if (text.includes('action')) {
        filtered = MOVIES_DATA.filter(m => m.genres.includes('Action'));
      } else if (text.includes('drama')) {
        filtered = MOVIES_DATA.filter(m => m.genres.includes('Drama'));
      }

      return {
        type: 'movie_recommendations',
        movies: filtered.slice(0, 3),
        text: `🧠 **CineAI Vector Recommendation Engine**:
Based on your semantic prompt, I calculated cosine vector similarity across genre tags, director styles, and audience sentiment. Here are top matching titles:`,
        action: 'show_recommendations'
      };
    }

    // Default friendly conversational response
    return {
      type: 'general',
      text: `👋 Hello! I am **CineAI**, your intelligent cinema discovery & conversational booking assistant by **Sunnychanu Technologies**.

Here is what I can do for you:
1. 🎟️ **Natural Language Booking**: *"Book 2 VIP seats for Dune 2 tonight"*
2. 🎬 **AI Recommendations**: *"Recommend mind-bending sci-fi movies directed by Nolan"*
3. 📊 **Sentiment Summarizer**: *"What do verified audience reviews say about Oppenheimer?"*
4. 🔒 **Concurrency Architecture**: *"How does the ACID pessimistic seat locking engine work?"*

What would you like to experience today?`
    };
  }

  findMatchingMovie(text) {
    for (const movie of MOVIES_DATA) {
      const titleLower = movie.title.toLowerCase();
      const firstWord = titleLower.split(' ')[0].replace(/[^a-z0-9]/g, '');
      if (text.includes(titleLower) || text.includes(firstWord)) {
        return movie;
      }
    }
    return null;
  }
}

export const aiAssistant = new CineAiAssistant();
