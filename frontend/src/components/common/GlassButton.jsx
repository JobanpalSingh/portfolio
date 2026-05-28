import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GlassButton({ children, to, href, onClick, type = 'button', className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/10 px-5 py-2 text-sm font-semibold text-purple-100/95 shadow-[0_0_18px_rgba(168,85,247,0.12)] backdrop-blur-md transition hover:border-purple-400/32 hover:bg-purple-500/14 hover:shadow-[0_0_26px_rgba(168,85,247,0.16)]';

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
