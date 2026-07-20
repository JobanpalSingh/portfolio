import { motion } from 'framer-motion';
import IconBadge from '../common/IconBadge.jsx';

export default function TimelineCard({ title, description, icon, variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel flex items-center gap-4 rounded-[2rem] px-4 py-4 sm:px-5 sm:py-5"
    >
      <IconBadge icon={icon} size="xl" />
      <div className="min-w-0">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-[15px]">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-300/95 sm:text-sm">{description}</p>
      </div>
    </motion.article>
  );
}
