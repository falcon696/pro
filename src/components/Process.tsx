'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiZap, FiPenTool, FiCode, FiCheck, FiArrowUpRight } from 'react-icons/fi';

export default function Process() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const steps = [
    {
      number: '01',
      title: 'Ideas & Planning',
      description: 'Understanding the requirements and planning the solution architecture',
      icon: FiZap,
    },
    {
      number: '02',
      title: 'Design',
      description: 'Creating intuitive and beautiful user interface prototypes',
      icon: FiPenTool,
    },
    {
      number: '03',
      title: 'Development',
      description: 'Writing clean, efficient code and building scalable solutions',
      icon: FiCode,
    },
    {
      number: '04',
      title: 'Testing',
      description: 'Thorough testing to ensure quality and performance',
      icon: FiCheck,
    },
    {
      number: '05',
      title: 'Deployment',
      description: 'Deploying the product and providing ongoing support',
      icon: FiArrowUpRight,
    },
  ];

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

  return (
    <section id="process" ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold mb-2">MY PROCESS</p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            How I <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20"
                  ></motion.div>
                )}

                <div className="glow-border p-6 rounded-lg backdrop-blur-sm h-full flex flex-col">
                  {/* Step Number */}
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>

                  {/* Icon */}
                  <div className="text-4xl text-primary mb-4">
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
