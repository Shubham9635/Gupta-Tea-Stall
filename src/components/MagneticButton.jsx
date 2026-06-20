import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '', onClick, href, target, rel, as = 'button' }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = 'translate(0, 0)';
  };

  const Component = as === 'a' ? 'a' : 'button';

  return (
    <motion.div
      ref={btnRef}
      className="inline-block magnetic-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      whileTap={{ scale: 0.95 }}
    >
      <Component
        className={className}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </Component>
    </motion.div>
  );
}
