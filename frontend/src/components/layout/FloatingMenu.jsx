import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Mail, Phone, X } from 'lucide-react';
import { fetchProjects } from '../../api/projects.js';
import { assetUrl } from '../../api/client.js';

const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/34600000000',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const GALLERY_FALLBACK = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517694712202-3dd8750e901a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400&q=80',
];

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/testimonials', label: 'Testimonials' },
];

function SidebarSectionHeader({ label }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5">
        <span
          className="h-3 w-3 shrink-0 rounded-[3px] bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.6)]"
          aria-hidden
        />
        <span className="text-sm font-bold uppercase tracking-[0.14em] text-white">{label}</span>
      </div>
      <div className="mt-2.5 h-px w-[58%] bg-white/75" aria-hidden />
    </div>
  );
}

function ContactRow({ icon: Icon, iconClass, children }) {
  return (
    <li className="flex items-start gap-3.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="pt-1.5 text-sm leading-relaxed text-white/95">{children}</span>
    </li>
  );
}

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState(GALLERY_FALLBACK);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function handlePointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      try {
        const { data } = await fetchProjects();
        const imgs = [];
        for (const p of data || []) {
          if (p.image) imgs.push(assetUrl(p.image));
          if (Array.isArray(p.gallery)) {
            for (const g of p.gallery) imgs.push(assetUrl(g));
          }
          if (imgs.length >= 4) break;
        }
        if (!cancelled && imgs.length >= 4) {
          setGallery(imgs.slice(0, 4));
        } else if (!cancelled && imgs.length > 0) {
          setGallery([...imgs, ...GALLERY_FALLBACK].slice(0, 4));
        }
      } catch {
        if (!cancelled) setGallery(GALLERY_FALLBACK);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const galleryImages = useMemo(() => gallery.slice(0, 4), [gallery]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            key="menu-backdrop"
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[85] bg-black/45 backdrop-blur-[3px] outline-none focus:outline-none"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div ref={rootRef} className="contents">
        {!open && (
          <motion.button
            type="button"
            aria-label="Open menu"
            aria-expanded={false}
            onClick={() => setOpen(true)}
            className="fixed right-5 top-5 z-[95] flex h-11 w-11 items-center justify-center rounded-xl bg-transparent p-2 outline-none transition hover:opacity-90 focus:outline-none md:right-8 md:top-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex flex-col items-end gap-[7px]" aria-hidden>
              <span className="block h-[3px] w-7 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
              <span className="block h-[3px] w-5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            </span>
          </motion.button>
        )}

        <AnimatePresence>
          {open && (
            <motion.aside
              key="menu-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[90] flex h-dvh max-h-dvh min-h-dvh w-[min(21rem,92vw)] flex-col overflow-hidden bg-gradient-to-b from-[#0a0614] via-[#1a0b2e] to-[#6d28d9] pb-[env(safe-area-inset-bottom)] shadow-[-8px_0_48px_rgba(0,0,0,0.5)] sm:w-[min(23rem,92vw)]"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 z-10 p-1 text-white transition hover:text-purple-200 focus:outline-none"
              >
                <X className="h-8 w-8" strokeWidth={2.5} />
              </button>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8 pt-16 sm:px-7">
                <section>
                  <SidebarSectionHeader label="Contact" />
                  <ul className="space-y-4">
                    <ContactRow icon={MapPin} iconClass="bg-white/90 text-purple-700">
                      Remote · EU-friendly hours
                    </ContactRow>
                    <ContactRow icon={Mail} iconClass="bg-purple-600/90 text-white">
                      <a
                        href="mailto:hello@jobankang.dev"
                        className="transition hover:text-purple-200"
                        onClick={() => setOpen(false)}
                      >
                        hello@jobankang.dev
                      </a>
                    </ContactRow>
                    <ContactRow icon={Phone} iconClass="bg-white/15 text-white ring-1 ring-white/25">
                      +34 600 000 000
                    </ContactRow>
                  </ul>
                </section>

                <section className="mt-10">
                  <SidebarSectionHeader label="Gallery" />
                  <div className="grid grid-cols-2 gap-3">
                    {galleryImages.map((src, i) => (
                      <Link
                        key={`${src}-${i}`}
                        to="/projects"
                        onClick={() => setOpen(false)}
                        className="group overflow-hidden rounded-2xl ring-1 ring-white/10 transition hover:ring-purple-300/40"
                      >
                        <img
                          src={src}
                          alt=""
                          className="aspect-[4/3] h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="mt-10">
                  <SidebarSectionHeader label="Follow Me" />
                  <div className="flex items-center gap-5 pl-1">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="text-white transition hover:text-purple-200 hover:opacity-90"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </section>

                <nav className="mt-10 border-t border-white/10 pt-6" aria-label="Pages">
                  <ul className="flex flex-wrap gap-x-4 gap-y-2">
                    {NAV_LINKS.map((l) => (
                      <li key={l.to}>
                        <Link
                          to={l.to}
                          onClick={() => setOpen(false)}
                          className="text-xs font-medium uppercase tracking-wider text-white/70 transition hover:text-white"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
