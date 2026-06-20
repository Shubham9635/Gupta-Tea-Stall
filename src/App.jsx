import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Menu from './sections/Menu';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Small delay for smooth transition
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="relative">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      {!isLoading && (
        <main
          className={`transition-opacity duration-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Navbar />
          <Hero mouse={mouse} />
          <About />
          <Menu />
          <Reviews />
          <Contact />
          <Footer />
        </main>
      )}
    </div>
  );
}
