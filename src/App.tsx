import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LandingSection } from './components/LandingSection';
import { NamesSection } from './components/NamesSection';
import { EventsSection } from './components/EventsSection';
import { JourneySection } from './components/JourneySection';
import { RsvpSection } from './components/RsvpSection';
import { LocationSection } from './components/LocationSection';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  const handleHeartClick = () => {
    // Rose petal confetti
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { x: 0.1, y: 0.9 },
      colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbcfe8'],
      shapes: ['circle', 'square'],
      gravity: 0.7,
      drift: 0.5,
      scalar: 1.2,
    });

    // Golden sparkle burst
    confetti({
      particleCount: 40,
      spread: 80,
      origin: { x: 0.1, y: 0.85 },
      colors: ['#fbbf24', '#fcd34d', '#fef08a', '#fef3c7'],
      shapes: ['star'],
      gravity: 0.5,
      ticks: 300,
      scalar: 1,
    });

    // Pink heart confetti
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x: 0.1, y: 0.88 },
      colors: ['#ff69b4', '#ff1493', '#f75eb6', '#ff85c0'],
      shapes: ['circle'],
      gravity: 0.8,
      scalar: 0.8,
    });

    // White sparkle confetti
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { x: 0.1, y: 0.9 },
      colors: ['#ffffff', '#f5f5f5', '#e5e5e5'],
      shapes: ['square'],
      gravity: 0.6,
      drift: -0.3,
      scalar: 0.6,
    });

    // Sky shot fireworks - Main burst from center top
    confetti({
      particleCount: 100,
      spread: 180,
      origin: { x: 0.5, y: 0.2 },
      colors: ['#ff1744', '#f50057', '#d500f9', '#651fff', '#2979f0', '#0091ff', '#00b8d4', '#00bcd4', '#00e5ff', '#76ff03'],
      shapes: ['circle'],
      gravity: 0.8,
      scalar: 1.5,
      ticks: 400,
    });

    // Sky shot left wing burst
    confetti({
      particleCount: 70,
      spread: 120,
      origin: { x: 0.2, y: 0.15 },
      colors: ['#ffd600', '#ffb300', '#ff6f00', '#ff5722', '#ff1744', '#d500f9'],
      shapes: ['star'],
      gravity: 0.9,
      scalar: 1.3,
      ticks: 450,
    });

    // Sky shot right wing burst
    confetti({
      particleCount: 70,
      spread: 120,
      origin: { x: 0.8, y: 0.15 },
      colors: ['#2196f3', '#00bcd4', '#00e5ff', '#ffea00', '#ff6f00', '#ff1744'],
      shapes: ['circle', 'square'],
      gravity: 0.9,
      scalar: 1.3,
      ticks: 450,
    });

    // Cascading shimmer effect from top
    confetti({
      particleCount: 120,
      spread: 160,
      origin: { x: 0.5, y: 0.1 },
      colors: ['#ffffff', '#fff3e0', '#fff9c4', '#ffeb3b', '#fdd835', '#fbbc04'],
      shapes: ['square'],
      gravity: 1.2,
      scalar: 0.8,
      ticks: 500,
      drift: 1,
    });

    // Slow floating sparkles for light show effect
    confetti({
      particleCount: 80,
      spread: 170,
      origin: { x: 0.5, y: 0.05 },
      colors: ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a'],
      shapes: ['circle'],
      gravity: 0.3,
      scalar: 1,
      ticks: 600,
      drift: 0.8,
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-scroll"
      style={{
        backgroundImage: 'url(/images/couple.png)',
      }}
    >
      {/* Heart Button - Left Side */}
      <motion.button
        onClick={handleHeartClick}
        className="fixed bottom-8 left-8 z-40 p-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart className="w-6 h-6 text-white fill-white" />
      </motion.button>

      <MusicPlayer />
      <LandingSection />
      
      {/* Frosted glass effect for all other sections */}
      <div className="backdrop-blur-md bg-white/20">
        <NamesSection />
        <EventsSection />
        <JourneySection />
        <RsvpSection />
        <LocationSection />
      </div>
    </div>
  );
}
