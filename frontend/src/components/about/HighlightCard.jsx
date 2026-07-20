import { motion } from 'framer-motion';
import IconBadge from '../common/IconBadge.jsx';

export default function HighlightCard({ duration, title, icon, variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel relative min-h-[7.5rem] overflow-visible p-5 pr-14"
    >
      <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{duration}</p>
      <p className="mt-1 text-sm font-medium text-white/80">{title}</p>
      <IconBadge
        icon={icon}
        size="lg"
        className="absolute -right-1 -top-1 ring-[3px] ring-white/70 shadow-[0_0_14px_rgba(88,28,135,0.28)]"
      />
    </motion.article>
  );
}
