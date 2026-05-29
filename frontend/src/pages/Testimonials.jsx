import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel.jsx';
import { fetchTestimonials } from '../api/testimonials.js';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await fetchTestimonials();
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
      <Seo title="Testimonials — Joban Kang" description="Client and collaborator feedback." path="/testimonials" />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">
              Testimonials
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Trusted by teams</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Kind words from people I have shipped alongside — fetched from the API and presented in
              a focused carousel.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/16 hover:bg-white/[0.03] hover:text-slate-100"
          >
            Back home
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading testimonials…</p>
        ) : (
          <TestimonialCarousel items={items} />
        )}
      </main>
    </PageShell>
  );
}
