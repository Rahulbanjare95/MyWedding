import React from 'react';
import { motion } from 'motion/react';

const journeyStories = [
   {
    image: '/images/ourFirstDate.png',
    title: 'Our 1st Coffee!',
    caption: 'We knew it was special from the start',
  },
  {
    image: '/images/ourFirstEverFeelingOflove.PNG',
    title: 'Falling in Love!',
    caption: 'Laughter that brought us closer',
  },
  {
    image: '/images/ourLastTripMemories.png',
    title: 'The Bombae Ishq!',
    caption: 'Where our story began and still blooms',
  },{
    image: '/images/we-were-tied-forever.jpg',
    title: 'Stepping into Forever!',
    caption: 'We got rokafied and sealed our bond',
  }
];

export function JourneySection() {
  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Indian Decorative Elements */}
     
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl mb-4 text-rose-700"
            style={{ fontFamily: 'var(--font-elegant)' }}
          >
            Our Love Story
          </motion.h2>
          <motion.div
            className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          />
          <p className="text-lg md:text-xl text-gray-600" style={{ fontFamily: 'var(--font-elegant)' }}>
            A journey of love, laughter, and endless memories
          </p>
        </motion.div>

        {/* Photo thread design */}
        <div className="relative max-w-6xl mx-auto">
          {/* Thread line - Desktop */}
          <motion.div
            className="absolute left-0 right-0 top-32 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent hidden md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Thread line - Mobile */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-rose-300 to-transparent md:hidden"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-4 lg:gap-6">
            {journeyStories.map((story, index) => (
              <motion.div
                key={story.title}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Clothespin effect */}
                <div className="relative mx-auto max-w-[280px] md:max-w-[200px]">
                  {/* Pin */}
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-amber-800 rounded-sm z-20 shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-amber-900" />
                    <div className="absolute top-1 left-2 w-1 h-1 bg-amber-950 rounded-full" />
                    <div className="absolute top-1 right-2 w-1 h-1 bg-amber-950 rounded-full" />
                  </motion.div>

                  {/* Photo */}
                  <motion.div
                    className="relative bg-white p-3 shadow-xl"
                    style={{
                      transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-48 md:h-44 lg:h-48 object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', story.image);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="mt-3 text-center">
                      <p
                        className="text-base md:text-sm text-gray-800 mb-1"
                        style={{ fontFamily: 'var(--font-script)' }}
                      >
                        {story.title}
                      </p>
                      <p className="text-xs text-gray-600">{story.caption}</p>
                    </div>

                    {/* Decorative corner tape */}
                    <div className="absolute -top-2 -right-2 w-6 h-6">
                      <div className="w-full h-full bg-amber-100 opacity-50 transform rotate-45" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6">
                      <div className="w-full h-full bg-amber-100 opacity-50 transform rotate-45" />
                    </div>
                  </motion.div>

                  {/* Thread attachment */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-rose-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Love quote */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p
            className="text-xl md:text-2xl text-gray-600 italic max-w-2xl mx-auto px-4"
            style={{ fontFamily: 'var(--font-elegant)' }}
          >
            "In all the world, there is no heart for me like yours. 
            In all the world, there is no love for you like mine."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
