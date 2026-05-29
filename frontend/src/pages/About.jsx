import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import GlassButton from '../components/common/GlassButton.jsx';

export default function About() {
  return (
    <PageShell>
      <Seo title="About — Joban Kang" description="Background, approach, and how I work with teams." path="/about" />
      <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-panel p-8 md:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">About</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Joban Kang</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
          With 2 years of professional experience at Digitofy Global Pvt. Ltd., I specialize in helping businesses build a strong digital presence through websites, creative content, and marketing solutions. From custom-coded, React, and WordPress websites to video editing, promotional reels, posters, branding, and advertising campaigns, I deliver solutions that create impact. 
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
          I believe in quality work, on-time delivery, and clear communication, helping maintain a 99% client satisfaction rate. My goal is simple — turning ideas into professional digital experiences that help businesses grow and stand out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GlassButton to="/projects">View projects</GlassButton>
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/16 hover:bg-white/[0.03] hover:text-slate-100"
            >
              Back home
            </Link>
          </div>
        </motion.div>
      </main>
    </PageShell>
  );
}
