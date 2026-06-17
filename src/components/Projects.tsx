'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const projects = [
    {
      title: 'Ride-Hailing System',
      description: 'UberClone ride-hailing platform with real-time tracking, payment integration, and driver management.',
      tech: ['Flutter', 'Firebase', 'Maps'],
      image: '/assets/preview-1.png',
      link: '#',
    },
    {
      title: 'E-Commerce App',
      description: 'Full-featured e-commerce app with product management, shopping cart, secure checkout, and order tracking.',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '/assets/preview-2.png',
      link: '#',
    },
    {
      title: 'Chat Application',
      description: 'Real-time chat app with private messaging, groups, and push notifications for seamless communication.',
      tech: ['React', 'Firebase', 'Socket.io'],
      image: '/assets/preview-3.png',
      link: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing my projects, skills, and experience with beautiful animations.',
      tech: ['Next.js', 'Tailwind', 'Framer Motion'],
      image: '/assets/preview-4.png',
      link: '#',
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
    <section id="projects" ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold mb-2">MY PROJECTS</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Some Things I've <span className="gradient-text">Built</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-96 rounded-lg overflow-hidden glow-border mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6">
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.1 }}
                    className="text-primary hover:text-white text-3xl"
                  >
                    <FiExternalLink />
                  </motion.a>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm font-semibold bg-primary/10 text-primary border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="#"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 btn-outline"
          >
            View All Projects <FiArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
