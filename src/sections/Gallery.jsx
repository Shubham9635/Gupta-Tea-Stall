import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const galleryImages = [
  { src: '/images/kulhad-chai.png', alt: 'Kulhad Chai', span: 'row-span-2' },
  { src: '/images/samosa.png', alt: 'Crispy Samosa', span: '' },
  { src: '/images/tea-stall-ambience.png', alt: 'Tea Stall Ambience', span: '' },
  { src: '/images/maggi.png', alt: 'Hot Maggi', span: 'row-span-2' },
  { src: '/images/pakoda.png', alt: 'Golden Pakoda', span: '' },
  { src: '/images/lemon-tea.png', alt: 'Fresh Lemon Tea', span: '' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  
  const prevImage = () => {
    setLightbox((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };
  const nextImage = () => {
    setLightbox((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Visual Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Our <span className="text-gradient-gold">Gallery</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className={`relative rounded-xl overflow-hidden group cursor-pointer ${img.span}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => openLightbox(i)}
              id={`gallery-item-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/60 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center"
                >
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center mb-2 mx-auto">
                    <span className="text-gold text-xl">🔍</span>
                  </div>
                  <p className="text-white/80 text-sm font-medium">{img.alt}</p>
                </motion.div>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-[80vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Controls */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors p-2"
                aria-label="Close lightbox"
              >
                <HiX size={28} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Previous image"
              >
                <HiChevronLeft size={24} />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Next image"
              >
                <HiChevronRight size={24} />
              </button>

              {/* Caption */}
              <p className="text-center text-white/60 text-sm mt-4">
                {galleryImages[lightbox].alt} — {lightbox + 1}/{galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
