'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiFlutter,
  SiAmazonaws,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiGooglecloud,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNextdotjs,
  SiOpenai,
  SiEthereum,
  SiWordpress,
  SiShopify,
  SiRust,
  SiNuxtdotjs,
} from 'react-icons/si';
import { HiOutlineShoppingCart } from 'react-icons/hi2';

export default function Technologies() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const technologies = [
    { icon: SiFlutter, name: 'Flutter', color: '#02569B' },
    { icon: SiAmazonaws, name: 'AWS', color: '#FF9900' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiPostgresql, name: 'Postgres', color: '#336791' },
    { icon: SiMongodb, name: 'MongoDB', color: '#13AA52' },
    { icon: SiGooglecloud, name: 'GCP', color: '#4285F4' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiHtml5, name: 'HTML5', color: '#E34C26' },
    { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
    { icon: SiOpenai, name: 'AI / OpenAI', color: '#10B981' },
    { icon: SiEthereum, name: 'Blockchain', color: '#627EEA' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#FFFFFF' },
    { icon: SiRust, name: 'Rust', color: '#DEA584' },
    { icon: SiNuxtdotjs, name: 'Nuxt', color: '#00DC82' },
    { icon: SiWordpress, name: 'WordPress', color: '#21759B' },
    { icon: HiOutlineShoppingCart, name: 'Ecommerce', color: '#F59E0B' },
    { icon: SiShopify, name: 'Shopify', color: '#96BF48' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="technologies" ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold mb-2">MY TECH STACK</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-6"
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
                }}
                className="glow-border w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 max-w-[220px] p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer group backdrop-blur-sm"
              >
                <div className="text-5xl mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  <Icon />
                </div>
                <p className="text-center text-sm font-semibold text-gray-300 group-hover:text-primary transition-colors duration-300">
                  {tech.name}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
