'use client';

import { motion } from 'framer-motion';
import { FiBriefcase, FiTarget, FiHeart, FiArrowUpRight } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const features = [
    {
      icon: FiBriefcase,
      title: 'Experience',
      description: '5+ years building digital solutions',
    },
    {
      icon: FiTarget,
      title: 'Focus',
      description: 'Mobile, web, Real-time & Scalable Systems',
    },
    {
      icon: FiHeart,
      title: 'Passion',
      description: 'Clean code, innovation & problem solving',
    },
    {
      icon: FiArrowUpRight,
      title: 'Goal',
      description: 'Deliver impactful products that make a difference',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-primary text-sm font-semibold mb-2"
          >
            ABOUT ME
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Who is <span className="gradient-text">Falcon?</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            I'm a software developer focused on building high-performance mobile and web applications. I enjoy solving complex problems and creating digital experiences.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
                }}
                transition={{ duration: 0.3 }}
                className="glow-border p-6 rounded-lg backdrop-blur-sm group cursor-pointer"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                  <div className="inline-flex origin-center text-primary text-4xl transition-transform duration-300 group-hover:scale-125">
                    <Icon />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
