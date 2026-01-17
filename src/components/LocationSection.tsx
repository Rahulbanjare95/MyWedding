import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone } from 'lucide-react';

export function LocationSection() {
  const venueAddress = 'Manuas Reality, Ring Road, Raipur';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`;

  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Indian Decorative Elements */}
    
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl mb-4 text-rose-700"
            style={{ fontFamily: 'var(--font-elegant)' }}
          >
            Venue
          </motion.h2>
          <motion.div
            className="h-1 w-20 md:w-24 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          />
          <p className="text-lg md:text-xl text-gray-600 px-4" style={{ fontFamily: 'var(--font-elegant)' }}>
            Join us at our beautiful wedding venue
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Venue Details */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-md border border-rose-100 flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="relative z-10 flex-1">
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800" style={{ fontFamily: 'var(--font-elegant)' }}>
                Manuas Realty
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-3">
                Ring Road, Raipur
              </p>
              <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                <Phone className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>+91 91118 28000</span>
              </div>
            </div>
            
            <motion.button
              onClick={() => {
                const venueLat = '21.23406';
                const venueLng = '81.57529';
                const venueAddress = 'Manuas Realty Event Marriage Venue, Ring Road, Raipur';
                
                // For iOS and Android
                const mapsUrl = `https://maps.app.goo.gl/xqWAStu6JD5aB3gq8`;
                window.open(mapsUrl, '_blank');
              }}
              className="mt-3 w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 md:py-2.5 rounded-lg shadow-md flex items-center justify-center gap-2 text-sm md:text-base hover:shadow-lg transition-shadow relative z-10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Directions
            </motion.button>
          </motion.div>

          {/* Map */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 shadow-xl border border-rose-100 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="w-full h-[350px] md:h-[400px] rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14875.776798967941!2d81.57529050883558!3d21.23406120033027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28de79f90789f7%3A0x9c316bbe0fc4a050!2sManuas%20Realty%20Event%20%26%20Marriage%20Venue!5e0!3m2!1sen!2sin!4v1768653670885!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 md:mt-16 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="mb-6">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-rose-200 to-pink-200 rounded-full flex items-center justify-center shadow-lg mb-4 relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              {/* Inner decoration */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  {[...Array(8)].map((_, i) => (
                    <circle
                      key={i}
                      cx="50"
                      cy="15"
                      r="3"
                      fill="currentColor"
                      transform={`rotate(${i * 45} 50 50)`}
                      className="text-rose-500"
                    />
                  ))}
                </svg>
              </div>
              <span className="text-3xl md:text-4xl relative z-10">💕</span>
            </motion.div>
          </div>
          
          <motion.h3
            className="text-3xl sm:text-4xl md:text-5xl mb-4 text-rose-700"
            style={{ fontFamily: 'var(--font-script)' }}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Rahul & Hemanshi
          </motion.h3>
          
          <motion.div
            className="h-0.5 w-32 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
          />
          
          <p className="text-gray-600 text-base md:text-lg mb-2" style={{ fontFamily: 'var(--font-elegant)' }}>
            We can't wait to celebrate with you!
          </p>
          <p className="text-gray-500 text-sm md:text-base" style={{ fontFamily: 'var(--font-decorative)' }}>
            8th - 9th March, 2026
          </p>

          {/* Decorative elements */}
          <div className="flex justify-center gap-3 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-rose-300"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
