import { motion } from 'framer-motion';
import IconBadge from '../common/IconBadge.jsx';

export default function StrengthBar({ skills, variants }) {
  return (
    <motion.div
      variants={variants}
      className="glass-panel flex flex-wrap items-center justify-center gap-4 rounded-[2rem] px-5 py-5 sm:justify-between sm:gap-3 sm:px-8 sm:py-6"
    >
      {skills.map(({ label, icon }) => (
        <div key={label} className="group relative flex flex-col items-center gap-1.5">
          <IconBadge
            icon={icon}
            size="md"
            className="transition group-hover:scale-110 sm:h-10 sm:w-10"
          />
          <span className="max-w-[4.5rem] text-center text-[10px] font-medium leading-tight text-slate-400 opacity-0 transition group-hover:opacity-100 sm:text-[11px]">
            {label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
