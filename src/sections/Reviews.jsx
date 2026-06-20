import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Rahul Sharma',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Best kulhad chai in the city! The taste is absolutely authentic and brings back nostalgic memories. The samosa here is next level too! 🔥',
    date: '2 weeks ago',
  },
  {
    name: 'Priya Verma',
    avatar: '👩‍💻',
    rating: 5,
    text: 'Gupta ji ki chai is unmatched! Every sip feels like home. I come here every morning without fail. The ambience and hospitality are just amazing.',
    date: '1 month ago',
  },
  {
    name: 'Amit Gupta',
    avatar: '👨‍🎓',
    rating: 5,
    text: 'The maggi and lemon tea combo is a must try! Perfect place to hang out with friends. The prices are so reasonable for this quality.',
    date: '3 weeks ago',
  },
  {
    name: 'Sneha Patel',
    avatar: '👩‍🍳',
    rating: 4,
    text: 'Pakodas are crispy and fresh! The chai is always hot and flavorful. My go-to spot for evening snacks. Highly recommended!',
    date: '1 week ago',
  },
  {
    name: 'Vikram Singh',
    avatar: '👨‍🔧',
    rating: 5,
    text: 'Been coming here since years. The consistency in taste and quality is remarkable. Gupta ji truly puts love in every cup of chai! ☕',
    date: '2 months ago',
  },
];

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            What Our <span className="text-gradient-gold">Customers Say</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Reviews carousel */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Active review */}
          <motion.div
            key={activeIndex}
            className="glass-card rounded-2xl p-8 md:p-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-dark-light flex items-center justify-center text-3xl mx-auto mb-4 border-2 border-gold/20">
              {reviews[activeIndex].avatar}
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < reviews[activeIndex].rating ? 'text-gold' : 'text-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 italic font-light">
              &ldquo;{reviews[activeIndex].text}&rdquo;
            </p>

            {/* Author */}
            <p className="font-display text-lg font-semibold text-white">
              {reviews[activeIndex].name}
            </p>
            <p className="text-white/30 text-sm mt-1">
              {reviews[activeIndex].date}
            </p>
          </motion.div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-gold'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Review summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
          {[
            { value: '4.8/5', label: 'Average Rating' },
            { value: '500+', label: 'Reviews' },
            { value: '98%', label: 'Recommend' },
            { value: '#1', label: 'Local Choice' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <p className="text-gold font-display text-2xl font-bold">{item.value}</p>
              <p className="text-white/30 text-xs mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
