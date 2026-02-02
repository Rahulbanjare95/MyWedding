import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, Users, MessageSquare, Check } from 'lucide-react';

// Sanitization function to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>\"\'&]/g, (char) => {
      const escapeMap: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return escapeMap[char] || char;
    })
    .trim();
};

// Validation functions
const validateName = (name: string): string => {
  const sanitized = sanitizeInput(name);
  if (!sanitized) return 'Name is required';
  if (sanitized.length < 2) return 'Name must be at least 2 characters';
  if (sanitized.length > 100) return 'Name must not exceed 100 characters';
  if (!/^[a-zA-Z\s'-]+$/.test(sanitized)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  return '';
};

const validatePhone = (phone: string): string => {
  const sanitized = sanitizeInput(phone);
  if (!sanitized) return 'Phone number is required';
  // Remove all non-digit characters for validation
  const digitsOnly = sanitized.replace(/\D/g, '');
  if (digitsOnly.length < 10) return 'Phone number must be at least 10 digits';
  if (digitsOnly.length > 15) return 'Phone number must not exceed 15 digits';
  // Basic international phone format validation
  if (!/^[\d\s\-\+\(\)]+$/.test(sanitized)) return 'Phone number contains invalid characters';
  return '';
};

const validateMessage = (message: string): string => {
  if (message.trim().length === 0) return ''; // Optional field
  const sanitized = sanitizeInput(message);
  if (sanitized.length > 500) return 'Message must not exceed 500 characters';
  // Prevent excessive special characters (potential spam)
  const specialCharCount = (sanitized.match(/[!@#$%^&*()_+=\[\]{};:'",.<>?/\\|`~]/g) || []).length;
  if (specialCharCount > 50) return 'Message contains too many special characters';
  return '';
};

// Convert date and time to Indian timezone (IST - UTC+5:30)
const getIndianTime = (date: Date = new Date()): string => {
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

// Validate attendance days selection
const validateDaysSelection = (days: string): string => {
  if (!days) return 'Please select which days you will attend';
  return '';
};

// Validate arrival time
const validateArrivalTime = (time: string): string => {
  if (!time) return 'Arrival time is required';
  return '';
};

export function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    message: '',
    attending: 'yes',
    attendanceDays: '',
    arrivalTime: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comprehensive validation
    const newErrors: { [key: string]: string } = {};
    
    // Validate all fields
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    const messageError = validateMessage(formData.message);
    if (messageError) newErrors.message = messageError;
    
    // Validate attendance days and arrival time
    if (formData.attending === 'yes') {
      const daysError = validateDaysSelection(formData.attendanceDays);
      if (daysError) newErrors.attendanceDays = daysError;
      
      const arrivalTimeError = validateArrivalTime(formData.arrivalTime);
      if (arrivalTimeError) newErrors.arrivalTime = arrivalTimeError;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Google Apps Script Web App URL
    // Replace with your actual Google Apps Script deployment URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbIfXn040Zkt11l0fzkKcLcAGrrDLUi8BiQYl-tFbahEh-nQGKnLviO3si-WtfwSJA/exec';

    // Get current time in Indian timezone
    const submissionTimeIST = getIndianTime();
    
    // Format attendance info
    const attendanceInfo = formData.attending === 'yes' 
      ? `${formData.attendanceDays} - Arrival: ${formData.arrivalTime} IST`
      : 'Not Attending';

    // Sanitize all data before sending
    const dataToSend = {
      name: sanitizeInput(formData.name),
      phone: sanitizeInput(formData.phone),
      attending: formData.attending,
      guests: formData.guests,
      message: sanitizeInput(formData.message),
      submissionTimeIST: submissionTimeIST,
      attendanceDays: formData.attendanceDays,
      arrivalTime: formData.arrivalTime,
      attendanceInfo: attendanceInfo,
      timestamp: new Date().toISOString(),
    };

    // Send data to Google Sheets via Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        setLoading(false);
        setSubmitted(true);
        
        // Reset form after 4 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            phone: '',
            guests: '1',
            message: '',
            attending: 'yes',
            attendanceDays: '',
            arrivalTime: '',
          });
        }, 4000);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        setLoading(false);
        setErrors({ submit: 'Error submitting RSVP. Please try again.' });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Real-time validation
    const newErrors = { ...errors };
    
    if (name === 'name') {
      const nameError = validateName(value);
      if (nameError) {
        newErrors.name = nameError;
      } else {
        delete newErrors.name;
      }
    } else if (name === 'phone') {
      const phoneError = validatePhone(value);
      if (phoneError) {
        newErrors.phone = phoneError;
      } else {
        delete newErrors.phone;
      }
    } else if (name === 'message') {
      const messageError = validateMessage(value);
      if (messageError) {
        newErrors.message = messageError;
      } else {
        delete newErrors.message;
      }
    } else if (name === 'attendanceDays') {
      const daysError = validateDaysSelection(value);
      if (daysError) {
        newErrors.attendanceDays = daysError;
      } else {
        delete newErrors.attendanceDays;
      }
    } else if (name === 'arrivalTime') {
      const timeError = validateArrivalTime(value);
      if (timeError) {
        newErrors.arrivalTime = timeError;
      } else {
        delete newErrors.arrivalTime;
      }
    }
    
    setErrors(newErrors);
  };

  return (
    <section id="rsvp-section" className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Indian Decorative Elements */}
      
      <div className="max-w-3xl mx-auto relative z-10">
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
            RSVP
          </motion.h2>
          <motion.div
            className="h-1 w-20 md:w-24 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          />
          <p className="text-lg md:text-xl text-gray-600 px-4" style={{ fontFamily: 'var(--font-elegant)' }}>
            We would love to have you join us on our special day
          </p>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-xl border border-rose-100 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-rose-400" />
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="90"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth="1"
                  transform={`rotate(${i * 45} 50 50)`}
                  className="text-rose-400"
                />
              ))}
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
            {/* Will you attend? */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-700 mb-3 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                Will you be attending?
              </label>
              <div className="flex gap-3 md:gap-4">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <motion.div
                    className="text-center py-3 md:py-4 rounded-xl border-2 border-rose-200 peer-checked:border-rose-500 peer-checked:bg-rose-100 cursor-pointer transition-all text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Joyfully Accept ✨
                  </motion.div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <motion.div
                    className="text-center py-3 md:py-4 rounded-xl border-2 border-gray-200 peer-checked:border-gray-500 peer-checked:bg-gray-100 cursor-pointer transition-all text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Regretfully Decline
                  </motion.div>
                </label>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-gray-700 mb-2 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                  Your Name
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 md:py-4 rounded-xl border-2 ${errors.name ? 'border-red-400' : 'border-rose-200'} focus:border-rose-500 focus:outline-none bg-white/50 transition-colors text-sm md:text-base`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="phone" className="block text-gray-700 mb-2 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                  Phone Number
                </div>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 md:py-4 rounded-xl border-2 ${errors.phone ? 'border-red-400' : 'border-rose-200'} focus:border-rose-500 focus:outline-none bg-white/50 transition-colors text-sm md:text-base`}
                placeholder="+91 XXXXX XXXXX"
              />
              {errors.phone && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.phone}
                </motion.p>
              )}
            </motion.div>

            {/* Number of Guests */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="guests" className="block text-gray-700 mb-2 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                  Number of Guests
                </div>
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none bg-white/50 transition-colors cursor-pointer text-sm md:text-base"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Attendance Days Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <label htmlFor="attendanceDays" className="block text-gray-700 mb-2 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                      Which Days Will You Attend?
                    </div>
                  </label>
                  <select
                    id="attendanceDays"
                    name="attendanceDays"
                    value={formData.attendanceDays}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 md:py-4 rounded-xl border-2 ${errors.attendanceDays ? 'border-red-400' : 'border-rose-200'} focus:border-rose-500 focus:outline-none bg-white/50 transition-colors text-sm md:text-base`}
                  >
                    <option value="">Select days</option>
                    <option value="8th March">8th March Only</option>
                    <option value="9th March">9th March Only</option>
                    <option value="Both Days (8th & 9th March)">Both Days (8th & 9th March)</option>
                  </select>
                  {errors.attendanceDays && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.attendanceDays}
                    </motion.p>
                  )}
                </motion.div>

                {/* Arrival Time */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.75 }}
                >
                  <label htmlFor="arrivalTime" className="block text-gray-700 mb-2 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                      Arrival Time at Venue
                    </div>
                  </label>
                  <input
                    type="time"
                    id="arrivalTime"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 md:py-4 rounded-xl border-2 ${errors.arrivalTime ? 'border-red-400' : 'border-rose-200'} focus:border-rose-500 focus:outline-none bg-white/50 transition-colors text-sm md:text-base`}
                  />
                  {errors.arrivalTime && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.arrivalTime}
                    </motion.p>
                  )}
                </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: formData.attending === 'yes' ? 0.8 : 0.7 }}
            >
              <label htmlFor="message" className="block text-gray-700 mb-2 text-base md:text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                  Message (Optional)
                </div>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:outline-none bg-white/50 transition-colors resize-none text-sm md:text-base"
                placeholder="Send your wishes to the couple..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 md:py-5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base md:text-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitted || loading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Submitting...
                </>
              ) : submitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Thank You!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send RSVP
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-xl text-center"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                  <Check className="w-6 h-6" />
                  <span className="text-lg" style={{ fontFamily: 'var(--font-elegant)' }}>
                    RSVP Received!
                  </span>
                </div>
                <p className="text-green-600 text-sm md:text-base">
                  Thank you for your response. We look forward to celebrating with you! 💕
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
