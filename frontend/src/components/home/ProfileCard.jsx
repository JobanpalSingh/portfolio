import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';
import profileImg from '../../assets/profile-thumb.jpg';

const bubbles = [
  { className: 'left-2 top-4 h-2.5 w-2.5 bg-purple-600/40' },
  { className: 'right-0 top-10 h-4 w-4 bg-purple-700/30' },
  { className: '-left-3 bottom-8 h-3 w-3 bg-fuchsia-700/30' },
  { className: 'right-4 bottom-2 h-2 w-2 bg-purple-500/35' },
  { className: 'left-1/2 -top-2 h-2 w-2 -translate-x-1/2 bg-purple-600/30' },
];

export default function ProfileCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-8 p-8 text-center md:p-10"
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className={`absolute rounded-full blur-[0.5px] ${b.className}`}
              aria-hidden
            />
          ))}
          <div className="relative rounded-full bg-gradient-to-br from-fuchsia-800/55 via-purple-800/50 to-indigo-900/60 p-[10px] shadow-[0_0_28px_rgba(88,28,135,0.22)]">
            <img
              src={profileImg}
              alt="Joban Kang"
              className="h-36 w-36 rounded-full object-cover md:h-40 md:w-40"
            />
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
          Joban Kang
        </h1>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300/95 md:max-w-sm md:text-[15px]">
          Helping businesses grow through custom websites, engaging videos, creative designs,
          branding, and performance-focused digital advertising solutions.
        </p>
      </div>

      <div className="flex justify-center">
        <GlassButton to="/about" variant="gradient">
          View Profile
        </GlassButton>
      </div>
    </motion.article>
  );
}
