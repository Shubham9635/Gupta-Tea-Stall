import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
  { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook' },
  { icon: <FaWhatsapp />, href: 'https://wa.me/+91XXXXXXXXXX', label: 'WhatsApp' },
  { icon: <FaYoutube />, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-card/50 border-t border-white/5">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">☕</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-gradient-gold">
                  Gupta Tea Stall
                </h3>
                <p className="text-white/30 text-xs tracking-widest uppercase">
                  & Restaurant
                </p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Serving the finest kulhad chai and delicious snacks with love. 
              Every cup tells a story, every bite brings joy.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <span className="text-gold mt-0.5">📍</span>
                <span>Siswa Bazar, Maharajganj, Uttar Pradesh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-0.5">📞</span>
                <a href="tel:+91XXXXXXXXXX" className="hover:text-gold transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-0.5">🕐</span>
                <span>6:00 AM - 11:00 PM (All Days)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold mt-0.5">💬</span>
                <a
                  href="https://wa.me/+91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center sm:text-left">
            Made with ❤️ by Gupta Tea Stall.
          </p>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Gupta Tea Stall & Restaurant. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </footer>
  );
}
