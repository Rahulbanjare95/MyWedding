import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
          setShowPrompt(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUserInteraction = () => {
    setShowPrompt(false);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Handle error
      });
    }
  };

  useEffect(() => {
    // Try to autoplay after a short delay
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        }).catch(() => {
          // Autoplay prevented, show prompt
          setShowPrompt(true);
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        src="/audio/wedding-song.mp3"
      />

      {/* Music prompt overlay */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleUserInteraction}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Music className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl mb-3 text-gray-800" style={{ fontFamily: 'var(--font-elegant)' }}>
                Enhance Your Experience
              </h3>
              <p className="text-gray-600 mb-6">
                Play our wedding soundtrack for the perfect ambiance
              </p>
              <button
                onClick={handleUserInteraction}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Play Music
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music control */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.3], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}
