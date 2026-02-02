import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Users } from 'lucide-react';

const timelineEvents = [
  {
    day: 'March 8',
    date: '2026',
    events: [
      {
        title: 'Floral Haldi',
        time: '1:00 PM',
        description: 'Haldi glow, music, and fun games, Laughs all around!',
        
      },
      {
        title: 'Engagement / Sangeet',
        time: '7:00 PM',
        description: 'Rings Exchanged, Dance Floor Ignited. Show your moves!',
        
      },
    ],
  },
  {
    day: 'March 9',
    date: '2026',
    events: [
      {
        title: 'Baraat',
        time: '3:00 PM',
        description: 'Road blocked by dancing baraatis, obviously.',
      },
      {
        title: 'Varmala',
        time: '6:00 PM',
        description: 'Two hearts, one moment, lifelong promise.',
      },
      {
        title: 'Reception',
        time: '8:00 PM',
        description: 'Dinner & celebrations',
      },
    ],
  },
];

export function EventsSection() {
  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Indian Decorative Elements */}
     

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
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
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Wedding Timeline
          </motion.h2>
          <motion.div
            className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          />
          <p className="text-lg md:text-xl text-gray-600" style={{ fontFamily: 'var(--font-elegant)' }}>
            Join us for the celebration of a lifetime
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
  {timelineEvents.map((dayEvents, dayIndex) => (
    <motion.div
      key={dayEvents.day}
      initial={{ opacity: 0, x: dayIndex === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: dayIndex * 0.2, duration: 0.8 }}
      className="flex flex-col"
    >
      {/* Day Header */}
      <div className="mb-6 text-center">
        <motion.div
          className="inline-flex items-center gap-2 mb-2"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: dayIndex * 0.2 + 0.2 }}
        >
          <Calendar className="w-5 h-5 text-rose-500" />
          <h3 className="text-2xl md:text-3xl text-rose-700" style={{ fontFamily: 'var(--font-elegant)' }}>
            {dayEvents.day}
          </h3>
        </motion.div>
        <p className="text-sm text-gray-500">{dayEvents.date}</p>
      </div>
      <div className="relative pl-6">
        {/* Vertical Line */}
        <div className="absolute left-1.5 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 to-rose-200" />

        {/* Events */}
        <div className="space-y-4">
          {dayEvents.events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: dayIndex * 0.2 + 0.3 + index * 0.1, duration: 0.6 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute -left-5 top-1.5 w-4 h-4 bg-rose-400 rounded-full border-4 border-white shadow-md"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.3 }}
              />

              {/* Event Card */}
              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md border border-rose-100/50 hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-800 line-clamp-2" style={{ fontFamily: 'var(--font-elegant)' }}>
                      {event.title}
                    </h4>

                    <div className="flex items-center gap-1 text-sm text-rose-600 mb-1">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{event.description}</p>

                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  ))}
</div>


        {/* Decorative dots */}
        <motion.div
          className="mt-12 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-rose-300"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
