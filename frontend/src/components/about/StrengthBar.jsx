import { motion } from 'framer-motion';

export default function StrengthBar({ skills, variants }) {
  return (
    <motion.div
      variants={variants}
      className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-[2rem] px-5 py-5 sm:gap-4 sm:px-8 sm:py-6"
    >
      {skills.map((skill) => (
        <div key={skill} className="group relative flex flex-col items-center">
          <span
            className="block h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 shadow-[0_0_14px_rgba(168,85,247,0.35)] transition group-hover:scale-110 sm:h-10 sm:w-10"
            title={skill}
          />
          <span className="sr-only">{skill}</span>
        </div>
      ))}
    </motion.div>
  );
}
