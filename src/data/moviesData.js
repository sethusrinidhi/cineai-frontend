export const MOVIES_DATA = [
  {
    id: "movie-1",
    title: "Dune: Part Two",
    tagline: "Long live the fighters.",
    genres: ["Sci-Fi", "Adventure", "Action"],
    duration: "166 min",
    rating: "PG-13",
    imdbRating: "8.6",
    cineAiMatch: 98,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem"],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    formats: ["IMAX 3D", "Dolby Atmos", "4DX"],
    screens: [
      { id: "s1", name: "Screen 1 (IMAX Grand Laser)", times: ["10:30 AM", "02:15 PM", "06:45 PM", "10:15 PM"] },
      { id: "s2", name: "Screen 3 (Dolby Atmos Premiere)", times: ["11:45 AM", "04:00 PM", "08:30 PM"] }
    ],
    sentiment: {
      score: 96,
      totalReviews: 2480,
      verdict: "Overwhelmingly Positive (Masterpiece)",
      summary: "Denis Villeneuve delivers a breathtaking sci-fi epic. Audiences praise the phenomenal sound design, grand IMAX cinematography, and Hans Zimmer's intense score, making it a modern benchmark in epic world-building.",
      aspects: {
        visuals: 99,
        soundDesign: 98,
        storyPacing: 91,
        performances: 95
      },
      pros: [
        "Unrivaled visual grandeur and IMAX scale",
        "Thundering sound design and immersive acoustics",
        "Powerhouse performance by Chalamet & Austin Butler"
      ],
      cons: [
        "Demands familiarity with Part One world-building",
        "Lengthy runtime requiring commitment"
      ]
    }
  },
  {
    id: "movie-2",
    title: "Oppenheimer",
    tagline: "The world forever changes.",
    genres: ["Biography", "Drama", "History"],
    duration: "180 min",
    rating: "R",
    imdbRating: "8.9",
    cineAiMatch: 95,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, examining the moral weight and political aftermath of humanity's greatest weapon.",
    formats: ["70mm IMAX", "Dolby Cinema", "Standard"],
    screens: [
      { id: "s1", name: "Screen 1 (IMAX Grand Laser)", times: ["01:00 PM", "05:30 PM", "09:30 PM"] },
      { id: "s3", name: "Screen 2 (VIP Onyx Lounge)", times: ["12:15 PM", "04:45 PM", "08:45 PM"] }
    ],
    sentiment: {
      score: 94,
      totalReviews: 3120,
      verdict: "Critically Acclaimed (Cinematic Triumph)",
      summary: "Nolan's biographical drama holds tension without relying on conventional action. Ludwig Göransson's pulse-pounding score and Murphy's haunting portrayal of Oppenheimer are universally lauded.",
      aspects: {
        visuals: 94,
        soundDesign: 97,
        storyPacing: 89,
        performances: 99
      },
      pros: [
        "Career-defining performance by Cillian Murphy",
        "Incredible sound editing, especially the Trinity Test",
        "Stunning practical effects and non-linear pacing"
      ],
      cons: [
        "Heavy dialogue-centric third act in Senate hearings",
        "Fast-paced scientific jargon early on"
      ]
    }
  },
  {
    id: "movie-3",
    title: "Interstellar: 10th Anniversary Re-Release",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    duration: "169 min",
    rating: "PG-13",
    imdbRating: "8.7",
    cineAiMatch: 99,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80",
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.",
    formats: ["IMAX 70mm", "Dolby Atmos 4K"],
    screens: [
      { id: "s1", name: "Screen 1 (IMAX Grand Laser)", times: ["03:15 PM", "07:15 PM", "11:00 PM"] }
    ],
    sentiment: {
      score: 97,
      totalReviews: 5400,
      verdict: "Generational Masterpiece",
      summary: "A decade later, Interstellar remains a profound emotional and scientific journey. The iconic docking scene and Hans Zimmer's pipe organ score are celebrated as all-time cinema peaks.",
      aspects: {
        visuals: 98,
        soundDesign: 99,
        storyPacing: 92,
        performances: 96
      },
      pros: [
        "Unmatched emotional resonance between father and daughter",
        "Hans Zimmer's iconic organ score",
        "Scientifically grounded black hole rendering (Gargantua)"
      ],
      cons: [
        "Relativity theory dialogues require close attention",
        "Some dialogue mixed lower than sound effects"
      ]
    }
  },
  {
    id: "movie-4",
    title: "Spider-Man: Beyond the Spider-Verse",
    tagline: "It's how you wear the mask that counts.",
    genres: ["Animation", "Action", "Adventure"],
    duration: "140 min",
    rating: "PG",
    imdbRating: "8.8",
    cineAiMatch: 92,
    director: "Joaquim Dos Santos, Kemp Powers",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Daniel Kaluuya"],
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80",
    synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    formats: ["IMAX 3D", "4DX", "Dolby Atmos"],
    screens: [
      { id: "s2", name: "Screen 3 (Dolby Atmos Premiere)", times: ["10:00 AM", "01:30 PM", "05:00 PM", "08:15 PM"] }
    ],
    sentiment: {
      score: 95,
      totalReviews: 1890,
      verdict: "Visual Innovation Pinnacle",
      summary: "Revolutionary animation styles blending comic book art, watercolor, and neon punk aesthetics. Audiences admire the heart, character development, and adrenaline-pumping soundtrack.",
      aspects: {
        visuals: 100,
        soundDesign: 94,
        storyPacing: 93,
        performances: 92
      },
      pros: [
        "Groundbreaking multi-artstyle animation",
        "Deep emotional stakes and character arcs",
        "Electrifying modern soundtrack"
      ],
      cons: [
        "High sensory density can feel overwhelming to some",
        "Cliffhanger setup for the trilogy finale"
      ]
    }
  },
  {
    id: "movie-5",
    title: "Cyberpunk: Neo Tokyo 2099",
    tagline: "In a city of chrome, humanity is the rarest upgrade.",
    genres: ["Sci-Fi", "Action", "Thriller"],
    duration: "135 min",
    rating: "R",
    imdbRating: "8.4",
    cineAiMatch: 94,
    director: "Sunnychanu Directorial",
    cast: ["Ken Watanabe", "Ana de Armas", "Dev Patel", "Hiroyuki Sanada"],
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80",
    synopsis: "An AI detective and a rogue cybernetic engineer uncover an illicit synthetic soul market operating in the neon underbelly of Neo Tokyo, leading to a clash that threatens human autonomy.",
    formats: ["IMAX 3D", "Dolby Atmos", "ScreenX 270°"],
    screens: [
      { id: "s1", name: "Screen 1 (IMAX Grand Laser)", times: ["12:00 PM", "04:30 PM", "09:00 PM"] },
      { id: "s3", name: "Screen 2 (VIP Onyx Lounge)", times: ["02:30 PM", "07:00 PM", "11:15 PM"] }
    ],
    sentiment: {
      score: 92,
      totalReviews: 950,
      verdict: "High-Octane Cyberpunk Feast",
      summary: "A thrilling visual showcase from Sunnychanu Technologies studios. Praised for intricate world-building, razor-sharp synthwave soundscapes, and philosophical inquiries into synthetic consciousness.",
      aspects: {
        visuals: 97,
        soundDesign: 95,
        storyPacing: 90,
        performances: 91
      },
      pros: [
        "Lush neon dystopian art direction",
        "Pulsating synth-orchestral hybrid score",
        "Thoughtful AI ethics dialogue"
      ],
      cons: [
        "Complex plot twists require careful viewing",
        "Dark themes and intense combat scenes"
      ]
    }
  },
  {
    id: "movie-6",
    title: "The Batman: Part II",
    tagline: "You can't hide in the shadows when you are the shadow.",
    genres: ["Crime", "Action", "Mystery"],
    duration: "172 min",
    rating: "PG-13",
    imdbRating: "8.5",
    cineAiMatch: 91,
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Andy Serkis", "Colin Farrell", "Barry Keoghan"],
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    backdrop: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
    synopsis: "In a flooded Gotham City struggling under martial law, Bruce Wayne investigates the emergence of an enigmatic criminal syndicate operating beneath the waterlogged ruins of the city's elite families.",
    formats: ["IMAX", "Dolby Atmos", "Standard"],
    screens: [
      { id: "s1", name: "Screen 1 (IMAX Grand Laser)", times: ["02:00 PM", "06:15 PM", "10:30 PM"] },
      { id: "s2", name: "Screen 3 (Dolby Atmos Premiere)", times: ["03:30 PM", "07:45 PM"] }
    ],
    sentiment: {
      score: 93,
      totalReviews: 1640,
      verdict: "Gripping Neo-Noir Detective Thriller",
      summary: "Fans praise the gritty, rain-slicked atmosphere and intense psychological tension. Pattinson solidifies his brooding detective Batman, matched with Greig Fraser's immaculate moody lighting.",
      aspects: {
        visuals: 96,
        soundDesign: 94,
        storyPacing: 88,
        performances: 95
      },
      pros: [
        "Exceptional noir aesthetic and cinematography",
        "Grounded detective investigation storyline",
        "Atmospheric Gotham world-building"
      ],
      cons: [
        "Very dark tone and deliberate slow burn pace",
        "Nearly 3-hour duration"
      ]
    }
  }
];

export const THEATER_SCREENS = [
  {
    id: "s1",
    name: "Screen 1 - IMAX Grand Laser",
    type: "IMAX with Laser & 12.1 Audio",
    capacity: 120,
    rows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    cols: 14
  },
  {
    id: "s2",
    name: "Screen 2 - VIP Onyx Recliner Lounge",
    type: "Samsung Onyx LED 4K + Dolby Atmos",
    capacity: 64,
    rows: ["A", "B", "C", "D", "E"],
    cols: 10
  },
  {
    id: "s3",
    name: "Screen 3 - Dolby Atmos Premiere",
    type: "Laser Projection + Dolby Atmos 64-Channel",
    capacity: 96,
    rows: ["A", "B", "C", "D", "E", "F", "G"],
    cols: 12
  }
];

export const SEAT_PRICING = {
  VIP: { name: "VIP Recliner", price: 18.50, color: "from-amber-500 to-amber-600" },
  PREMIUM: { name: "Premium Lounger", price: 14.00, color: "from-indigo-500 to-indigo-600" },
  STANDARD: { name: "Classic Standard", price: 10.00, color: "from-sky-500 to-sky-600" }
};
