import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import GlassButton from '../common/GlassButton.jsx';

export default function ContactCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-6 p-7 md:p-8"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">Contact</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-white">Let&apos;s collaborate</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-200">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" />
            <span>Remote · EU-friendly hours</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-purple-300" />
            <a href="mailto:hello@danielgallego.dev" className="transition hover:text-slate-100">
              hello@danielgallego.dev
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-purple-300" />
            <span>+34 600 000 000</span>
          </li>
        </ul>
      </div>
      <div>
        <GlassButton to="/contact">Open Contact Page</GlassButton>
      </div>
    </motion.article>
  );
}
