import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Customers', icon: '😊' },
  { value: 4.8, suffix: '★', label: 'Customer Rating', icon: '⭐', isDecimal: true },
  { value: 100, suffix: '%', label: 'Fresh Ingredients', icon: '🌿' },
];

function CountUp({ target, suffix = '', isDecimal = false, inView }) {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      const current = start + (target - start) * eased;
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, target, isDecimal]);
  
  return <span>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Our Story
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            About <span className="text-gradient-gold">Gupta Tea Stall</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Story Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src="/images/tea-stall-ambience.jpg"
                alt="Gupta Tea Stall Ambience"
                className="w-full h-[350px] sm:h-[400px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
              
              {/* Floating badge */}
              <motion.div
                className="absolute bottom-6 left-6 glass px-5 py-3 rounded-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="text-gold font-display text-lg font-semibold">☕ Est. Since Generations</p>
                <p className="text-white/50 text-xs">Trusted by thousands</p>
              </motion.div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-xl" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-xl" />
          </motion.div>

          {/* Right - Story text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mb-6 leading-snug">
              Serving Fresh Tea & Snacks{' '}
              <span className="text-gradient-gold">with Love</span>
            </h3>

            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                At Gupta Tea Stall & Restaurant, every cup of chai is a story — 
                crafted with passion, poured with warmth, and served with a smile. 
                What started as a humble roadside stall has grown into a beloved 
                destination for tea lovers.
              </p>
              <p>
                Our secret? The finest tea leaves, fresh milk, hand-ground spices, 
                and the magic of a clay kulhad that gives our chai its distinctive 
                earthy flavour. Paired with crispy samosas, golden pakodas, and 
                piping hot maggi — it&apos;s an experience that keeps you coming back.
              </p>
              <p>
                From early morning risers to late-night chai enthusiasts, Gupta Tea 
                Stall is where conversations flow as freely as the chai.
              </p>
            </div>

            {/* Signature line */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-px bg-gold/40" />
              <p className="text-gold/70 font-display italic text-sm">
                "Chai nahi sirf chai hai, yeh apnapan hai" 
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-8 text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
            >
              <span className="text-4xl mb-4 block">{stat.icon}</span>
              <p className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold mb-2">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  inView={isInView}
                />
              </p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
