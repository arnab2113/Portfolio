import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../constants/portfolioData';

const categories = ['All', 'Full Stack', 'Research'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative z-10 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle
          badge="Portfolio"
          title="Featured"
          highlightTitle="Projects"
          subtitle="Real-world full-stack web applications and Springer-indexed research contributions."
        />

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full glass-card border border-white/10 gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-white shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              
              {/* Modal Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-[#050816]/80 backdrop-blur-xl"
              />

              {/* Modal Content Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative z-10 w-full max-w-3xl glass-card rounded-3xl border border-white/20 p-6 sm:p-8 overflow-hidden my-8 shadow-[0_0_50px_rgba(0,229,255,0.2)]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2.5 rounded-full glass-card text-gray-300 hover:text-white hover:border-[#00E5FF] transition-all"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-lg" />
                </button>

                {/* Modal Thumbnail */}
                <div className="h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                </div>

                {/* Modal Title & Category */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-semibold border border-[#00E5FF]/30">
                    {selectedProject.category}
                  </span>
                  {selectedProject.featured && (
                    <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-mono font-semibold border border-[#8B5CF6]/30">
                      Featured Project
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
                  {selectedProject.title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Key Highlights */}
                {selectedProject.highlights && (
                  <div className="mb-6">
                    <h4 className="font-heading text-lg font-bold text-white mb-3">
                      Key Accomplishments & Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <FaCheckCircle className="text-[#00E5FF]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="font-heading text-sm font-semibold text-gray-400 mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#00E5FF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary-gradient text-sm font-semibold"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-secondary-glass text-sm font-semibold border border-white/20"
                    >
                      <FaGithub />
                      <span>View GitHub Code</span>
                    </a>
                  )}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
