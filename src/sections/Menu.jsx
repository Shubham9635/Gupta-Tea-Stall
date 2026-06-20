import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const categories = ['All', 'Tea', 'Snacks', 'Fast Food'];

const menuItems = [
  {
    name: 'Kulhad Chai',
    description: 'Authentic clay pot chai with hand-ground spices and fresh milk',
    price: '₹10',
    category: 'Tea',
    image: '/images/kulhad-chai.png',
    popular: true,
  },
  {
    name: 'Lemon Tea',
    description: 'Refreshing lemon tea with a hint of ginger',
    price: '₹10',
    category: 'Tea',
    image: '/images/lemon-tea.png',
    popular: false,
  },
  {
    name: 'Samosa',
    description: 'Crispy golden samosa stuffed with spiced potato filling',
    price: '₹7',
    category: 'Snacks',
    image: '/images/samosa.png',
    popular: true,
  },
  {
    name: 'Pakoda',
    description: 'Crunchy mixed vegetable pakodas (5 pieces) served with tangy chutney',
    price: '₹10',
    category: 'Snacks',
    image: '/images/pakoda.png',
    popular: false,
  },
  {
    name: 'Maggi',
    description: 'Hot and spicy Maggi noodles loaded with fresh vegetables',
    price: '₹30',
    category: 'Fast Food',
    image: '/images/maggi.png',
    popular: true,
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/30 to-dark" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Our Specialties
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Explore Our <span className="text-gradient-gold">Menu</span>
          </h2>
          <div className="section-divider" />
          <p className="text-white/40 mt-6 max-w-md mx-auto">
            Handcrafted with love using the freshest ingredients
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-gold text-dark font-semibold shadow-lg shadow-gold/20'
                  : 'glass text-white/60 hover:text-white hover:border-gold/30'
              }`}
              id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass-card rounded-2xl overflow-hidden group"
                id={`menu-item-${item.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                  
                  {/* Popular badge */}
                  {item.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/90 text-dark text-xs font-semibold flex items-center gap-1">
                      🔥 Popular
                    </div>
                  )}

                  {/* Category tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-white/70 text-xs">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-gold font-display text-xl font-bold whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Order button */}
                  <a
                    href={`https://wa.me/+919118111575?text=Hi!%20I%20want%20to%20order%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-gold/70 text-sm font-medium hover:text-gold transition-colors group/btn"
                  >
                    Order Now
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
