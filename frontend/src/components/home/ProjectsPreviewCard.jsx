import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';
import { fetchProjects } from '../../api/projects.js';
import { assetUrl } from '../../api/client.js';

const fallback = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1517694712202-3dd8750e901a?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=200&q=80',
];

export default function ProjectsPreviewCard({ variants }) {
  const [thumbs, setThumbs] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await fetchProjects();
        const imgs = (data || [])
          .filter((p) => p.image)
          .slice(0, 4)
          .map((p) => assetUrl(p.image));
        const merged = [...imgs, ...fallback].slice(0, 4);
        if (!cancelled) setThumbs(merged);
      } catch {
        if (!cancelled) setThumbs(fallback);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-6 p-7 md:p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Projects</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">Selected work</h2>
        <p className="mt-2 text-sm text-slate-300">
          A snapshot of shipped products, interfaces, and systems — pulled live from the API when
          available.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
          {thumbs.map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              className="relative h-14 w-14 sm:h-16 sm:w-16"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 * i }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-purple-500/50 to-fuchsia-500/40 blur-[2px]" />
              <img
                src={src}
                alt=""
                className="relative h-full w-full rounded-full object-cover ring-2 ring-white/15"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <GlassButton to="/projects">Open Projects Page</GlassButton>
      </div>
    </motion.article>
  );
}
