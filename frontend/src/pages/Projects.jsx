import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import ProjectDetailModal from '../components/projects/ProjectDetailModal.jsx';
import { fetchProjects } from '../api/projects.js';
import { assetUrl } from '../api/client.js';

function cardExcerpt(p) {
  const ex = (p.excerpt || '').trim();
  if (ex) return ex;
  const d = (p.description || '').trim();
  if (!d) return '';
  return d.length > 180 ? `${d.slice(0, 180)}…` : d;
}

function formatRange(start, end) {
  const fmt = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  };
  const a = fmt(start);
  const b = fmt(end);
  if (!a && !b) return null;
  if (a && b) return `${a} — ${b}`;
  if (a) return a;
  if (b) return b;
  return null;
}

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await fetchProjects();
        if (!cancelled) setItems(data || []);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageShell>
      <Seo title="Projects — Daniel Gallego" description="Selected engineering and product work." path="/projects" />
      <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Projects</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Work archive</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Cards show excerpt, timeline, and a read-more control. Click anywhere on a card or use Read more for the
            full story, gallery, and video.
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading projects…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((p, i) => (
              <motion.article
                key={p._id}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                onClick={() => setSelectedId(p._id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(p._id);
                  }
                }}
                className="glass-panel glass-panel-hover flex cursor-pointer flex-col overflow-hidden text-left outline-none ring-purple-500/0 transition focus-visible:ring-2 focus-visible:ring-purple-500/28"
              >
                <div className="relative h-44 bg-gradient-to-br from-purple-900/40 to-slate-900/60">
                  {p.image ? (
                    <img src={assetUrl(p.image)} alt="" className="h-full w-full object-cover opacity-90" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                      No cover image
                    </div>
                  )}
                  {p.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-purple-600/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-300/80">
                      {p.category || 'General'}
                    </p>
                    {formatRange(p.startDate, p.endDate) && (
                      <p className="text-[11px] font-medium tabular-nums text-slate-500">
                        {formatRange(p.startDate, p.endDate)}
                      </p>
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-semibold text-white">{p.title}</h2>
                    <p className="mt-2 line-clamp-4 text-sm text-slate-300">{cardExcerpt(p) || 'Open for details.'}</p>
                  </div>
                  <div
                    className="mt-auto flex flex-wrap items-center gap-2 pt-1"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-purple-400/22 hover:bg-white/[0.04] hover:text-slate-100"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-purple-400/22 hover:bg-white/[0.04] hover:text-slate-100"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(p._id);
                      }}
                      className="ml-auto inline-flex items-center gap-1 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-200/90 transition hover:border-purple-400/28 hover:bg-purple-500/15 hover:text-purple-100"
                    >
                      Read more
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div className="glass-panel p-8 text-center text-sm text-slate-400">
            No projects yet. Use the admin dashboard to add your first entry.
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedId && (
          <ProjectDetailModal key={selectedId} projectId={selectedId} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
