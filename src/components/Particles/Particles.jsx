import React from 'react';

const Particles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050816]">
      {/* Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Floating Animated Gradient Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-[#8B5CF6]/15 rounded-full blur-[140px] animate-float-slow" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-[#EC4899]/10 rounded-full blur-[130px] animate-pulse-glow" />

      {/* Subtle Noise / Dark Radial Gradient Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050816]/70 to-[#050816]" />
    </div>
  );
};

export default Particles;
