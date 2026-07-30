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

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
