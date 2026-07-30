import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import { experienceData } from '../../constants/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative z-10 bg-[#050816]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle
          badge="Journey"
          title="Work"
          highlightTitle="Experience"
          subtitle="My professional internship experience and freelance software development trajectory."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mt-12">
          
          {/* Glowing Animated Vertical Axis Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#00E5FF] via-[#8B5CF6] to-transparent shadow-[0_0_15px_rgba(0,229,255,0.5)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experienceData.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#050816] border-2 border-[#00E5FF] shadow-[0_0_20px_#00E5FF] flex items-center justify-center text-[#00E5FF] z-20 top-2">
                    <FaBriefcase className="text-sm" />
                  </div>

                  {/* Experience Content Card */}
                  <div className="w-full sm:w-[calc(50%-2rem)] ml-12 sm:ml-0">
                    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl border border-white/10 relative">
                      
                      {/* Duration & Type Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono font-semibold border border-[#00E5FF]/30">
                          <FaCalendarAlt className="text-xs" />
                          {exp.duration}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-mono font-semibold border border-[#8B5CF6]/30">
                          {exp.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-4">
                        <FaBuilding className="text-[#00E5FF]" />
                        <span>{exp.company}</span>
                        <span className="text-gray-500">•</span>
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-gray-400 text-xs">{exp.location}</span>
                      </div>

                      {/* Bullet Points */}
                      <div className="space-y-2.5 mb-6 text-sm text-gray-300">
                        {exp.description.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <FaCheckCircle className="text-[#00E5FF] text-xs mt-1 shrink-0" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {exp.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
