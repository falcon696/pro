'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const formspreeEndpoint = 'https://formspree.io/f/xvznnbjz';

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(data?.error || 'Unable to send message.');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'falconxxx475@gmail.com',
      link: 'mailto:falconxxx475@gmail.com',
    },
    {
      icon: FiPhone,
      title: 'WhatsApp',
      value: '+81 90-5521-9462',
      link: 'https://wa.me/819055219462',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Tokyo, Japan',
      link: 'https://www.google.com/maps?q=Tokyo+Japan',
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* World Map Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
      >
        <Image
          src="/assets/world map.png"
          alt="World Map"
          fill
          className="object-cover object-right-bottom opacity-20"
        />
      </motion.div>

      {/* Background decoration */}
      <motion.div
        animate={{ rotate: [0, -5, 0], y: [0, 20, 0] }}
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
          <p className="text-primary text-sm font-semibold mb-2">GET IN TOUCH</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's Build Something <span className="gradient-text">Awesome Together</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target={info.title !== 'Email' && info.title !== 'Location' ? '_blank' : undefined}
                  rel={info.title !== 'Email' && info.title !== 'Location' ? 'noopener noreferrer' : undefined}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="glow-border p-6 rounded-lg backdrop-blur-sm group cursor-pointer block"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-semibold">{info.title}</p>
                      <p className="text-white font-semibold group-hover:text-primary transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2 glow-border p-8 rounded-lg backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300"
                  placeholder="John Doe"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                autoComplete="off"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-dark/50 border border-primary/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === 'sending'}
              className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </motion.button>
            {status === 'success' && (
              <p className="mt-4 text-sm text-green-400">Message sent successfully.</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-400">{errorMessage || 'Unable to send message.'}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
