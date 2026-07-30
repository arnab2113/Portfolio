import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowUp, FaCode, FaHeart } from 'react-icons/fa';
import { personalDetails, footerData } from '../../constants/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#050816] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Signature & Quote */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#8B5CF6] p-[1.5px]">
                <div className="w-full h-full bg-[#050816] rounded-lg flex items-center justify-center">
                  <FaCode className="text-[#00E5FF] text-xs" />
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Arnab<span className="text-[#00E5FF]">.dev</span>
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400 italic">
              "{footerData.quote}"
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaGithub, href: personalDetails.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalDetails.linkedin, label: 'LinkedIn' },
              { icon: FaTwitter, href: personalDetails.twitter, label: 'Twitter' },
              { icon: FaInstagram, href: personalDetails.instagram, label: 'Instagram' },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all hover:scale-110"
              >
                <s.icon className="text-base" />
              </a>
            ))}
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-xl btn-primary-gradient flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-110 transition-transform cursor-pointer"
            aria-label="Back to Top"
          >
            <FaArrowUp className="text-sm text-white" />
          </button>

        </div>

        {/* Copyright Notice */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-4">
          <p>{footerData.copyright}</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <FaHeart className="text-[#EC4899] text-xs" />
            <span>using React 19 & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
