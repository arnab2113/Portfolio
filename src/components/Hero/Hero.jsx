import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaDownload,
  FaArrowDown,
  FaRocket,
  FaCode,
} from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb } from 'react-icons/si';
import { personalDetails, heroData } from '../../constants/portfolioData';
import profilePic from '../../assets/Profilepic.jpeg';

// Memoized Typewriter Component to isolate high-frequency state updates from Hero parent
const TypewriterText = React.memo(() => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = heroData.typingItems[typingIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === fullText) {
      speed = 2200; // Pause at end of word
      const timer = setTimeout(() => setIsDeleting(true), speed);
      return () => clearTimeout(timer);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % heroData.typingItems.length);
      speed = 300;
    }

    const timer = setTimeout(() => {
      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingIndex]);

  return (
    <>
      <span className="text-[#00E5FF] underline decoration-[#8B5CF6] decoration-wavy underline-offset-8">
        {currentText}
      </span>
      <span className="inline-block w-0.5 h-7 ml-1 bg-[#00E5FF] animate-pulse" />
    </>
  );
});

TypewriterText.displayName = 'TypewriterText';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax Effect Setup
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  const blob1X = useTransform(parallaxX, [-0.5, 0.5], [-35, 35]);
  const blob1Y = useTransform(parallaxY, [-0.5, 0.5], [-35, 35]);
  const blob2X = useTransform(parallaxX, [-0.5, 0.5], [40, -40]);
  const blob2Y = useTransform(parallaxY, [-0.5, 0.5], [40, -40]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || shouldReduceMotion) return;
    // Guard against running mouse parallax on touch/mobile devices to prevent GPU thrashing
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024)) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = (e) => {
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

  // Animation variants (Clean opacity/y transforms without CSS filter blur to prevent layer-switch flashing on mobile)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen min-h-[100dvh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#050816] selection:bg-[#00E5FF]/30 selection:text-white transform-gpu"
    >
      {/* ==========================================
          FUTURISTIC ANIMATED BACKGROUND
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#080d26] to-[#050816]" />

        {/* Responsive GPU-Optimized Glowing Blobs */}
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.25, 1],
                  opacity: [0.35, 0.55, 0.35],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-tr from-[#00E5FF]/25 via-[#8B5CF6]/20 to-transparent rounded-full blur-3xl lg:blur-[140px] transform-gpu will-change-transform"
        />

        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 -right-32 w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] bg-gradient-to-bl from-[#EC4899]/20 via-[#8B5CF6]/25 to-transparent rounded-full blur-3xl lg:blur-[150px] transform-gpu will-change-transform"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#00E5FF]/5 rounded-full blur-3xl lg:blur-[160px] transform-gpu pointer-events-none" />

        {/* Floating Glowing Particles Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-40" />

        {/* Ambient Moving Light Bar */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: ['-100%', '200%'],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent blur-[1px] transform-gpu"
        />
      </div>

      {/* ==========================================
          HERO CONTENT CONTAINER
          ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ==========================================
            LEFT COLUMN: TEXT & CTAs
            ========================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-[#00E5FF]/40 text-xs font-mono font-semibold text-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.2)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]" />
              </span>
              <span>Available for Full Stack Opportunities</span>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.span
            variants={itemVariants}
            className="text-lg sm:text-xl font-medium text-gray-300 font-sans tracking-wide mb-1"
          >
            {heroData.greeting}
          </motion.span>

          {/* Name Header */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]"
          >
            <span className="text-white">Arnab </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]">
              Maity
            </span>
          </motion.h1>

          {/* Typewriter Banner */}
          <motion.div
            variants={itemVariants}
            className="h-12 sm:h-14 flex items-center justify-center lg:justify-start text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-gray-200 mb-6"
          >
            <span className="text-gray-400 mr-3">I am a</span>
            <TypewriterText />
          </motion.div>

          {/* Short Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed max-w-2xl mb-8 text-center lg:text-left"
          >
            {personalDetails.bioShort}
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(0, 229, 255, 0.5)' }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full btn-primary-gradient text-sm font-semibold tracking-wide text-white cursor-pointer relative group overflow-hidden shadow-[0_0_25px_rgba(0,229,255,0.35)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full pointer-events-none" />
              <FaRocket className="text-sm group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Contact Me</span>
            </motion.button>

            <motion.a
              href="#resume"
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.05, borderColor: '#00E5FF', boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full glass-card text-sm font-semibold tracking-wide border border-white/20 text-white hover:text-[#00E5FF] cursor-pointer transition-colors duration-300"
            >
              <FaDownload className="text-sm text-[#00E5FF]" />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Icons Bar */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest mr-2">
              Connect:
            </span>
            {[
              { icon: FaGithub, href: personalDetails.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalDetails.linkedin, label: 'LinkedIn' },
              { icon: FaTwitter, href: personalDetails.twitter, label: 'Twitter' },
              { icon: FaInstagram, href: personalDetails.instagram, label: 'Instagram' },
              { icon: FaEnvelope, href: `mailto:${personalDetails.email}`, label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.18, y: -4, rotate: 4, borderColor: '#00E5FF' }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl glass-card border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#00E5FF] transition-all duration-300 shadow-md backdrop-blur-md"
              >
                <social.icon className="text-lg" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ==========================================
            RIGHT COLUMN: PREMIUM ANIMATED VISUAL
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0"
        >
          {/* Glowing Ambient Backdrop Aura */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-[#00E5FF]/30 via-[#8B5CF6]/30 to-[#EC4899]/30 rounded-full blur-2xl lg:blur-[90px] animate-pulse-glow transform-gpu" />

          {/* Outer Rotating Glowing Geometry Frame */}
          <motion.div
            animate={shouldReduceMotion ? {} : { rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[330px] sm:w-[410px] h-[330px] sm:h-[410px] rounded-[2.5rem] border border-[#00E5FF]/20 border-dashed transform-gpu"
          />

          {/* Main Visual Profile Glass Card */}
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative z-10 w-72 sm:w-80 md:w-96 h-[410px] sm:h-[440px] rounded-3xl p-[2px] bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] shadow-[0_0_50px_rgba(0,229,255,0.3)] backdrop-blur-xl transform-gpu"
          >
            <div className="w-full h-full bg-[#070b22]/90 rounded-[22px] overflow-hidden relative flex flex-col items-center justify-between p-6 text-center border border-white/10">
              
              {/* Card Inner Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-xl pointer-events-none" />

              {/* Top Card Badge */}
              <div className="w-full flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-[11px] font-mono border border-[#00E5FF]/30">
                  <FaCode /> Full Stack Arch
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
              </div>

              {/* Profile Picture Ring */}
              <div className="relative my-auto">
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] shadow-[0_0_35px_rgba(0,229,255,0.5)] transform-gpu"
                >
                  <img
                    src={profilePic}
                    alt="Arnab Maity"
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover border-2 border-white/20"
                  />
                </motion.div>
              </div>

              {/* Developer Info */}
              <div className="z-10 w-full">
                <h3 className="font-heading font-bold text-xl text-white mb-1 tracking-tight">
                  Arnab Maity
                </h3>
                <p className="text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full border border-[#00E5FF]/30 inline-block mb-4">
                  B.Tech CSE • Sister Nivedita Univ
                </p>

                {/* Key Metrics Grid */}
                <div className="w-full grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-left text-xs">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="block font-mono text-[10px] text-gray-400">ACADEMICS</span>
                    <span className="font-bold text-white text-xs">CGPA: 7.68 / 10</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="block font-mono text-[10px] text-gray-400">INTERNSHIP</span>
                    <span className="font-bold text-white text-xs">Oasis Infobyte</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Floating Tech Badge 1: React */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [-12, 10, -12], rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-4 sm:left-0 p-3 rounded-2xl glass-card border border-[#00E5FF]/40 shadow-[0_0_25px_rgba(0,229,255,0.3)] flex items-center gap-2.5 backdrop-blur-xl z-20 transform-gpu"
          >
            <div className="w-9 h-9 rounded-xl bg-[#61DAFB]/10 flex items-center justify-center">
              <SiReact className="text-xl text-[#61DAFB] animate-spin" style={{ animationDuration: '12s' }} />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">React.js 19</span>
              <span className="block text-[10px] font-mono text-gray-400">Frontend Core</span>
            </div>
          </motion.div>

          {/* Floating Tech Badge 2: Node.js */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [10, -12, 10], rotate: [2, -2, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -right-4 sm:right-0 p-3 rounded-2xl glass-card border border-[#8B5CF6]/40 shadow-[0_0_25px_rgba(139,92,246,0.3)] flex items-center gap-2.5 backdrop-blur-xl z-20 transform-gpu"
          >
            <div className="w-9 h-9 rounded-xl bg-[#339933]/10 flex items-center justify-center">
              <SiNodedotjs className="text-xl text-[#339933]" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">Node & Express</span>
              <span className="block text-[10px] font-mono text-gray-400">Backend API</span>
            </div>
          </motion.div>

          {/* Floating Tech Badge 3: MongoDB */}
          <motion.div
            animate={shouldReduceMotion ? {} : { x: [-10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -right-8 p-3 rounded-2xl glass-card border border-[#EC4899]/40 shadow-[0_0_25px_rgba(236,72,153,0.3)] hidden sm:flex items-center gap-2.5 backdrop-blur-xl z-20 transform-gpu"
          >
            <div className="w-9 h-9 rounded-xl bg-[#47A248]/10 flex items-center justify-center">
              <SiMongodb className="text-xl text-[#47A248]" />
            </div>
            <div>
              <span className="block text-xs font-bold text-white">MongoDB</span>
              <span className="block text-[10px] font-mono text-gray-400">Database</span>
            </div>
          </motion.div>

        </motion.div>

      </div>

      {/* ==========================================
          PREMIUM SCROLL INDICATOR
          ========================================== */}
      <motion.button
        onClick={scrollToAbout}
        animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-[#00E5FF] transition-colors focus:outline-none cursor-pointer z-20 group transform-gpu"
        aria-label="Scroll to About Section"
      >
        <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-[#00E5FF] transition-colors">
          Scroll Down
        </span>
        <div className="w-8 h-8 rounded-full glass-card border border-white/20 group-hover:border-[#00E5FF]/60 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:scale-110 transition-transform">
          <FaArrowDown className="text-xs" />
        </div>
      </motion.button>
    </section>
  );
};

export default Hero;
