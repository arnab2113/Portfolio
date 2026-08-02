import React from 'react';

const Particles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050816] transform-gpu">
      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Floating Animated Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-[#00E5FF]/15 rounded-full blur-3xl lg:blur-[120px] animate-pulse-glow transform-gpu will-change-transform" />
      <div className="absolute top-1/3 -right-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#8B5CF6]/15 rounded-full blur-3xl lg:blur-[140px] animate-float-slow transform-gpu will-change-transform" />
      <div className="absolute bottom-10 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#EC4899]/10 rounded-full blur-3xl lg:blur-[130px] animate-pulse-glow transform-gpu will-change-transform" />

      {/* Subtle Noise / Dark Radial Gradient Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050816]/70 to-[#050816]" />
    </div>
  );
};

export default Particles;
