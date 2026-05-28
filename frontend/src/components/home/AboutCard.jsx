import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';

export default function AboutCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-6 p-7 md:p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">About</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">Design-led engineering</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-[15px]">
          I partner with teams to ship modern web products end-to-end — from concept and UI systems
          to scalable backends, observability, and CI. I care about clarity, maintainability, and
          measurable outcomes.
        </p>
      </div>
      <div>
        <GlassButton to="/about">Open About Page</GlassButton>
      </div>
    </motion.article>
  );
}
