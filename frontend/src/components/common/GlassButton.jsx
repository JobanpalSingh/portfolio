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
    'inline-flex items-center justify-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-5 py-2 text-sm font-semibold text-purple-100/95 shadow-[0_0_18px_rgba(168,85,247,0.12)] backdrop-blur-md transition hover:border-purple-400/32 hover:bg-purple-500/14 hover:shadow-[0_0_26px_rgba(168,85,247,0.16)]';

  const gradient =
    'inline-flex items-center justify-center gap-2 rounded-full border border-purple-500/35 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(88,28,135,0.45)] transition hover:from-purple-700 hover:via-purple-600 hover:to-purple-800 hover:shadow-[0_6px_28px_rgba(124,58,237,0.5)]';

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
