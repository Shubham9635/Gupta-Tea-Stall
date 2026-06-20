import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const contactCards = [
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: 'Visit Us',
    info: 'Siswa Bazar, Maharajganj, UP',
    sub: 'Come enjoy chai with us!',
    action: 'https://www.google.com/maps/@26.9041713,83.9528754,17z',
  },
  {
    icon: <FaPhone className="text-2xl" />,
    title: 'Call Us',
    info: '+91 XXXXX XXXXX',
    sub: 'Tap to call directly',
    action: 'tel:+91XXXXXXXXXX',
  },
  {
    icon: <FaWhatsapp className="text-2xl" />,
    title: 'WhatsApp',
    info: '+91 XXXXX XXXXX',
    sub: 'Quick order via WhatsApp',
    action: 'https://wa.me/+91XXXXXXXXXX',
  },
  {
    icon: <FaClock className="text-2xl" />,
    title: 'Opening Hours',
    info: '6:00 AM - 11:00 PM',
    sub: 'Open all 7 days',
    action: null,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
            Find <span className="text-gradient-gold">Us Here</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, i) => {
            const CardTag = card.action ? 'a' : 'div';
            const cardProps = card.action
              ? { href: card.action, target: card.action.startsWith('http') ? '_blank' : undefined, rel: card.action.startsWith('http') ? 'noopener noreferrer' : undefined }
              : {};

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <CardTag
                  {...cardProps}
                  className="glass-card rounded-2xl p-6 text-center block h-full"
                  id={`contact-${card.title.toLowerCase().replace(/\s/g, '-')}`}
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gold text-sm font-medium mb-1">{card.info}</p>
                  <p className="text-white/30 text-xs">{card.sub}</p>
                </CardTag>
              </motion.div>
            );
          })}
        </div>

        {/* Map */}
        <motion.div
          className="rounded-2xl overflow-hidden glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="p-2">
            <iframe
              title="Gupta Tea Stall Location"
              src="https://maps.google.com/maps?q=26.9041713,83.9528754&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: '12px', filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              id="google-map-embed"
            />
          </div>
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-medium">Gupta Tea Stall & Restaurant</p>
              <p className="text-white/40 text-sm">Siswa Bazar, Maharajganj, Uttar Pradesh</p>
            </div>
            <a
              href="https://www.google.com/maps/@26.9041713,83.9528754,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2 !px-5 text-sm"
            >
              Get Directions →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
