import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GlassButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  variant = 'glass',
}) {
  const glass =
    'inline-flex items-center justify-center gap-2 rounded-full border border-purple-500/18 bg-purple-900/25 px-5 py-2 text-sm font-semibold text-purple-200/90 shadow-[0_0_14px_rgba(88,28,135,0.08)] backdrop-blur-md transition hover:border-purple-500/25 hover:bg-purple-900/35 hover:shadow-[0_0_18px_rgba(88,28,135,0.12)]';

  const gradient =
    'inline-flex items-center justify-center gap-2 rounded-full border border-purple-800/40 bg-gradient-to-r from-purple-950 via-purple-900 to-violet-950 px-6 py-2.5 text-sm font-semibold text-purple-50/95 shadow-[0_4px_20px_rgba(46,16,101,0.4)] transition hover:from-purple-900 hover:via-purple-800 hover:to-violet-900 hover:shadow-[0_6px_24px_rgba(76,29,149,0.35)]';

  const base = variant === 'gradient' ? gradient : glass;

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.008 }} whileTap={{ scale: 0.99 }}>
        <Link to={to} className={`${base} ${className}`}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.008 }}
        whileTap={{ scale: 0.99 }}
        className={`${base} ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.008 }}
      whileTap={{ scale: 0.99 }}
      className={`${base} ${className}`}
    >
      {children}
    </motion.button>
  );
}
