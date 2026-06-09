import { motion } from 'framer-motion';

export default function HighlightCard({ duration, title, variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel relative min-h-[7.5rem] overflow-visible p-5 pr-14"
    >
      <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{duration}</p>
      <p className="mt-1 text-sm font-medium text-white/80">{title}</p>
      <div
        className="absolute -right-1 -top-1 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 shadow-[0_0_20px_rgba(168,85,247,0.4)] ring-[3px] ring-white/90"
        aria-hidden
      />
    </motion.article>
  );
}
