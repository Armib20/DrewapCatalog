'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from '@/components/AudioPlayer';
import { Music, Instagram } from 'lucide-react';
import Image from 'next/image';

export interface Song {
  id: number;
  title: string;
  artist: string;
  file: string;
  coverArt?: string;
}

// This will be your songs data - you can later move this to a JSON file or API
const songs: Song[] = [
  {
    id: 1,
    title: "when i was a kid",
    artist: "Drewap",
    file: "/songs/when i was a kid final.wav",
  },
  {
    id: 2,
    title: "Cameras",
    artist: "Drewap",
    file: "/songs/cameras final.wav",
  },
  {
    id: 4,
    title: "oouuuu",
    artist: "Drewap",
    file: "/songs/oouuuu final.wav",
  },
  {
    id: 5,
    title: "Real Speal",
    artist: "Drewap",
    file: "/songs/Real Speal.wav",
  },
  {
    id: 3,
    title: "Just Be Real With It",
    artist: "Drewap",
    file: "/songs/Just Be Real With It FINAL.wav",
  },
];

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentIndex = currentSong ? songs.findIndex(s => s.id === currentSong.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < songs.length - 1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentSong(songs[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black">
      <div className={`container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-7xl ${currentSong ? 'pb-40 sm:pb-48' : ''}`}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <Music className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-4 sm:mb-6" strokeWidth={2.5} />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 sm:mb-6 text-yellow-400 tracking-wide font-[family-name:var(--font-cormorant)]">
            DREWAP
          </h1>
          
          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <a 
              href="https://www.instagram.com/drewappppp/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
            </a>
            <a 
              href="https://open.spotify.com/artist/5uItFGdLdRqn3syeR6VOiF?si=RVEQOjqQRNyBkLPmkzfaRQ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-yellow-400 transition-colors duration-200"
              aria-label="Spotify"
            >
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
          </div>
          
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-2 font-light font-[family-name:var(--font-montserrat)] tracking-wide">
            Japan exclusive for fakemink, wegonebeok, sixbill, DJ Banned, Emwell, 1300saint, and others
          </p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - Image */}
          <div className="lg:col-span-4 order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 sm:h-80 lg:h-[500px]"
            >
              <Image
                src="/images/concert.png"
                alt="Concert"
                fill
                className="object-cover border-2 border-yellow-400/30 bg-black"
                priority
              />
            </motion.div>
          </div>

          {/* Center Column - Tracks */}
          <div className="lg:col-span-4 order-2">
            <div className="space-y-2 sm:space-y-3">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentSong(song)}
                  className={`group cursor-pointer border-2 transition-all duration-200 active:scale-[0.98] touch-manipulation ${
                    currentSong?.id === song.id
                      ? 'border-yellow-400 bg-yellow-400/5'
                      : 'border-white/10 active:border-yellow-400/50'
                  }`}
                >
                  <div className="flex items-center p-4 sm:p-6">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg sm:text-xl transition-colors ${
                      currentSong?.id === song.id
                        ? 'text-yellow-400'
                        : 'text-white/40 group-active:text-yellow-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 ml-3 sm:ml-4 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                        {song.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 truncate">{song.artist}</p>
                    </div>
                    <Music
                      className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-colors ${
                        currentSong?.id === song.id
                          ? 'text-yellow-400'
                          : 'text-white/20 group-active:text-yellow-400/50'
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-4 order-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full aspect-square"
            >
              <Image
                src="/images/drewmink.jpeg"
                alt="Drew Mink"
                fill
                className="object-cover border-2 border-yellow-400/30 bg-black"
              />
            </motion.div>
          </div>

          {/* Bottom Images */}
          <div className="lg:col-span-6 order-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-square mt-6 lg:mt-8"
            >
              <Image
                src="/images/drewnyc.png"
                alt="Drew NYC"
                fill
                className="object-cover border-2 border-yellow-400/30 bg-black"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-6 order-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full aspect-square mt-6 lg:mt-8"
            >
              <Image
                src="/images/drewok.jpeg"
                alt="Drew OK"
                fill
                className="object-cover border-2 border-yellow-400/30 bg-black"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {currentSong && (
        <AudioPlayer 
          song={currentSong} 
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}
    </main>
  );
}

