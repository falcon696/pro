'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiStar } from 'react-icons/fi';
import Image from 'next/image';

export default function Testimonials() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const testimonials = [
    {
      text: 'Falcon delivered an outstanding solution that exceeded my expectations. Highly professional and creative!',
      author: 'Happy Client',
      position: 'Product Manager',
      image: '/assets/client.png',
      rating: 5,
    },
    {
      text: 'Working with Falcon was a game changer. The attention to detail and code quality is exceptional.',
      author: 'John Developer',
      position: 'Tech Lead',
      image: '/assets/client.png',
      rating: 5,
    },
    {
      text: 'An incredible developer who combines technical expertise with great communication skills.',
      author: 'Sarah Designer',
      position: 'UI/UX Designer',
      image: '/assets/client.png',
      rating: 5,
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
    <section id="testimonials" ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      ></motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold mb-2">TESTIMONIALS</p>
          <h2 className="text-4xl sm:text-5xl font-bold">
            What People <span className="gradient-text">Say About Me</span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glow-border p-8 rounded-lg backdrop-blur-sm flex flex-col"
            >
              {/* Quotation Mark */}
              <div className="text-5xl text-primary/30 mb-4">"</div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-primary fill-primary" size={20} />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-primary/20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
