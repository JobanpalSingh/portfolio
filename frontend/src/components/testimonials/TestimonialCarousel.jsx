import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { assetUrl } from '../../api/client.js';

export default function TestimonialCarousel({ items }) {
  const list = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [list.length]);

  const current = list[index] || null;

  function prev() {
    setIndex((i) => (list.length ? (i - 1 + list.length) % list.length : 0));
  }

  function next() {
    setIndex((i) => (list.length ? (i + 1) % list.length : 0));
  }

  if (!list.length) {
    return (
      <div className="glass-panel p-8 text-center text-sm text-slate-400">
        No testimonials yet. Add some from the admin dashboard.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden glass-panel p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={prev}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-purple-100 transition hover:border-purple-400/22 hover:bg-white/[0.03]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition ${i === index ? 'w-6 bg-purple-400' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={next}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-purple-100 transition hover:border-purple-400/22 hover:bg-white/[0.03]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mt-8 min-h-[220px]">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current._id || index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center"
            >
              {current.image ? (
                <img
                  src={assetUrl(current.image)}
                  alt={current.name}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-purple-400/40"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 font-display text-lg font-bold text-purple-100 ring-2 ring-purple-400/30">
                  {current.name?.[0] || '?'}
                </div>
              )}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-[15px]">
                “{current.message}”
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-white">{current.name}</p>
              <p className="text-xs text-purple-200/80">
                {current.designation}
                {current.company ? ` · ${current.company}` : ''}
              </p>
              <div className="mt-3 flex items-center gap-1 text-amber-300">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
