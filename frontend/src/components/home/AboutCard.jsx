import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';
import CardSectionHeader from './CardSectionHeader.jsx';

export default function AboutCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-6 p-7 md:p-8"
    >
      <div>
        <CardSectionHeader label="About" />
        <p className="text-sm leading-relaxed text-slate-300/95 md:text-[15px]">
          I partner with teams to ship modern web products end-to-end — from concept and UI systems
          to scalable backends, observability, and CI. I care about clarity, maintainability, and
          measurable outcomes.
        </p>
      </div>
      <div>
        <GlassButton to="/about" variant="gradient">
          About
        </GlassButton>
      </div>
    </motion.article>
  );
}
