'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="min-h-screen py-24 flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center lg:justify-items-stretch text-center lg:text-left">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10"
        >
          <motion.p
            variants={itemVariants}
            className="text-primary text-lg font-semibold mb-4"
          >
            HEY, I'M
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">FALCON</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200"
          >
            I BUILD DIGITAL SOLUTIONS THAT MAKE <span className="text-primary">IMPACT</span>
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed"
          >
            I'm a passionate developer with 5+ years building sleek real-world digital products. Specializing in mobile and web development, real-time systems, and clean UX/UI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center justify-center gap-2 group"
            >
              View My Work <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              <FiMail /> Contact Me
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href="mailto:falcon@example.com"
              whileHover={{ y: -5 }}
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
            >
              <FiMail />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative h-[520px] w-full max-w-[520px] rounded-[1.5rem] border border-primary/20 ring-2 ring-primary/10 overflow-hidden"
          >
            <Image
              src="/assets/falcon..png"
              alt="Falcon Bird"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl"></div>
        </motion.div>
      </div>

    </section>
  );
}
