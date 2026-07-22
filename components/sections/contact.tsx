'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, Github, Linkedin, Send, CheckCircle2, Loader2,
  AlertCircle, X, User, MessageSquare, ShieldCheck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MSG_MIN = 10;
const MSG_MAX = 1000;
const NAME_MAX = 100;
const RATE_LIMIT_MS = 30000;

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSubmit, setLastSubmit] = useState(0);
  const [company, setCompany] = useState('');
  const formRenderedAt = useRef(Date.now());
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const validateField = useCallback((field: 'name' | 'email' | 'message', value: string) => {
    const v = value.trim();
    if (field === 'name') {
      if (!v) return 'Please enter your name.';
      if (v.length < 2) return 'Name is too short.';
      if (v.length > NAME_MAX) return `Name must be under ${NAME_MAX} characters.`;
    }
    if (field === 'email') {
      if (!v) return 'Please enter your email.';
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
    }
    if (field === 'message') {
      if (!v) return 'Please enter a message.';
      if (v.length < MSG_MIN) return `Message is too short (min ${MSG_MIN} characters).`;
      if (v.length > MSG_MAX) return `Message is too long (max ${MSG_MAX} characters).`;
    }
    return undefined;
  }, []);

  const validateAll = () => {
    const next: typeof errors = {};
    next.name = validateField('name', form.name);
    next.email = validateField('email', form.email);
    next.message = validateField('message', form.message);
    const clean = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
    setErrors(clean);
    return Object.keys(clean).length === 0;
  };

  const clearTimers = () => {
    if (successTimer.current) clearTimeout(successTimer.current);
    if (errorTimer.current) clearTimeout(errorTimer.current);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearTimers();

    // Honeypot: silently drop spam bots
    if (company) return;

    // Rate limit
    const now = Date.now();
    if (now - lastSubmit < RATE_LIMIT_MS && lastSubmit > 0) {
      const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
      setStatus('error');
      setErrorMsg(`Please wait ${wait}s before sending another message.`);
      errorTimer.current = setTimeout(() => setStatus('idle'), 6000);
      return;
    }

    // Anti-bot: form filled too fast (< 2s) is likely automated
    if (now - formRenderedAt.current < 2000) {
      setStatus('error');
      setErrorMsg('Please take a moment to fill out the form properly.');
      errorTimer.current = setTimeout(() => setStatus('idle'), 6000);
      return;
    }

    if (!validateAll()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      // Persist to Supabase (backup inbox)
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
      successTimer.current = setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      errorTimer.current = setTimeout(() => setStatus('idle'), 8000);
    }
  };

  const updateField = (field: 'name' | 'email' | 'message', value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'paramjoshi0702@gmail.com', href: 'mailto:paramjoshi0702@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 6352361844', href: 'tel:+916352361844' },
    { icon: Github, label: 'GitHub', value: 'github.com/paramjoshi0702-jpg', href: 'https://github.com/paramjoshi0702-jpg' },
    { icon: Linkedin, label: 'LinkedIn', value: 'View LinkedIn Profile', href: 'https://www.linkedin.com/in/param-joshi-a10360380?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  ];

  const inputBase =
    'w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all duration-200';

  const fieldState = (hasError?: string) =>
    hasError
      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
      : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 focus:bg-white/[0.07]';

  const msgLen = form.message.trim().length;
  const msgCountColor =
    msgLen > MSG_MAX ? 'text-red-400' : msgLen > MSG_MAX * 0.8 ? 'text-yellow-400' : 'text-muted-foreground/60';

  return (
    <section id="contact" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs md:text-sm font-mono text-gradient-purple tracking-widest">09 / CONTACT</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Have a project, opportunity, or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
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
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={c.label === 'LinkedIn' ? { x: 6, scale: 1.03 } : { x: 6 }}
                className="flex items-center gap-3 md:gap-4 glass-strong rounded-2xl p-3.5 md:p-4 glow-border hover:glow-purple transition-shadow group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50"
                aria-label={`${c.label}: ${c.value}`}
              >
                <div className="p-2 md:p-2.5 rounded-xl bg-purple-500/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <c.icon className="text-gradient-purple" size={18} />
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
              aria-label="Contact form"
              className="glass-strong rounded-3xl p-5 md:p-8 glow-border space-y-4 md:space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block font-medium">
                    Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                    />
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      onBlur={() => setErrors((p) => ({ ...p, name: validateField('name', form.name) }))}
                      disabled={status === 'loading'}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`${inputBase} ${fieldState(errors.name)} disabled:opacity-60`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        id="name-error"
                        role="alert"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-400 mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle size={12} className="flex-shrink-0" /> {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none"
                    />
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      onBlur={() => setErrors((p) => ({ ...p, email: validateField('email', form.email) }))}
                      disabled={status === 'loading'}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`${inputBase} ${fieldState(errors.email)} disabled:opacity-60`}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        role="alert"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-400 mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle size={12} className="flex-shrink-0" /> {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="message" className="text-sm text-muted-foreground font-medium">
                    Message
                  </label>
                  <span className={`text-xs font-mono ${msgCountColor}`}>
                    {msgLen}/{MSG_MAX}
                  </span>
                </div>
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute left-4 top-4 text-muted-foreground/50 pointer-events-none"
                  />
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    onBlur={() => setErrors((p) => ({ ...p, message: validateField('message', form.message) }))}
                    disabled={status === 'loading'}
                    required
                    rows={5}
                    placeholder="Tell me about your project or just say hello..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${inputBase} ${fieldState(errors.message)} resize-none disabled:opacity-60`}
                  />
                </div>
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      id="message-error"
                      role="alert"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-xs text-red-400 mt-1.5 flex items-center gap-1"
                    >
                      <AlertCircle size={12} className="flex-shrink-0" /> {errors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Honeypot — visually hidden, not announced */}
              <div className="absolute -left-[9999px] -top-[9999px] opacity-0" aria-hidden="true">
                <label htmlFor="company">Website</label>
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
                aria-label={status === 'loading' ? 'Sending message' : status === 'success' ? 'Message sent' : 'Send message'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-white disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] disabled:hover:shadow-none"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 size={18} className="animate-spin" /> Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} /> Message Sent!
                    </motion.span>
                  )}
                  {(status === 'idle' || status === 'error') && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={16} /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Live region for screen readers */}
              <div aria-live="polite" className="sr-only">
                {status === 'success' && 'Your message has been sent successfully.'}
                {status === 'error' && `Error: ${errorMsg}`}
              </div>

              {/* Animated success banner */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, -10, 0] }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-green-400">Message sent successfully!</p>
                      <p className="text-xs text-green-400/80 mt-0.5">
                        Thanks for reaching out. I&apos;ll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated error banner */}
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
                      className="text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0"
                      aria-label="Dismiss error"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Trust indicator */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/50">
                <ShieldCheck size={12} />
                Your information is never shared
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
