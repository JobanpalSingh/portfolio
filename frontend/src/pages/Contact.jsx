import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';

export default function Contact() {
  return (
    <PageShell>
      <Seo title="Contact — Daniel Gallego" description="Reach out for collaborations and product work." path="/contact" />
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Contact</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Say hello</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Share a bit about your timeline, goals, and links. I typically reply within two business
            days.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <aside className="glass-panel h-fit space-y-4 p-6 lg:col-span-2">
            <div className="flex items-start gap-3 text-sm text-slate-200">
              <MapPin className="mt-0.5 h-4 w-4 text-purple-300" />
              <span>Remote · EU-friendly hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Mail className="h-4 w-4 text-purple-300" />
              <a href="mailto:hello@danielgallego.dev" className="transition hover:text-slate-100">
                hello@danielgallego.dev
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Phone className="h-4 w-4 text-purple-300" />
              <span>+34 600 000 000</span>
            </div>
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/16 hover:bg-white/[0.03] hover:text-slate-100"
            >
              Back home
            </Link>
          </aside>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
