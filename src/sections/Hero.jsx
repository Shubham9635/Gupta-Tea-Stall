import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Scene from '../components/3d/Scene';
import MagneticButton from '../components/MagneticButton';

export default function Hero({ mouse }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind is 1024px
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const sectionRef = useRef(null);

  const titleWords = "Gupta Tea Stall & Restaurant".split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark z-0" />
      
      {/* Ambient light effects */}
      <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-gold-light/3 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen py-24 lg:py-0">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Subtitle badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium">
                Since Generations
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`inline-block mr-3 ${
                    word === '&' ? 'text-gold' : 'text-white'
                  }`}
                  style={{ perspective: '600px' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-shimmer font-display text-xl sm:text-2xl md:text-3xl italic mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Har Sip Mein Apnapan ☕
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-white/50 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Enjoy freshly prepared Kulhad Chai, Lemon Tea, Samosa, Pakoda, 
              Maggi and many more delicious snacks.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <MagneticButton
                as="a"
                href="#menu"
                className="btn-gold inline-flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                🍵 View Menu
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#contact"
                className="btn-outline inline-flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                📍 Visit Stall
              </MagneticButton>

              <MagneticButton
                as="a"
                href="https://wa.me/+919118111575?text=Hi!%20I%20want%20to%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center justify-center gap-2 !border-[#25D366]/50 !text-[#25D366] hover:!bg-[#25D366]/10"
              >
                💬 WhatsApp
              </MagneticButton>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-8 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {[
                { value: '5000+', label: 'Happy Customers' },
                { value: '4.8★', label: 'Rating' },
                { value: '100%', label: 'Fresh' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-gold font-display text-xl font-bold">{stat.value}</p>
                  <p className="text-white/30 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - 3D Scene */}
          <motion.div
            className="order-1 lg:order-2 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[600px] relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glow behind the model */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gold/5 blur-[80px]" />
            <Scene mouse={mouse} position={isMobile ? [0, -0.15, 0] : [0.55, -0.22, 0]} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-gold rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
