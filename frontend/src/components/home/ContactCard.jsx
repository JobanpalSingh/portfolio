import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import GlassButton from '../common/GlassButton.jsx';
import CardSectionHeader from './CardSectionHeader.jsx';

function ContactRow({ icon: Icon, children }) {
  return (
    <li className="flex items-start gap-3 text-sm text-slate-200/95">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-900/45 ring-1 ring-purple-700/25">
        <Icon className="h-3.5 w-3.5 text-purple-300/85" />
      </span>
      <span className="pt-1 leading-relaxed">{children}</span>
    </li>
  );
}

export default function ContactCard({ variants }) {
  return (
    <motion.article
      variants={variants}
      className="glass-panel glass-panel-hover flex h-full min-h-0 w-full flex-col justify-between gap-6 p-7 md:p-8"
    >
      <div>
        <CardSectionHeader label="Contact" bordered />
        <ul className="space-y-4">
          <ContactRow icon={MapPin}>Remote · EU-friendly hours</ContactRow>
          <ContactRow icon={Mail}>
            <a href="mailto:hello@jobankang.dev" className="transition hover:text-white">
              hello@jobankang.dev
            </a>
          </ContactRow>
          <ContactRow icon={Phone}>+34 600 000 000</ContactRow>
        </ul>
      </div>
      <div>
        <GlassButton to="/contact" variant="gradient">
          Contact
        </GlassButton>
      </div>
    </motion.article>
  );
}
