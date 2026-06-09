import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { assetUrl } from '../../api/client.js';

const AUTO_SCROLL_MS = 4500;

function StarRating({ rating = 5 }) {
  const value = Math.min(5, Math.max(0, Number(rating) || 0));

  return (
    <div className="flex items-center justify-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < value ? 'fill-amber-300 text-amber-300' : 'fill-white/15 text-white/15'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item, isCenter, onSelect }) {
  return (
    <motion.article
      layout
      animate={{
        scale: isCenter ? 1 : 0.82,
        opacity: isCenter ? 1 : 0.55,
        y: isCenter ? 0 : 8,
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onClick={!isCenter ? onSelect : undefined}
      onKeyDown={
        !isCenter
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.();
              }
            }
          : undefined
      }
      role={!isCenter ? 'button' : undefined}
      tabIndex={!isCenter ? 0 : undefined}
      className={`glass-panel flex w-[min(100%,17.5rem)] shrink-0 flex-col items-center px-6 py-8 text-center sm:w-[15.5rem] md:w-[16.5rem] lg:w-[17.5rem] ${
        isCenter ? 'z-10 border-purple-400/25 shadow-[0_0_0_1px_rgba(168,85,247,0.12)_inset,0_24px_64px_rgba(0,0,0,0.55),0_0_40px_rgba(168,85,247,0.12)]' : 'z-0 cursor-pointer hover:border-white/16'
      }`}
    >
      {item.image ? (
        <div className="mb-5 h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full bg-purple-950/60 ring-[3px] ring-purple-400/35 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <img src={assetUrl(item.image)} alt={item.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-purple-950/60 font-display text-xl font-bold text-purple-100 ring-[3px] ring-purple-400/35 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          {item.name?.[0] || '?'}
        </div>
      )}

      <p className="text-sm font-semibold leading-relaxed text-slate-100 md:text-[15px]">
        &ldquo;{item.message}&rdquo;
      </p>

      <div
        className="my-4 h-px w-14 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
        aria-hidden
      />

      <StarRating rating={item.rating} />

      <p className="mt-3 text-xs font-semibold text-white">{item.name}</p>
      {(item.designation || item.company) && (
        <p className="mt-0.5 text-[11px] text-purple-200/75">
          {item.designation}
          {item.company ? ` · ${item.company}` : ''}
        </p>
      )}
    </motion.article>
  );
}

export default function TestimonialCarousel({ items }) {
  const list = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [list.length]);

  const goTo = useCallback(
    (next) => {
      if (!list.length) return;
      setIndex((i) => (next + list.length) % list.length);
    },
    [list.length],
  );

  useEffect(() => {
    if (list.length <= 1 || paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % list.length);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [list.length, paused]);

  const slots = useMemo(() => {
    const len = list.length;
    if (!len) return [];

    if (len === 1) {
      return [{ item: list[0], offset: 0, key: list[0]._id || '0' }];
    }

    if (len === 2) {
      return [
        { item: list[index], offset: 0, key: `${list[index]._id}-c` },
        { item: list[(index + 1) % len], offset: 1, key: `${list[(index + 1) % len]._id}-r` },
      ];
    }

    return [-1, 0, 1].map((offset) => {
      const item = list[(index + offset + len) % len];
      return { item, offset, key: `${item._id}-${offset}` };
    });
  }, [list, index]);

  if (!list.length) {
    return (
      <div className="glass-panel p-8 text-center text-sm text-slate-400">
        No testimonials yet. Add some from the admin dashboard.
      </div>
    );
  }

  return (
    <div
      className="relative py-4 md:py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative z-10 overflow-hidden px-2 sm:px-4">
        <motion.div
          key={index}
          initial={{ opacity: 0.85, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-center ${
            list.length === 2 ? 'gap-4 sm:gap-6' : 'gap-3 sm:gap-5 md:gap-8'
          }`}
        >
          {slots.map(({ item, offset, key }) => {
            const isCenter = offset === 0;
            const hiddenOnMobile = offset !== 0;

            return (
              <div
                key={key}
                className={hiddenOnMobile ? 'hidden sm:contents' : 'contents'}
              >
                <TestimonialCard
                  item={item}
                  isCenter={isCenter}
                  onSelect={() => {
                    if (offset === -1) goTo(index - 1);
                    if (offset === 1) goTo(index + 1);
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {list.length > 1 && (
        <div className="relative z-10 mt-6 flex items-center justify-center gap-2">
          {list.map((t, i) => (
            <button
              key={t._id || i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-purple-400' : 'w-2 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
