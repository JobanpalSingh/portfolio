import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import PageShell from '../../components/layout/PageShell.jsx';
import Seo from '../../components/common/Seo.jsx';
import { loginAdmin } from '../../api/auth.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginAdmin(email, password);
      localStorage.setItem('admin_token', data.token);
      toast.success('Signed in');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <Seo title="Admin login" description="Portfolio administration" path="/admin/login" />
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-16 md:px-6">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass-panel space-y-4 p-8"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Admin</h1>
            <p className="mt-1 text-sm text-slate-400">Sign in to manage projects and testimonials.</p>
          </div>
          <label className="block text-sm">
            <span className="text-slate-300">Email</span>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/30"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-300">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/30"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.18)] transition hover:bg-purple-600/92 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <Link to="/" className="block text-center text-xs text-slate-400 hover:text-slate-200">
            Back to site
          </Link>
        </motion.form>
      </main>
    </PageShell>
  );
}
