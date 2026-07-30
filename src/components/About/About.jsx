import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCode, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import { aboutData, heroData } from '../../constants/portfolioData';

// Safe CountUp component fallback to prevent Vite ESM export type errors
const CountUp = ({ start = 0, end = 0, duration = 2.5 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, end, duration]);

  return <>{count}</>;
};

const About = () => {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-24 relative z-10 bg-[#050816]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle
          badge="Discover"
          title="About"
          highlightTitle="Me"
          subtitle={aboutData.subtitle}
        />

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {heroData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card glass-card-hover p-6 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00E5FF]/5 rounded-bl-full pointer-events-none" />
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] mb-2">
                {statsInView ? (
                  <CountUp start={0} end={stat.number} duration={2.5} />
                ) : (
                  0
                )}
                {stat.suffix}
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-300 font-sans tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Biography & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative Bio & Key Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <FaCode className="text-xl" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Full Stack Engineer & Researcher
                </h3>
              </div>

              <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                {aboutData.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Highlights List */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-200">
                    <FaCheckCircle className="text-[#00E5FF] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                <FaGraduationCap className="text-xl" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {aboutData.education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card glass-card-hover p-6 rounded-2xl relative border-l-4 border-l-[#00E5FF]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-medium">
                      {edu.duration}
                    </span>
                    <span className="text-xs font-mono text-gray-400 font-semibold">
                      {edu.score}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-medium text-[#8B5CF6] mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
