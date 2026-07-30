import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLoaderFinished } from '../../redux/themeSlice';

const Loader = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            dispatch(setLoaderFinished(true));
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] text-white"
    >
      {/* Background glow */}
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-[#00E5FF]/20 to-[#8B5CF6]/20 rounded-full blur-[100px] animate-pulse-glow" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Monogram Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] p-[2px] shadow-[0_0_40px_rgba(0,229,255,0.4)] mb-8"
        >
          <div className="w-full h-full bg-[#050816] rounded-2xl flex items-center justify-center">
            <span className="font-heading text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">
              AM
            </span>
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-2xl font-bold tracking-tight text-white mb-2"
        >
          Arnab Maity
        </motion.h2>
        <p className="text-sm text-gray-400 font-mono mb-8">
          MERN Full Stack Developer
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 h-1.5 bg-gray-800/80 rounded-full overflow-hidden p-[1px] border border-white/10 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00E5FF] via-[#8B5CF6] to-[#EC4899] rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-3 font-mono text-xs text-[#00E5FF] font-semibold tracking-wider">
          {Math.min(progress, 100)}%
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
