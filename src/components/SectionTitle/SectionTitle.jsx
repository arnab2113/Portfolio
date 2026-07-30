import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ badge, title, highlightTitle, subtitle, align = 'center' }) => {
  const isLeft = align === 'left';

  return (
    <div className={`mb-12 md:mb-16 ${isLeft ? 'text-left' : 'text-center'}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#00E5FF]/30 text-xs font-mono font-medium text-[#00E5FF] tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)] ${
            isLeft ? '' : 'mx-auto'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
      >
        {title}{' '}
        {highlightTitle && (
          <span className="text-gradient-cyan-purple font-extrabold">
            {highlightTitle}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 text-base sm:text-lg text-gray-400 max-w-2xl font-sans ${
            isLeft ? '' : 'mx-auto'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
