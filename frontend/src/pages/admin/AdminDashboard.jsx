import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import PageShell from '../../components/layout/PageShell.jsx';
import Seo from '../../components/common/Seo.jsx';
import { fetchAdminStats } from '../../api/auth.js';
import { createProject, deleteProject, fetchProjects, updateProject } from '../../api/projects.js';
import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
} from '../../api/testimonials.js';
import { fetchContactMessages } from '../../api/contact.js';

function toInputDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

const emptyProject = {
  title: '',
  excerpt: '',
  description: '',
  category: '',
  githubLink: '',
  liveLink: '',
  videoUrl: '',
  startDate: '',
  endDate: '',
  featured: false,
  galleryUrls: [],
};

const emptyTestimonial = {
  name: '',
  designation: '',
  company: '',
  message: '',
  rating: 5,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [projectModal, setProjectModal] = useState({ open: false, editingId: null, ...emptyProject });
  const [projectCoverFile, setProjectCoverFile] = useState(null);
  const [projectGalleryFiles, setProjectGalleryFiles] = useState([]);
  const [testimonialModal, setTestimonialModal] = useState({
    open: false,
    editingId: null,
    ...emptyTestimonial,
  });
  const [testimonialFile, setTestimonialFile] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [s, p, t, c] = await Promise.all([
        fetchAdminStats(),
        fetchProjects(),
        fetchTestimonials(),
        fetchContactMessages(),
      ]);
      setStats(s.data);
      setProjects(p.data || []);
      setTestimonials(t.data || []);
      setContactMessages(c.data || []);
    } catch {
      toast.error('Could not load admin data');
      navigate('/admin/login', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    reload();
  }, [reload]);

  function logout() {
    localStorage.removeItem('admin_token');
    navigate('/admin/login', { replace: true });
  }

  function openProjectCreate() {
    setProjectCoverFile(null);
    setProjectGalleryFiles([]);
    setProjectModal({ open: true, editingId: null, ...emptyProject });
  }

  function openProjectEdit(p) {
    setProjectCoverFile(null);
    setProjectGalleryFiles([]);
    setProjectModal({
      open: true,
      editingId: p._id,
      title: p.title,
      excerpt: p.excerpt || '',
      description: p.description || '',
      category: p.category || '',
      githubLink: p.githubLink || '',
      liveLink: p.liveLink || '',
      videoUrl: p.videoUrl || '',
      startDate: toInputDate(p.startDate),
      endDate: toInputDate(p.endDate),
      featured: !!p.featured,
      galleryUrls: Array.isArray(p.gallery) ? [...p.gallery] : [],
    });
  }

  async function saveProject(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', projectModal.title);
    fd.append('excerpt', projectModal.excerpt || '');
    fd.append('description', projectModal.description || '');
    fd.append('category', projectModal.category || '');
    fd.append('githubLink', projectModal.githubLink || '');
    fd.append('liveLink', projectModal.liveLink || '');
    fd.append('videoUrl', projectModal.videoUrl || '');
    fd.append('startDate', projectModal.startDate || '');
    fd.append('endDate', projectModal.endDate || '');
    fd.append('featured', String(!!projectModal.featured));
    fd.append('galleryExisting', JSON.stringify(projectModal.galleryUrls || []));
    if (projectCoverFile) fd.append('image', projectCoverFile);
    for (const file of projectGalleryFiles) {
      fd.append('gallery', file);
    }
    try {
      if (projectModal.editingId) {
        await updateProject(projectModal.editingId, fd);
        toast.success('Project updated');
      } else {
        await createProject(fd);
        toast.success('Project created');
      }
      setProjectModal({ open: false, editingId: null, ...emptyProject });
      setProjectCoverFile(null);
      setProjectGalleryFiles([]);
      reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  }

  async function removeProject(id) {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Deleted');
      reload();
    } catch {
      toast.error('Delete failed');
    }
  }

  function openTestimonialCreate() {
    setTestimonialFile(null);
    setTestimonialModal({ open: true, editingId: null, ...emptyTestimonial });
  }

  function openTestimonialEdit(t) {
    setTestimonialFile(null);
    setTestimonialModal({
      open: true,
      editingId: t._id,
      name: t.name,
      designation: t.designation || '',
      company: t.company || '',
      message: t.message,
      rating: t.rating || 5,
    });
  }

  async function saveTestimonial(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', testimonialModal.name);
    fd.append('designation', testimonialModal.designation);
    fd.append('company', testimonialModal.company);
    fd.append('message', testimonialModal.message);
    fd.append('rating', String(testimonialModal.rating));
    if (testimonialFile) fd.append('image', testimonialFile);
    try {
      if (testimonialModal.editingId) {
        await updateTestimonial(testimonialModal.editingId, fd);
        toast.success('Testimonial updated');
      } else {
        await createTestimonial(fd);
        toast.success('Testimonial created');
      }
      setTestimonialModal({ open: false, editingId: null, ...emptyTestimonial });
      setTestimonialFile(null);
      reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  }

  async function removeTestimonial(id) {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      toast.success('Deleted');
      reload();
    } catch {
      toast.error('Delete failed');
    }
  }

  return (
    <PageShell>
      <Seo title="Admin dashboard" description="Manage portfolio content" path="/admin" />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-slate-400">Projects, testimonials, and quick stats.</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-400/40 hover:text-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Projects', value: stats?.projects ?? '—' },
            { label: 'Featured', value: stats?.featuredProjects ?? '—' },
            { label: 'Testimonials', value: stats?.testimonials ?? '—' },
            { label: 'Contact msgs', value: stats?.messages ?? '—' },
          ].map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-5"
            >
              <p className="text-xs uppercase tracking-wide text-purple-300/80">{c.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">{loading ? '…' : c.value}</p>
            </motion.div>
          ))}
        </div>

        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-white">Projects</h2>
            <button
              type="button"
              onClick={openProjectCreate}
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.16)] hover:bg-purple-600/92"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id} className="border-t border-white/5">
                    <td className="px-4 py-3 font-medium text-white">{p.title}</td>
                    <td className="px-4 py-3 text-slate-300">{p.category}</td>
                    <td className="px-4 py-3">{p.featured ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openProjectEdit(p)}
                        className="mr-2 inline-flex rounded-lg border border-white/10 p-1.5 hover:border-purple-400/22"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeProject(p._id)}
                        className="inline-flex rounded-lg border border-white/10 p-1.5 hover:border-red-400/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-white">Testimonials</h2>
            <button
              type="button"
              onClick={openTestimonialCreate}
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.16)] hover:bg-purple-600/92"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t._id} className="border-t border-white/5">
                    <td className="px-4 py-3 font-medium text-white">{t.name}</td>
                    <td className="px-4 py-3 text-slate-300">{t.company}</td>
                    <td className="px-4 py-3">{t.rating}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => openTestimonialEdit(t)}
                        className="mr-2 inline-flex rounded-lg border border-white/10 p-1.5 hover:border-purple-400/22"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(t._id)}
                        className="inline-flex rounded-lg border border-white/10 p-1.5 hover:border-red-400/40"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-4">
            <h2 className="font-display text-xl font-semibold text-white">Contact form messages</h2>
            <p className="mt-1 text-xs text-slate-400">
              Submissions from /contact are stored in MongoDB (<code className="text-purple-300/90">contactmessages</code>
              ). This app does not send email — reply using your mail client.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">From</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  contactMessages.map((m) => (
                    <tr key={m._id} className="border-t border-white/5 align-top">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-400">
                        {m.createdAt ? new Date(m.createdAt).toLocaleString() : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{m.name}</p>
                        <a href={`mailto:${m.email}`} className="text-xs text-purple-300 hover:underline">
                          {m.email}
                        </a>
                      </td>
                      <td className="max-w-[140px] px-4 py-3 text-slate-300">{m.subject || '—'}</td>
                      <td className="max-w-md px-4 py-3 text-slate-300">
                        <p className="line-clamp-4 whitespace-pre-wrap">{m.message}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {projectModal.open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <form
            onSubmit={saveProject}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0a18] p-6 shadow-card"
          >
            <h3 className="font-display text-lg font-semibold text-white">
              {projectModal.editingId ? 'Edit project' : 'New project'}
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <label className="block">
                <span className="text-slate-300">Title</span>
                <input
                  required
                  value={projectModal.title}
                  onChange={(e) => setProjectModal((m) => ({ ...m, title: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Excerpt (short — used on project grid)</span>
                <textarea
                  rows={2}
                  value={projectModal.excerpt}
                  onChange={(e) => setProjectModal((m) => ({ ...m, excerpt: e.target.value }))}
                  placeholder="One or two sentences for the card…"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-600"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Full description (modal / detail)</span>
                <textarea
                  rows={5}
                  value={projectModal.description}
                  onChange={(e) => setProjectModal((m) => ({ ...m, description: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-slate-300">Start date</span>
                  <input
                    type="date"
                    value={projectModal.startDate}
                    onChange={(e) => setProjectModal((m) => ({ ...m, startDate: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-slate-300">End date</span>
                  <input
                    type="date"
                    value={projectModal.endDate}
                    onChange={(e) => setProjectModal((m) => ({ ...m, endDate: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-slate-300">Category</span>
                <input
                  value={projectModal.category}
                  onChange={(e) => setProjectModal((m) => ({ ...m, category: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Video URL (YouTube, Vimeo, or direct .mp4/.webm)</span>
                <input
                  value={projectModal.videoUrl}
                  onChange={(e) => setProjectModal((m) => ({ ...m, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=… or youtu.be/…"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-600"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">GitHub link</span>
                <input
                  value={projectModal.githubLink}
                  onChange={(e) => setProjectModal((m) => ({ ...m, githubLink: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Live site link</span>
                <input
                  value={projectModal.liveLink}
                  onChange={(e) => setProjectModal((m) => ({ ...m, liveLink: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="flex items-center gap-2 text-slate-200">
                <input
                  type="checkbox"
                  checked={projectModal.featured}
                  onChange={(e) => setProjectModal((m) => ({ ...m, featured: e.target.checked }))}
                />
                Featured
              </label>
              <label className="block">
                <span className="text-slate-300">Cover image (grid card)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProjectCoverFile(e.target.files?.[0] || null)}
                  className="mt-1 w-full text-xs text-slate-300"
                />
              </label>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <p className="text-xs font-medium text-slate-300">Gallery / result images</p>
                {projectModal.galleryUrls?.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {projectModal.galleryUrls.map((url) => (
                      <li
                        key={url}
                        className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-slate-400"
                      >
                        <span className="max-w-[140px] truncate">{url}</span>
                        <button
                          type="button"
                          className="text-red-300 hover:text-red-200"
                          onClick={() =>
                            setProjectModal((m) => ({
                              ...m,
                              galleryUrls: m.galleryUrls.filter((u) => u !== url),
                            }))
                          }
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const next = Array.from(e.target.files || []);
                    setProjectGalleryFiles((prev) => [...prev, ...next]);
                    e.target.value = '';
                  }}
                  className="mt-2 w-full text-xs text-slate-300"
                />
                {projectGalleryFiles.length > 0 && (
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-500">
                    {projectGalleryFiles.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex justify-between gap-2">
                        <span className="truncate">{f.name}</span>
                        <button
                          type="button"
                          className="shrink-0 text-red-300 hover:text-red-200"
                          onClick={() => setProjectGalleryFiles((prev) => prev.filter((_, j) => j !== i))}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setProjectCoverFile(null);
                  setProjectGalleryFiles([]);
                  setProjectModal({ open: false, editingId: null, ...emptyProject });
                }}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_14px_rgba(168,85,247,0.12)] hover:bg-purple-600/92"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {testimonialModal.open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <form
            onSubmit={saveTestimonial}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0a18] p-6 shadow-card"
          >
            <h3 className="font-display text-lg font-semibold text-white">
              {testimonialModal.editingId ? 'Edit testimonial' : 'New testimonial'}
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <label className="block">
                <span className="text-slate-300">Name</span>
                <input
                  required
                  value={testimonialModal.name}
                  onChange={(e) => setTestimonialModal((m) => ({ ...m, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Designation</span>
                <input
                  value={testimonialModal.designation}
                  onChange={(e) => setTestimonialModal((m) => ({ ...m, designation: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Company</span>
                <input
                  value={testimonialModal.company}
                  onChange={(e) => setTestimonialModal((m) => ({ ...m, company: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Message</span>
                <textarea
                  required
                  rows={4}
                  value={testimonialModal.message}
                  onChange={(e) => setTestimonialModal((m) => ({ ...m, message: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Rating (1–5)</span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={testimonialModal.rating}
                  onChange={(e) =>
                    setTestimonialModal((m) => ({ ...m, rating: Number(e.target.value || 5) }))
                  }
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-slate-300">Image upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTestimonialFile(e.target.files?.[0] || null)}
                  className="mt-1 w-full text-xs text-slate-300"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setTestimonialModal({ open: false, editingId: null, ...emptyTestimonial })
                }
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_14px_rgba(168,85,247,0.12)] hover:bg-purple-600/92"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </PageShell>
  );
}
