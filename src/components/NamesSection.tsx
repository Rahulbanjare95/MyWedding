import React from 'react';
import { motion } from 'motion/react';

export function NamesSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden">
      {/* Indian Decorative Elements */}
   
      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8 md:mb-12">
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-4 tracking-wide px-4"
              style={{ fontFamily: 'var(--font-elegant)' }}
            >
              Together with our families
            </motion.p>
            <motion.div
              className="h-0.5 w-32 md:w-40 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
          </div>

          {/* Family Cards Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Banjare Family Card */}
            <motion.div
              className="w-full sm:w-60 md:w-56 rounded-2xl overflow-hidden bg-white/40 border border-white/20 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 md:h-44 bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center text-gray-600 overflow-hidden">
                <img 
                  src="/images/banjare-family.jpeg"
                  alt="Banjare Family" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Family Name */}
              <div className="p-6 text-center">
                <h3 className="text-2xl md:text-3xl text-rose-700 font-semibold" style={{ fontFamily: 'var(--font-elegant)' }}>
                  Banjare Family
                </h3>
              </div>
            </motion.div>

            {/* Deshlahra Family Card */}
            <motion.div
              className="w-full sm:w-60 md:w-56 rounded-2xl overflow-hidden bg-white/40 border border-white/20 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 md:h-44 bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center text-gray-600 overflow-hidden">
                <img 
                  src="/images/deshlahara (1).jpeg" 
                  alt="Deshlahara Family" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              {/* Family Name */}
              <div className="p-6 text-center">
                <h3 className="text-2xl md:text-3xl text-rose-700 font-semibold" style={{ fontFamily: 'var(--font-elegant)' }}>
                  Deshlahara Family
                </h3>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-3"
              style={{ fontFamily: 'var(--font-elegant)' }}
            >
              Request the honor of your presence
            </motion.p>
            <motion.p
              className="text-base md:text-lg text-gray-600"
              style={{ fontFamily: 'var(--font-elegant)' }}
            >
              at the celebration of our union
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
