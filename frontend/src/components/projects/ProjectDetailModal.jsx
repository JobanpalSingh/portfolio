import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Calendar } from 'lucide-react';
import { fetchProject } from '../../api/projects.js';
import { assetUrl } from '../../api/client.js';
import ProjectVideoEmbed from './ProjectVideoEmbed.jsx';

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ProjectDetailModal({ projectId, onClose }) {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return undefined;
    let cancelled = false;
    setProject(null);
    setError(null);
    (async () => {
      try {
        const { data } = await fetchProject(projectId);
        if (!cancelled) setProject(data);
      } catch {
        if (!cancelled) setError('Could not load project');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex items-end justify-center p-0 sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0a0814] shadow-card sm:rounded-3xl"
        initial={{ y: 40, opacity: 0.96 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-white md:text-xl">
            {project?.title || 'Project'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-slate-300 transition hover:border-purple-400/22 hover:bg-white/[0.03] hover:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 md:px-6 md:py-6">
          {error && <p className="text-sm text-red-300">{error}</p>}
          {!project && !error && <p className="text-sm text-slate-400">Loading…</p>}
          {project && (
            <div className="space-y-6">
              {(project.startDate || project.endDate) && (
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  <Calendar className="h-4 w-4 text-purple-300" />
                  <span>
                    {formatDate(project.startDate) || '—'}
                    <span className="mx-1 text-slate-500">→</span>
                    {formatDate(project.endDate) || '—'}
                  </span>
                </div>
              )}

              <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-300/80">
                {project.category || 'General'}
              </p>

              {project.description ? (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Details</h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-200 md:text-[15px]">
                    {project.description}
                  </p>
                </div>
              ) : null}

              {project.videoUrl ? (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Video</h3>
                  <div className="mt-3">
                    <ProjectVideoEmbed url={project.videoUrl} />
                  </div>
                </div>
              ) : null}

              {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Images &amp; results
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.gallery.map((img, i) => (
                      <a
                        key={`${img}-${i}`}
                        href={assetUrl(img)}
                        target="_blank"
                        rel="noreferrer"
                        className="group overflow-hidden rounded-xl border border-white/10 bg-white/5"
                      >
                        <img
                          src={assetUrl(img)}
                          alt=""
                            className="aspect-square w-full object-cover transition group-hover:opacity-95"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-purple-400/22 hover:bg-white/[0.03] hover:text-slate-100"
                  >
                    <Github className="h-4 w-4" />
                    Repository
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-purple-400/22 hover:bg-white/[0.03] hover:text-slate-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live site
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
