import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';

const profileImg =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&q=80';

export default function ProfileCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col items-center justify-center gap-10 p-8 text-center md:gap-12 md:p-10"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative rounded-full bg-gradient-to-br from-fuchsia-500/85 via-purple-500/75 to-indigo-500/85 p-[8px] shadow-[0_0_32px_rgba(168,85,247,0.25)]">
          <img
            src={profileImg}
            alt="Daniel Gallego"
            className="h-32 w-32 rounded-full object-cover md:h-36 md:w-36"
          />
        </div>

        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Daniel Gallego
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
            Creative full-stack engineer crafting fast, accessible interfaces and resilient APIs —
            focused on polish, performance, and delightful motion.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <GlassButton to="/about">View Profile</GlassButton>
      </div>
    </motion.article>
  );
}
