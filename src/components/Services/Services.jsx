import React from 'react';
import { motion } from 'framer-motion';
import ReactParallaxTilt from 'react-parallax-tilt';

// Safe Tilt wrapper — handles ESM/CJS default export mismatch in Vite
const Tilt = typeof ReactParallaxTilt === 'function' ? ReactParallaxTilt : (ReactParallaxTilt?.default || 'div');
import { FaLaptopCode, FaServer, FaLayerGroup, FaCheck } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import { servicesData } from '../../constants/portfolioData';

const iconComponents = {
  FaLaptopCode: FaLaptopCode,
  FaServer: FaServer,
  FaLayerGroup: FaLayerGroup,
};

const Services = () => {
  return (
    <section id="services" className="py-24 relative z-10 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle
          badge="Solutions"
          title="Services"
          highlightTitle="Offered"
          subtitle="Specialized web development capabilities tailored for modern web applications."
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconComponents[service.icon] || FaLaptopCode;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  perspective={1000}
                  transitionSpeed={800}
                  scale={1.02}
                  className="h-full"
                >
                  <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/10 relative overflow-hidden h-full flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.4)] group">
                    
                    <div>
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00E5FF]/20 to-[#8B5CF6]/20 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="text-2xl" />
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-[#00E5FF] transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <div className="space-y-2.5 pt-4 border-t border-white/10">
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-200">
                            <span className="w-4 h-4 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF] shrink-0">
                              <FaCheck className="text-[9px]" />
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;
