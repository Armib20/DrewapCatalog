'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from '@/components/AudioPlayer';
import { Music } from 'lucide-react';
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
    title: "Track 1",
    artist: "Drewap",
    file: "/songs/track1.mp3",
  },
  {
    id: 2,
    title: "Track 2",
    artist: "Drewap",
    file: "/songs/track2.mp3",
  },
  {
    id: 3,
    title: "Track 3",
    artist: "Drewap",
    file: "/songs/track3.mp3",
  },
  {
    id: 4,
    title: "Track 4",
    artist: "Drewap",
    file: "/songs/track4.mp3",
  },
  {
    id: 5,
    title: "Track 5",
    artist: "Drewap",
    file: "/songs/track5.mp3",
  },
];

export default function Home() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-4 sm:mb-6 text-yellow-400 tracking-tight">
            DREWAP
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-2">
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
                src="/images/drewmink.jpeg"
                alt="Drew Mink"
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
              className="relative w-full h-64 sm:h-80 lg:h-[500px]"
            >
              <Image
                src="/images/drewnyc.png"
                alt="Drew NYC"
                fill
                className="object-cover border-2 border-yellow-400/30 bg-black"
              />
            </motion.div>
          </div>

          {/* Bottom Full-Width Image */}
          <div className="lg:col-span-12 order-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] mt-6 lg:mt-8"
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
      {currentSong && <AudioPlayer song={currentSong} />}
    </main>
  );
}

