import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function LandingSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-03-09T00:00:00');

    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Decorative Overlay */}
      
     
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-rose-300 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Decorative gradient orbs */}
     
      {/* Main Heading Section */}
      <h1 className="heading-main text-center leading-tight">
  <span style={{ fontFamily: 'var(--font-elegant)' }}>
    Rahul &amp; Hemanshi
  </span>
  <br />
  <span className="text-base md:text-xl text-gray-700 tracking-wide" style={{ fontFamily: 'var(--font-decorative)' }}>
    are getting married
  </span>
</h1>

      <div className="text-center z-10 w-full max-w-4xl pb-05 pt-64 md:pt-62">


        <p
          className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 px-4"
          style={{ fontFamily: 'var(--font-elegant)' }}
        >
          We invite you to join us on our special day.
        </p>

        {/* Countdown */}
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-12 justify-center px-4">
          {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
        <motion.div
          key={item.label}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-rose-100 min-w-[70px] sm:min-w-[80px] md:min-w-[100px]"
          whileHover={{ scale: 1.05, y: -5 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, delay: index * 0.2 },
            duration: 0.3
          }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl text-rose-600" style={{ fontFamily: 'var(--font-elegant)' }}>
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 mt-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-decorative)' }}>
            {item.label}
          </div>
        </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 md:mt-16">
          <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center mx-auto">
        <motion.div
          className="w-1.5 h-2 bg-rose-400 rounded-full mt-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
          </div>
        </div>
      </div>
    </section>
  );
}
