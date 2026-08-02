import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Loader from './components/Loader/Loader';
import Cursor from './components/Cursor/Cursor';
import Particles from './components/Particles/Particles';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home';

function App() {
  const isLoaderFinished = useSelector((state) => state.theme.isLoaderFinished);

  // Initialize Lenis Smooth Scroll (Optimized for desktop, native momentum scroll on touch devices)
  useEffect(() => {
    // Check if touch device or small screen to prevent smooth scroll fighting mobile touch momentum & address bar height changes
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

    if (isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#050816] text-white selection:bg-[#00E5FF]/30 selection:text-white font-sans antialiased">
        {/* Preloader Animation */}
        <AnimatePresence mode="wait">
          {!isLoaderFinished && <Loader key="loader" />}
        </AnimatePresence>

        {/* Top Scroll Progress Line */}
        <ScrollProgress />

        {/* Custom Follower Cursor */}
        <Cursor />

        {/* Animated Background Mesh & Blobs */}
        <Particles />

        {/* Main Content Pages */}
        <Home />
      </div>
    </ErrorBoundary>
  );
}

export default App;
