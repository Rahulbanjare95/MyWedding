import React from 'react';
import { motion } from 'motion/react';

export function MandalaDecoration({ className = '', position = 'top-left' }: { className?: string; position?: string }) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position as keyof typeof positionClasses]} opacity-10 pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 0.1, scale: 1, rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" className="text-rose-400">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
        {[...Array(8)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 100 100)`}>
            <path
              d="M100,20 Q110,50 100,80 Q90,50 100,20"
              fill="currentColor"
              opacity="0.3"
            />
            <circle cx="100" cy="20" r="5" fill="currentColor" />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

export function PaisleyPattern({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute opacity-10 pointer-events-none ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 0.1, y: 0 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    >
      <svg width="100" height="150" viewBox="0 0 100 150" className="text-amber-500">
        <path
          d="M50,10 Q80,30 85,70 Q88,100 70,120 Q50,135 35,120 Q20,100 25,70 Q30,40 50,10 Z"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M50,20 Q70,35 73,65 Q75,85 65,100 Q50,110 40,100 Q32,85 35,65 Q38,40 50,20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  );
}

export function LotusDecoration({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`absolute opacity-10 pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.1, scale: 1 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" className="text-pink-400">
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="60"
            rx="15"
            ry="40"
            fill="currentColor"
            opacity="0.3"
            transform={`rotate(${i * 45} 60 60)`}
          />
        ))}
        <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

export function DecorativeBorder({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-x-0 pointer-events-none ${className}`}>
      <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="none" className="text-rose-300">
        <pattern id="border-pattern" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="20" r="3" fill="currentColor" opacity="0.3" />
          <path d="M20,20 Q25,10 30,20 Q35,30 40,20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
        </pattern>
        <rect width="1200" height="40" fill="url(#border-pattern)" />
      </svg>
    </div>
  );
}
