'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCheckCircle, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const reservedDomains = new Set(['example.com', 'example.org', 'example.net']);
const disposableDomains = new Set([
  'mailinator.com',
  '10minutemail.com',
  'trashmail.com',
  'guerrillamail.com',
  'temp-mail.org',
  'tempmail.com',
  'yopmail.com',
  'dispostable.com',
  'getnada.com',
  'spamgourmet.com',
  'fakeinbox.com',
  'maildrop.cc',
  'mintemail.com',
]);

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'received' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const statusTimeouts = useRef<number[]>([]);

  const clearStatusTimeouts = () => {
    statusTimeouts.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    statusTimeouts.current = [];
  };

  useEffect(() => {
    return () => {
      clearStatusTimeouts();
    };
  }, []);

  useEffect(() => {
    if (status !== 'received') {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus('idle');
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [status]);

  const validateForm = () => {
    const errors: typeof fieldErrors = {};
    const emailValue = formData.email.trim();
    const nameValue = formData.name.trim();
    const messageValue = formData.message.trim();

    if (!nameValue) {
      errors.name = 'Please enter your name.';
    }

    if (!emailValue) {
      errors.email = 'Please enter your email.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        errors.email = 'Please enter a valid email address.';
      } else {
        const domain = emailValue.split('@')[1]?.toLowerCase();
        if (domain && (reservedDomains.has(domain) || disposableDomains.has(domain))) {
          errors.email = 'Please enter a real email address.';
        }
      }
    }

    if (!messageValue) {
      errors.message = 'Please enter a message.';
    }

    setFieldErrors(errors);
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'sending') {
      return;
    }

    setErrorMessage('');
    const errors = validateForm();
    const firstErrorKey = Object.keys(errors)[0] as 'name' | 'email' | 'message' | undefined;

    if (firstErrorKey) {
      setStatus('error');

      if (firstErrorKey === 'name') {
        nameInputRef.current?.focus();
      } else if (firstErrorKey === 'email') {
        emailInputRef.current?.focus();
      } else if (firstErrorKey === 'message') {
        messageInputRef.current?.focus();
      }

      return;
    }

    clearStatusTimeouts();
    setStatus('sending');

    try {
      const formspreeEndpoint = 'https://formspree.io/f/xvznnbjz';

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

        if (!response.ok) {
        setStatus('error');
        setErrorMessage('Sorry, your message could not be submitted. Please try again later.');
        return;
      }

      setStatus('sent');
      statusTimeouts.current.push(
        window.setTimeout(() => setStatus('received'), 400)
      );
      setFormData({ name: '', email: '', message: '' });
      setFieldErrors({});
    } catch (error) {
      clearStatusTimeouts();
      setStatus('error');
      setErrorMessage('Sorry, your message could not be submitted. Please try again later.');
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
                  ref={nameInputRef}
                  autoComplete="name"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-dark/50 border text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300 ${
                    fieldErrors.name ? 'border-red-500' : 'border-primary/20'
                  }`}
                  placeholder="John Doe"
                />
                {fieldErrors.name && (
                  <p id="contact-name-error" className="mt-2 text-sm text-red-400">
                    {fieldErrors.name}
                  </p>
                )}
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  ref={emailInputRef}
                  autoComplete="email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-dark/50 border text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300 ${
                    fieldErrors.email ? 'border-red-500' : 'border-primary/20'
                  }`}
                  placeholder="john@example.com"
                />
                {fieldErrors.email && (
                  <p id="contact-email-error" className="mt-2 text-sm text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mb-6">
              <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                ref={messageInputRef}
                autoComplete="off"
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className={`w-full px-4 py-3 rounded-lg bg-dark/50 border text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-300 resize-none ${
                  fieldErrors.message ? 'border-red-500' : 'border-primary/20'
                }`}
                placeholder="Tell me about your project..."
              ></textarea>
              {fieldErrors.message && (
                <p id="contact-message-error" className="mt-2 text-sm text-red-400">
                  {fieldErrors.message}
                </p>
              )}
            </motion.div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
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

              <motion.div
                variants={itemVariants}
                aria-live="polite"
                aria-atomic="true"
              >
              {status === 'sending' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  role="status"
                  aria-label="Sending"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-500 bg-slate-500/10 p-3 text-slate-100"
                >
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></span>
                  <span className="sr-only">Sending</span>
                </motion.div>
              )}

              {status === 'sent' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  role="status"
                  aria-label="Sent"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500/10 p-3 text-emerald-100"
                >
                  <span className="text-lg">✓</span>
                  <span className="sr-only">Sent</span>
                </motion.div>
              )}

              {status === 'received' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  role="status"
                  aria-label="Received"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500/10 p-3 text-emerald-100"
                >
                  <span className="text-lg">✓✓</span>
                  <span className="sr-only">Received</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  role="alert"
                  aria-label={errorMessage || 'Submission failed'}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-100"
                >
                  <span className="text-lg">⚠</span>
                  <span className="sr-only">{errorMessage || 'Submission failed'}</span>
                </motion.div>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
