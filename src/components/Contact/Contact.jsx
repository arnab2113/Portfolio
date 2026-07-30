import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCopy, FaCheckCircle, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import { personalDetails } from '../../constants/portfolioData';

// ============================================================
// Web3Forms — FREE contact form API (no account/dashboard needed)
//
// HOW TO GET YOUR KEY (takes 30 seconds):
//   1. Go to https://web3forms.com/
//   2. Enter your email: arnabm776@gmail.com
//   3. Click "Create Access Key"
//   4. Check your inbox — copy the access key
//   5. Paste it below replacing 'YOUR_ACCESS_KEY_HERE'
// ============================================================
const WEB3FORMS_ACCESS_KEY = '26d2bc2a-9ba2-4e89-b71d-d9fb6698b0a7';

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`Copied ${field} to clipboard!`, {
      style: {
        background: '#0b0f24',
        color: '#00E5FF',
        border: '1px solid rgba(0,229,255,0.3)',
      },
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.', {
        style: {
          background: '#0b0f24',
          color: '#EC4899',
          border: '1px solid rgba(236,72,153,0.3)',
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form',
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully! I will get back to you soon.', {
          duration: 4000,
          style: {
            background: '#0b0f24',
            color: '#00E5FF',
            border: '1px solid rgba(0,229,255,0.4)',
          },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please email me directly.', {
        duration: 4000,
        style: {
          background: '#0b0f24',
          color: '#EC4899',
          border: '1px solid rgba(236,72,153,0.3)',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 bg-[#050816]/95">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle
          badge="Get In Touch"
          title="Contact"
          highlightTitle="Me"
          subtitle="Have a question, project inquiry, or opportunity? Feel free to reach out!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >
            {/* Availability Badge */}
            <div className="glass-card p-6 rounded-3xl border border-[#00E5FF]/30 relative overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.15)]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00E5FF] animate-ping" />
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    Current Availability
                  </h4>
                  <p className="text-xs text-gray-300">
                    Open for Full-Time Software Engineer & Internship Roles
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Methods */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-gray-400">Email</span>
                    <a
                      href={`mailto:${personalDetails.email}`}
                      className="font-semibold text-white hover:text-[#00E5FF] text-sm sm:text-base transition-colors"
                    >
                      {personalDetails.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalDetails.email, 'email')}
                  className="p-2.5 rounded-xl glass-card text-gray-400 hover:text-[#00E5FF] transition-colors"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <FaCheckCircle className="text-[#00E5FF]" /> : <FaCopy />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-gray-400">Phone</span>
                    <a
                      href={`tel:${personalDetails.phone}`}
                      className="font-semibold text-white hover:text-[#8B5CF6] text-sm sm:text-base transition-colors"
                    >
                      {personalDetails.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalDetails.phone, 'phone')}
                  className="p-2.5 rounded-xl glass-card text-gray-400 hover:text-[#8B5CF6] transition-colors"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? <FaCheckCircle className="text-[#8B5CF6]" /> : <FaCopy />}
                </button>
              </div>

              {/* Location Card */}
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EC4899]/10 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899]">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-gray-400">Location</span>
                  <span className="font-semibold text-white text-sm sm:text-base">
                    {personalDetails.location}
                  </span>
                </div>
              </div>

            </div>

            {/* Social Connect Bar */}
            <div className="glass-card p-6 rounded-3xl border border-white/10">
              <h4 className="font-heading font-semibold text-white text-sm mb-4">
                Connect on Social Networks
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={personalDetails.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl glass-card flex items-center justify-center gap-2 text-xs font-mono text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalDetails.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl glass-card flex items-center justify-center gap-2 text-xs font-mono text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalDetails.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl glass-card flex items-center justify-center gap-2 text-xs font-mono text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                >
                  <FaTwitter />
                  <span>Twitter</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-gray-300 mb-8">
                Fill out the form below and I will respond as soon as possible.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Project Discussion / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all text-sm"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl btn-primary-gradient shadow-[0_0_25px_rgba(0,229,255,0.4)] text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
