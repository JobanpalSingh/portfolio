import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassButton from '../common/GlassButton.jsx';
import CardSectionHeader from './CardSectionHeader.jsx';
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
        <CardSectionHeader label="Projects" />
        
        <p>Lorem ipsum dolor sit elit. Laudantium, soluta.</p>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center">
            {thumbs.slice(0, 3).map((src, i) => (
              <motion.div
                key={`${src}-${i}`}
                className="relative h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]"
                style={{ zIndex: 3 - i }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 * i }}
                whileHover={{ y: -2, scale: 1.03 }}
              >
                <img
                  src={src}
                  alt=""
                  className={`h-full w-full rounded-full object-cover ring-[3px] ring-[#0a0814]/90 ${
                    i > 0 ? '-ml-5 sm:-ml-6' : ''
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <span className="ml-1 text-xl font-light tracking-tight text-purple-300/75 sm:text-2xl">
            ++
          </span>
        </div>
      </div>
      <div>
        <GlassButton to="/projects" variant="gradient">
          Projects
        </GlassButton>
      </div>
    </motion.article>
  );
}
