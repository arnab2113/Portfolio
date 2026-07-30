import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard, A11y } from 'swiper/modules';
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaAward, FaAws, FaCloud } from 'react-icons/fa';
import { SiReact, SiMeta, SiPostgresql } from 'react-icons/si';
import SectionTitle from '../SectionTitle/SectionTitle';
import { certificatesData } from '../../constants/portfolioData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Reference Color Theme Definitions
const themeMap = {
  orange: {
    panelBg: 'bg-gradient-to-b from-[#B86E00] via-[#734300] to-[#3B2100]',
    border: 'border-[#FF9E1B]/40 hover:border-[#FF9E1B]/80',
    glow: 'shadow-[0_10px_35px_rgba(217,110,0,0.3)] hover:shadow-[0_15px_45px_rgba(255,158,27,0.5)]',
    svgFill: '#B86E00',
    iconColor: 'text-[#FFD08A]',
  },
  cyan: {
    panelBg: 'bg-gradient-to-b from-[#00A3C4] via-[#085F74] to-[#04323D]',
    border: 'border-[#00E5FF]/40 hover:border-[#00E5FF]/80',
    glow: 'shadow-[0_10px_35px_rgba(0,163,196,0.3)] hover:shadow-[0_15px_45px_rgba(0,229,255,0.5)]',
    svgFill: '#00A3C4',
    iconColor: 'text-[#A0F2FF]',
  },
  blue: {
    panelBg: 'bg-gradient-to-b from-[#1E50A2] via-[#11326B] to-[#091A39]',
    border: 'border-[#3B82F6]/40 hover:border-[#3B82F6]/80',
    glow: 'shadow-[0_10px_35px_rgba(30,80,162,0.3)] hover:shadow-[0_15px_45px_rgba(59,130,246,0.5)]',
    svgFill: '#1E50A2',
    iconColor: 'text-[#BFDBFE]',
  },
  pink: {
    panelBg: 'bg-gradient-to-b from-[#C8234D] via-[#7B122D] to-[#400816]',
    border: 'border-[#EC4899]/40 hover:border-[#EC4899]/80',
    glow: 'shadow-[0_10px_35px_rgba(200,35,77,0.3)] hover:shadow-[0_15px_45px_rgba(236,72,153,0.5)]',
    svgFill: '#C8234D',
    iconColor: 'text-[#FBCFE8]',
  },
};

// Map organization icon component safely
const iconMap = {
  FaAws: FaAws,
  SiReact: SiReact,
  FaCloud: FaCloud,
  SiMeta: SiMeta,
  SiPostgresql: SiPostgresql,
};

