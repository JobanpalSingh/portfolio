import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center mesh-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="grain" />
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="relative h-16 w-16">
          <motion.span
            className="absolute inset-0 rounded-2xl border border-purple-400/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-2 rounded-xl bg-gradient-to-br from-purple-500/40 to-indigo-500/30 blur-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          />
        </div>
        <p className="font-display text-sm font-semibold tracking-wide text-purple-100/90">
          Loading experience…
        </p>
      </motion.div>
    </motion.div>
  );
}
