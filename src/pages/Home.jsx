import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Certificates from '../components/Certificates/Certificates';
import Services from '../components/Services/Services';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import SectionErrorBoundary from '../components/ErrorBoundary/SectionErrorBoundary';

const Home = () => {
  return (
    <main className="relative z-10 w-full overflow-hidden">
      <Navbar />
      <SectionErrorBoundary name="Hero">
        <Hero />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="About">
        <About />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Skills">
        <Skills />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Experience">
        <Experience />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Projects">
        <Projects />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Certificates">
        <Certificates />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Services">
        <Services />
      </SectionErrorBoundary>
      <SectionErrorBoundary name="Contact">
        <Contact />
      </SectionErrorBoundary>
      <Footer />
    </main>
  );
};

export default Home;