// Certificate Card Component matching reference website design
const CertificateCard = ({ cert }) => {
  const colorKey = (cert.color || 'cyan').toLowerCase();
  const theme = themeMap[colorKey] || themeMap.cyan;

  const title = cert.title || cert.name || 'Technical Certification';
  const issuer = cert.issuer || cert.organization || 'Issuing Organization';
  const date = cert.date || cert.year || '2025';
  const link = cert.link || cert.credentialUrl || '#';
  const image = cert.image || '/oasis_infobyte_certificate.png';

  const IconComponent = (cert.icon && iconMap[cert.icon]) ? iconMap[cert.icon] : FaAward;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group h-[450px] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 border ${theme.border} ${theme.glow} bg-[#0b0f24] relative shadow-2xl`}
    >
      {/* Top Part: Certificate Preview Document Paper */}
      <div className="relative h-[210px] w-full overflow-hidden bg-[#faf8f5] flex items-center justify-center p-2">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-top rounded-t-2xl transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft Inner Shadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Bottom Part: Curved Arch Colored Panel (Matches Reference Image) */}
      <div className="relative z-10 -mt-10 flex-1 flex flex-col justify-between">
        
        {/* Curved SVG Arch Header */}
        <svg
          viewBox="0 0 100 22"
          className="w-full h-7 block -mb-[1px] pointer-events-none drop-shadow-md"
          preserveAspectRatio="none"
        >
          <path d="M0,22 Q50,-4 100,22 L100,22 L0,22 Z" fill={theme.svgFill} />
        </svg>

        {/* Panel Body Content */}
        <div className={`p-6 pt-1 flex-1 flex flex-col justify-between items-center text-center ${theme.panelBg} rounded-b-3xl`}>
          
          <div className="w-full flex flex-col items-center my-auto">
            {/* Title */}
            <h3 className="font-heading font-extrabold text-white text-lg sm:text-xl leading-snug tracking-tight mb-4 text-center line-clamp-2 drop-shadow-sm">
              {title}
            </h3>

            {/* Issuer & Date Metadata Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-200/90 font-medium mb-2">
              <span className="inline-flex items-center gap-1.5">
                <IconComponent className={`text-sm ${theme.iconColor}`} />
                <span>{issuer}</span>
              </span>
              <span className="text-gray-400 font-bold">•</span>
              <span className="inline-flex items-center gap-1">
                <FaCalendarAlt className="text-[11px] text-gray-300" />
                <span>{date}</span>
              </span>
            </div>
          </div>

          {/* View Button */}
          <div className="w-full pt-3 mt-auto">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-6 rounded-xl glass-card bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/50 text-xs font-mono font-semibold flex items-center justify-center gap-2 text-white transition-all duration-300 shadow-md group/btn"
            >
              <span>View</span>
              <FaExternalLinkAlt className="text-[10px] opacity-80 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const shouldReduceMotion = useReducedMotion();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );

  const certificates = certificatesData && certificatesData.length > 0 ? certificatesData : [];
  const totalCount = certificates.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSlidesPerView = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    if (windowWidth < 1280) return 3;
    return 4;
  };

  const currentSlidesPerView = getSlidesPerView();
  const isCarouselNeeded = totalCount > currentSlidesPerView;

  // Render Grid layout when items fit cleanly without carousel
  const renderGridLayout = () => {
    let gridColsClass = 'grid-cols-1';
    let maxWidthClass = 'max-w-md';

    if (totalCount === 1) {
      gridColsClass = 'grid-cols-1';
      maxWidthClass = 'max-w-md';
    } else if (totalCount === 2) {
      gridColsClass = 'grid-cols-1 sm:grid-cols-2';
      maxWidthClass = 'max-w-3xl';
    } else if (totalCount === 3) {
      gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      maxWidthClass = 'max-w-6xl';
    } else {
      gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      maxWidthClass = 'max-w-7xl';
    }

    return (
      <div className={`grid ${gridColsClass} gap-6 sm:gap-8 ${maxWidthClass} mx-auto justify-center items-stretch`}>
        {certificates.map((cert) => (
          <div key={cert.id || cert.title} className="h-full">
            <CertificateCard cert={cert} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="certificates" className="py-24 relative z-10 bg-[#050816] overflow-hidden">
      {/* Background Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#00E5FF]/10 via-[#8B5CF6]/10 to-[#EC4899]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionTitle
          badge="Credentials"
          title="Premium"
          highlightTitle="Certificates"
          subtitle="Verified technical credentials, Star Performer internship awards, and professional achievements."
        />

        {/* Certificate Display Area */}
        <div className="mt-14 relative">
          
          {!isCarouselNeeded ? (
            renderGridLayout()
          ) : (
            <div className="relative px-2 sm:px-8">
              
              {/* Custom Navigation Arrow Buttons */}
              <button
                ref={prevRef}
                className="absolute top-1/2 -left-3 sm:-left-6 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card bg-[#0b0f24]/80 border border-white/20 text-white hover:text-[#00E5FF] hover:border-[#00E5FF] flex items-center justify-center shadow-xl transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Previous Certificates"
              >
                <FaChevronLeft className="text-sm" />
              </button>

              <button
                ref={nextRef}
                className="absolute top-1/2 -right-3 sm:-right-6 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card bg-[#0b0f24]/80 border border-white/20 text-white hover:text-[#00E5FF] hover:border-[#00E5FF] flex items-center justify-center shadow-xl transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Next Certificates"
              >
                <FaChevronRight className="text-sm" />
              </button>

              {/* Swiper Slider */}
              <Swiper
                modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                loop={totalCount > 4}
                autoplay={shouldReduceMotion ? false : { delay: 4000, disableOnInteraction: false }}
                keyboard={{ enabled: true }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                  640: { slidesPerView: Math.min(2, totalCount), spaceBetween: 24 },
                  1024: { slidesPerView: Math.min(3, totalCount), spaceBetween: 28 },
                  1280: { slidesPerView: Math.min(4, totalCount), spaceBetween: 30 },
                }}
                className="py-6 px-2 !overflow-visible"
              >
                {certificates.map((cert) => (
                  <SwiperSlide key={cert.id || cert.title} className="h-auto">
                    <CertificateCard cert={cert} />
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Certificates;
