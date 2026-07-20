import { MapPin, Mail, Phone } from 'lucide-react';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import BackButton from '../components/common/BackButton.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';

export default function Contact() {
  return (
    <PageShell>
      <Seo title="Contact — Joban Kang" description="Reach out for collaborations and product work." path="/contact" />
      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Contact</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">Say hello</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Share a bit about your timeline, goals, and links. I typically reply within two business
              days.
            </p>
          </div>
          <BackButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <aside className="glass-panel h-fit space-y-4 p-6 lg:col-span-2">
            <div className="flex items-start gap-3 text-sm text-slate-200">
              <MapPin className="mt-0.5 h-4 w-4 text-purple-300" />
              <span>Remote · EU-friendly hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Mail className="h-4 w-4 text-purple-300" />
              <a href="mailto:hello@jobankang.dev" className="transition hover:text-slate-100">
                hello@jobankang.dev
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Phone className="h-4 w-4 text-purple-300" />
              <span>+34 600 000 000</span>
            </div>
          </aside>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
