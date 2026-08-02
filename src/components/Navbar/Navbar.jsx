import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setActiveSection, toggleMobileMenu, setMobileMenuOpen } from '../../redux/themeSlice';
import { FaBars, FaTimes, FaDownload, FaCode } from 'react-icons/fa';
import { personalDetails } from '../../constants/portfolioData';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state) => state.theme.activeSection);
  const isMobileMenuOpen = useSelector((state) => state.theme.isMobileMenuOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 30;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const scrollPosition = window.scrollY + 250;

          for (let i = navItems.length - 1; i >= 0; i--) {
            const item = navItems[i];
            const section = document.getElementById(item.id);
            if (section && section.offsetTop <= scrollPosition) {
              if (activeSection !== item.id) {
                dispatch(setActiveSection(item.id));
              }
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, activeSection]);

  const scrollToSection = (id) => {
    dispatch(setActiveSection(id));
    dispatch(setMobileMenuOpen(false));

    // Slight delay to allow mobile drawer menu close state to settle before calculating scroll position
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  const handleResumeDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = personalDetails.resumeUrl;
    link.download = 'Arnab_Maity_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloading Arnab Maity\'s Resume...', {
      icon: '📄',
      style: {
        background: '#0b0f24',
        color: '#00E5FF',
        border: '1px solid rgba(0,229,255,0.4)',
      },
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-300 transform-gpu ${
        scrolled ? 'glass-nav py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] p-[2px] shadow-[0_0_20px_rgba(0,229,255,0.5)] group-hover:scale-108 transition-all duration-300">
            <div className="w-full h-full bg-[#050816] rounded-xl flex items-center justify-center">
              <FaCode className="text-[#00E5FF] text-lg group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_12px_rgba(0,229,255,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,229,255,0.95)] transition-all duration-300">
              Arnab
            </span>
            <span className="text-[10px] font-mono text-gray-400 -mt-1 tracking-wider uppercase">
              Full Stack Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 glass-card px-4 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full cursor-pointer ${
                  isActive ? 'text-[#00E5FF]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-[#00E5FF]/10 rounded-full border border-[#00E5FF]/30 -z-10 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={personalDetails.resumeUrl}
            onClick={handleResumeDownload}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full btn-primary-gradient shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer"
          >
            <FaDownload className="text-xs" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="lg:hidden p-2.5 rounded-xl glass-card text-white hover:text-[#00E5FF] transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-nav border-t border-white/10 overflow-hidden transform-gpu"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />}
                  </button>
                );
              })}

              <a
                href={personalDetails.resumeUrl}
                onClick={handleResumeDownload}
                className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl btn-primary-gradient text-sm font-semibold text-center cursor-pointer"
              >
                <FaDownload />
                <span>Get Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
