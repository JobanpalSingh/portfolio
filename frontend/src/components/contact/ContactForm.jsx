import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { submitContact } from '../../api/contact.js';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Message sent. Thank you!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not send message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel space-y-4 p-6 md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-slate-300">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none ring-purple-500/0 transition focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/30"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/30"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-slate-300">Subject</span>
        <input
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/30"
        />
      </label>
      <label className="block text-sm">
        <span className="text-slate-300">Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/30"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(168,85,247,0.18)] transition hover:from-purple-600/92 hover:to-indigo-600/92 disabled:opacity-60"
      >
        {loading ? 'Sending…' : 'Send message'}
      </button>
    </motion.form>
  );
}
