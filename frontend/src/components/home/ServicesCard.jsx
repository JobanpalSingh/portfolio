import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';

export default function ServicesCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-5 p-7 md:p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Services</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">Build, launch, iterate</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Product engineering, UI prototyping, API design, cloud deploys, performance tuning, and
          ongoing improvements with analytics-informed iteration.
        </p>
      </div>
      <div>
        <GlassButton to="/services">Open Services Page</GlassButton>
      </div>
    </motion.article>
  );
}
