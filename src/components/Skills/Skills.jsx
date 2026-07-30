import React from 'react';
import { motion } from 'framer-motion';
import ReactParallaxTilt from 'react-parallax-tilt';
import SectionTitle from '../SectionTitle/SectionTitle';
import { skillsData } from '../../constants/portfolioData';
import {
  SiJavascript, SiCplusplus, SiC, SiMysql,
  SiReact, SiRedux, SiTailwindcss, SiHtml5, SiBootstrap, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiPostman,
  SiGithub, SiDocker, SiFigma
} from 'react-icons/si';
import { FaCode, FaAws, FaCloud } from 'react-icons/fa';

// Safe Tilt wrapper
const Tilt = typeof ReactParallaxTilt === 'function' ? ReactParallaxTilt : (ReactParallaxTilt?.default || 'div');

// Map string icon names to React components safely
const iconMap = {
  SiJavascript: SiJavascript,
  SiCplusplus: SiCplusplus,
  SiC: SiC,
  SiMysql: SiMysql,
  SiReact: SiReact,
  SiRedux: SiRedux,
  SiTailwindcss: SiTailwindcss,
  SiHtml5: SiHtml5,
  SiBootstrap: SiBootstrap,
  SiNextdotjs: SiNextdotjs,
  SiNodedotjs: SiNodedotjs,
  SiExpress: SiExpress,
  SiMongodb: SiMongodb,
  SiPostgresql: SiPostgresql,
  SiPostman: SiPostman,
  SiGithub: SiGithub,
  SiDocker: SiDocker,
  SiAmazonwebservices: FaAws,
  SiIbm: FaCloud,
  SiFigma: SiFigma,
  SiVisualstudiocode: FaCode,
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative z-10 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle
          badge="Expertise"
          title="Technical"
          highlightTitle="Skills"
          subtitle="A comprehensive overview of my programming languages, frameworks, databases, and developer tools."
        />

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((categoryGroup, groupIdx) => (
            <motion.div
              key={groupIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                transitionSpeed={1000}
                scale={1.01}
                className="h-full"
              >
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden h-full flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E5FF]/20 to-[#8B5CF6]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                      <FaCode className="text-lg" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {categoryGroup.category}
                    </h3>
                  </div>

                  {/* Skills Items */}
                  <div className="space-y-5">
                    {categoryGroup.skills.map((skill, skillIdx) => {
                      const IconComponent = iconMap[skill.icon] || FaCode;
                      return (
                        <div key={skillIdx} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center glass-card group-hover:scale-110 transition-transform"
                                style={{ color: skill.color || '#00E5FF' }}
                              >
                                <IconComponent className="text-lg" />
                              </div>
                              <span className="font-medium text-sm text-gray-200 group-hover:text-white transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <span className="font-mono text-xs font-semibold text-[#00E5FF]">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Animated Skill Progress Bar */}
                          <div className="w-full h-2 bg-gray-800/80 rounded-full overflow-hidden p-[1px] border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + skillIdx * 0.05 }}
                              className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] shadow-[0_0_10px_rgba(0,229,255,0.4)]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
