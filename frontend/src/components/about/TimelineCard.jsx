import { motion } from 'framer-motion';

export default function TimelineCard({ title, description, variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel flex items-center gap-4 rounded-[2rem] px-4 py-4 sm:px-5 sm:py-5"
    >
      <div
        className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 shadow-[0_0_16px_rgba(168,85,247,0.35)]"
        aria-hidden
      />
      <div className="min-w-0">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-[15px]">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-300/95 sm:text-sm">{description}</p>
      </div>
    </motion.article>
  );
}
