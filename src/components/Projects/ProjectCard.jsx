import React from 'react';
import ReactParallaxTilt from 'react-parallax-tilt';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaStar } from 'react-icons/fa';

// Safe Tilt wrapper
const Tilt = typeof ReactParallaxTilt === 'function' ? ReactParallaxTilt : (ReactParallaxTilt?.default || 'div');

const ProjectCard = ({ project, onSelect }) => {
  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      perspective={1000}
      transitionSpeed={800}
      scale={1.01}
      className="h-full"
    >
      <div className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col h-full group relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Project Thumbnail Image with Zoom */}
        <div className="relative h-52 sm:h-60 overflow-hidden bg-gray-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f24] via-transparent to-transparent opacity-90" />

          {/* Category & Featured Badge */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-[#050816]/80 backdrop-blur-md text-[#00E5FF] text-xs font-mono font-semibold border border-[#00E5FF]/30">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8B5CF6]/80 backdrop-blur-md text-white text-xs font-mono font-semibold shadow-[0_0_10px_#8B5CF6]">
                <FaStar className="text-yellow-300 text-xs" />
                <span>Featured</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-gray-300 font-sans line-clamp-3 mb-6 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-[#00E5FF]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Card Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => onSelect(project)}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-gray-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
              >
                <FaInfoCircle className="text-sm" />
                <span>View Details</span>
              </button>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub className="text-base" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-[#00E5FF] hover:bg-[#00E5FF]/20 hover:border-[#00E5FF]/60 transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    aria-label="Live Demo"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </Tilt>
  );
};

export default ProjectCard;
