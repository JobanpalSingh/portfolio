import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Cpu, Rocket, LineChart } from 'lucide-react';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import GlassButton from '../components/common/GlassButton.jsx';

const blocks = [
  {
    title: 'Product UI',
    text: 'Design systems, responsive layouts, motion, and performance budgets for polished UX.',
    icon: Layers,
  },
  {
    title: 'APIs & data',
    text: 'REST and service design with MongoDB, validation, auth patterns, and observability hooks.',
    icon: Cpu,
  },
  {
    title: 'Launch & scale',
    text: 'CI/CD, environments, caching, and pragmatic cloud setups focused on reliability.',
    icon: Rocket,
  },
  {
    title: 'Iteration',
    text: 'Instrumentation, experiments, and measurable improvements after launch.',
    icon: LineChart,
  },
];

export default function Services() {
  return (
    <PageShell>
      <Seo title="Services — Daniel Gallego" description="How I help teams ship modern web products." path="/services" />
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Services</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">What I deliver</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Engagements are tailored to your stage — from prototype to production hardening — with
            transparent communication and incremental delivery.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {blocks.map((b, i) => (
            <motion.article
              key={b.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="glass-panel glass-panel-hover p-6 md:p-7"
            >
              <b.icon className="h-6 w-6 text-purple-300" />
              <h2 className="mt-4 font-display text-xl font-semibold text-white">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{b.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <GlassButton to="/contact">Start a conversation</GlassButton>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/16 hover:bg-white/[0.03] hover:text-slate-100"
          >
            Back home
          </Link>
        </div>
      </main>
    </PageShell>
  );
}
