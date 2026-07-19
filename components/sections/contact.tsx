'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSubmit, setLastSubmit] = useState(0);
  // Honeypot field — must stay empty (bots fill it, humans don't)
  const [company, setCompany] = useState('');

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    else if (form.name.trim().length < 2) next.name = 'Name is too short.';
    else if (form.name.trim().length > 100) next.name = 'Name is too long.';

    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Please enter a valid email address.';

    if (!form.message.trim()) next.message = 'Please enter a message.';
    else if (form.message.trim().length < 10) next.message = 'Message is too short (min 10 characters).';
    else if (form.message.trim().length > 5000) next.message = 'Message is too long (max 5000 characters).';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: silently drop spam
    if (company) return;

    // Rate limit: 1 submission per 30s
    const now = Date.now();
    if (now - lastSubmit < 30000) {
      setStatus('error');
      setErrorMsg('Please wait a few seconds before sending another message.');
      return;
    }

    if (!validate()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      // Persist to Supabase (backup / inbox)
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (dbError) console.warn('Supabase insert failed:', dbError.message);

      // Send email via edge function
      const funcUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-email`;
      const res = await fetch(funcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setLastSubmit(now);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'paramjoshi0702@gmail.com', href: 'mailto:paramjoshi0702@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 6352361844', href: 'tel:+916352361844' },
    { icon: Github, label: 'GitHub', value: 'github.com/paramjoshi0702-jpg', href: 'https://github.com/paramjoshi0702-jpg' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: '#' },
  ];

  const inputBase =
    'w-full px-4 py-3 rounded-xl bg-white/5 border focus:outline-none focus:ring-2 transition-all placeholder:text-muted-foreground/60';

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-mono text-gradient-purple tracking-widest">06 / CONTACT</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Have a project, opportunity, or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4"
          >
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-3 md:gap-4 glass-strong rounded-2xl p-4 glow-border hover:glow-purple transition-shadow"
              >
                <div className="p-2.5 md:p-3 rounded-xl bg-purple-500/10 flex-shrink-0">
                  <c.icon className="text-gradient-purple" size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-medium text-sm truncate">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass-strong rounded-3xl p-5 md:p-8 glow-border space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    disabled={status === 'loading'}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${
                      errors.name
                        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                    } disabled:opacity-60`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    disabled={status === 'loading'}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    className={`${inputBase} ${
                      errors.email
                        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                    } disabled:opacity-60`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  disabled={status === 'loading'}
                  rows={5}
                  placeholder="Tell me about your project or just say hello..."
                  aria-invalid={!!errors.message}
                  className={`${inputBase} resize-none ${
                    errors.message
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                  } disabled:opacity-60`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>
                )}
              </div>

              {/* Honeypot — hidden from real users */}
              <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company (leave empty)</label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-white disabled:opacity-70 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              >
                {status === 'loading' && (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle2 size={18} /> Message Sent!
                  </>
                )}
                {(status === 'idle' || status === 'error') && (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>

              {/* Animated success message */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                  >
                    <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-medium text-green-400">Message sent successfully!</p>
                      <p className="text-xs text-green-400/80 mt-0.5">
                        Thanks for reaching out. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated error message */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                  >
                    <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-400">Something went wrong</p>
                      <p className="text-xs text-red-400/80 mt-0.5">
                        {errorMsg || 'Please try again or email me directly.'}
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-red-400/60 hover:text-red-400 transition-colors"
                      aria-label="Dismiss"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
