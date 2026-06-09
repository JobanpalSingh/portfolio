import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';
import CardSectionHeader from './CardSectionHeader.jsx';

export default function ServicesCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-5 p-7 md:p-8"
    >
      <div>
        <CardSectionHeader label="Services" />
        <p className="text-sm leading-relaxed text-slate-300/95 md:text-[15px]">
          Product engineering, UI prototyping, API design, cloud deploys, performance tuning, and
          ongoing improvements with analytics-informed iteration.
        </p>
      </div>
      <div>
        <GlassButton to="/services" variant="gradient">
          Services
        </GlassButton>
      </div>
    </motion.article>
  );
}
