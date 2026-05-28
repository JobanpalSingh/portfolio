import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/admin/login', label: 'Admin' },
];

const toggleBtnClass =
  'flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-purple-100 shadow-neon backdrop-blur-xl transition hover:border-purple-400/22 hover:bg-white/[0.04] outline-none focus:outline-none focus-visible:outline-none ring-0 focus-visible:ring-0';

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
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
            className="fixed inset-0 z-[85] bg-black/35 backdrop-blur-[2px] outline-none focus:outline-none md:bg-black/40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div ref={rootRef} className="contents">
        <motion.button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`fixed right-5 top-5 z-[95] md:right-8 md:top-8 ${toggleBtnClass}`}
          whileHover={{ scale: 1.02, rotate: open ? 0 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.aside
              key="menu-sidebar"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[90] flex h-dvh max-h-dvh min-h-dvh w-[min(18rem,100vw)] flex-col border-l border-white/10 bg-[#0c0a18]/95 pb-[env(safe-area-inset-bottom)] pt-[max(5.5rem,env(safe-area-inset-top))] shadow-[0_0_48px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <nav className="min-h-0 flex-1 overflow-y-auto p-4">
                <ul className="flex flex-col gap-1">
                  {links.map((l) => (
                    <li key={l.to}>
                      <NavLink
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-xl px-3 py-3 text-sm font-medium outline-none transition focus:outline-none focus-visible:outline-none ${
                            isActive
                              ? 'bg-purple-500/12 text-purple-100'
                              : 'text-slate-200 hover:bg-white/[0.04] hover:text-slate-100'
                          }`
                        }
                      >
                        {l.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
