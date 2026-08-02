import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Synchronously check touch screen / coarse pointer
    const checkTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);

    if (checkTouch) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Event delegation for interactive hover targets
    const handleMouseOver = (e) => {
      if (
        e.target &&
        e.target.closest &&
        e.target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target &&
        e.target.closest &&
        e.target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#00E5FF]/60 mix-blend-screen transform-gpu"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? 'rgba(236, 72, 153, 0.8)' : 'rgba(0, 229, 255, 0.6)',
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.2 }}
        style={{
          width: 32,
          height: 32,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#00E5FF] transform-gpu"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        style={{
          width: 8,
          height: 8,
        }}
      />
    </>
  );
};

export default Cursor;
