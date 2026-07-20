import { motion } from 'framer-motion';
import {
  Briefcase,
  HeartHandshake,
  FolderKanban,
  Layers,
  GraduationCap,
  Megaphone,
  Clapperboard,
  Building2,
  Laptop,
  Code2,
  Globe,
  Palette,
  Film,
  PenTool,
  Search,
  FileText,
  Target,
  PackageCheck,
} from 'lucide-react';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import BackButton from '../components/common/BackButton.jsx';
import AboutSectionHeader from '../components/about/AboutSectionHeader.jsx';
import HighlightCard from '../components/about/HighlightCard.jsx';
import TimelineCard from '../components/about/TimelineCard.jsx';
import StrengthBar from '../components/about/StrengthBar.jsx';

const HIGHLIGHTS = [
  { duration: '2 Years', title: 'Digitofy Global', icon: Briefcase },
  { duration: '99%', title: 'Client Satisfaction', icon: HeartHandshake },
  { duration: '50+', title: 'Projects Delivered', icon: FolderKanban },
  { duration: 'Full Stack', title: 'Web & Marketing', icon: Layers },
];

const EDUCATION = [
  {
    title: 'Bachelor of Technology',
    description:
      'Focused on computer science fundamentals, software development, and digital systems design.',
    icon: GraduationCap,
  },
  {
    title: 'Digital Marketing Certification',
    description:
      'Training in performance ads, audience targeting, campaign analytics, and brand growth.',
    icon: Megaphone,
  },
  {
    title: 'Creative Media Workshop',
    description:
      'Hands-on learning in video editing, motion graphics, and visual storytelling for brands.',
    icon: Clapperboard,
  },
];

const EXPERIENCE = [
  {
    title: 'Digitofy Global Pvt. Ltd.',
    description:
      'Building custom websites, promotional content, branding assets, and ad campaigns for clients across industries.',
    icon: Building2,
  },
  {
    title: 'Freelance Digital Creator',
    description:
      'Delivering React and WordPress sites, reels, posters, and end-to-end marketing solutions for growing businesses.',
    icon: Laptop,
  },
];

const STRENGTHS = [
  { label: 'React', icon: Code2 },
  { label: 'WordPress', icon: Globe },
  { label: 'UI Design', icon: Palette },
  { label: 'Video Editing', icon: Film },
  { label: 'Branding', icon: PenTool },
  { label: 'SEO', icon: Search },
  { label: 'Ads', icon: Megaphone },
  { label: 'Content', icon: FileText },
  { label: 'Strategy', icon: Target },
  { label: 'Delivery', icon: PackageCheck },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28 } },
};

export default function About() {
  return (
    <PageShell>
      <Seo title="About — Joban Kang" description="Background, approach, and how I work with teams." path="/about" />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-6 md:pb-28 md:pt-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-14 md:space-y-20"
        >
          <section>
            <motion.div
              variants={item}
              className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <AboutSectionHeader label="About" className="mb-0" />
              <BackButton className="shrink-0 self-start sm:self-auto" />
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <motion.div variants={container} className="grid grid-cols-2 gap-4">
                {HIGHLIGHTS.map((h) => (
                  <HighlightCard
                    key={h.title}
                    duration={h.duration}
                    title={h.title}
                    icon={h.icon}
                    variants={item}
                  />
                ))}
              </motion.div>

              <motion.div variants={item} className="flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/90">About</p>
                <h1 className="mt-3 font-display text-xl font-bold leading-snug text-white md:text-2xl">
                  Helping businesses grow through websites, creative content, and marketing that
                  delivers real results.
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                  With 2 years of professional experience at Digitofy Global Pvt. Ltd., I specialize in
                  helping businesses build a strong digital presence through websites, creative
                  content, and marketing solutions.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                  From custom-coded React and WordPress websites to video editing, promotional reels,
                  posters, branding, and advertising campaigns, I deliver solutions that create
                  impact with quality work, on-time delivery, and clear communication.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <motion.div variants={item}>
                <AboutSectionHeader label="Education" />
              </motion.div>
              <motion.div variants={container} className="space-y-4">
                {EDUCATION.map((entry) => (
                  <TimelineCard
                    key={entry.title}
                    title={entry.title}
                    description={entry.description}
                    icon={entry.icon}
                    variants={item}
                  />
                ))}
              </motion.div>
            </div>

            <div>
              <motion.div variants={item}>
                <AboutSectionHeader label="Experience" />
              </motion.div>
              <motion.div variants={container} className="space-y-4">
                {EXPERIENCE.map((entry) => (
                  <TimelineCard
                    key={entry.title}
                    title={entry.title}
                    description={entry.description}
                    icon={entry.icon}
                    variants={item}
                  />
                ))}
              </motion.div>
            </div>
          </section>
          <section>
            <motion.div variants={item}>
              <AboutSectionHeader label="Strength" />
            </motion.div>
            <StrengthBar skills={STRENGTHS} variants={item} />
          </section>
          <motion.p
            variants={item}
            className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-slate-300 md:text-[15px]"
          >
            I believe in quality work, on-time delivery, and clear communication — maintaining a 99%
            client satisfaction rate. My goal is simple: turning ideas into professional digital
            experiences that help businesses grow and stand out in competitive markets.
          </motion.p>
        </motion.div>
      </main>
    </PageShell>
  );
}
