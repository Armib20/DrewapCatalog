'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { Song } from '@/app/page';

interface AudioPlayerProps {
  song: Song;
}

export default function AudioPlayer({ song }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Auto-play when song changes
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      // Auto-play prevented, user needs to interact first
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = parseFloat(e.target.value);
    audio.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-yellow-400 z-50"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ 
        type: "tween",
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <audio ref={audioRef} src={song.file} />

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile Layout */}
        <div className="flex flex-col gap-4">
          {/* Play Button & Song Info */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={togglePlay}
              disabled={!isLoaded}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-16 h-16 sm:w-14 sm:h-14 bg-yellow-400 active:bg-yellow-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-6 sm:h-6 text-black" fill="black" strokeWidth={0} />
              ) : (
                <Play className="w-7 h-7 sm:w-6 sm:h-6 text-black ml-0.5" fill="black" strokeWidth={0} />
              )}
            </motion.button>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white truncate">
                {song.title}
              </h3>
              <p className="text-sm text-white/60 truncate">{song.artist}</p>
            </div>

            {/* Volume - Hidden on mobile, visible on desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-yellow-400 transition-colors touch-manipulation p-2"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" strokeWidth={2.5} />
                ) : (
                  <Volume2 className="w-5 h-5" strokeWidth={2.5} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 appearance-none cursor-pointer volume-slider"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-white/80 font-mono w-10 sm:w-12 text-right flex-shrink-0">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative h-2 bg-white/20 touch-manipulation">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-400"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                disabled={!isLoaded}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer touch-manipulation"
              />
            </div>
            <span className="text-xs sm:text-sm text-white/80 font-mono w-10 sm:w-12 flex-shrink-0">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: #facc15;
          cursor: pointer;
        }

        .volume-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: #facc15;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  );
}

