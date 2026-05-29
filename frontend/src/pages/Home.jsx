import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell.jsx';
import Seo from '../components/common/Seo.jsx';
import ProfileCard from '../components/home/ProfileCard.jsx';
import AboutCard from '../components/home/AboutCard.jsx';
import ProjectsPreviewCard from '../components/home/ProjectsPreviewCard.jsx';
import ServicesCard from '../components/home/ServicesCard.jsx';
import ContactCard from '../components/home/ContactCard.jsx';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel.jsx';
import { fetchTestimonials } from '../api/testimonials.js';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } },
};

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await fetchTestimonials();
        if (!cancelled) setTestimonials(data || []);
      } catch {
        if (!cancelled) setTestimonials([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageShell>
      <Seo
        title="Joban Kang — Portfolio"
        description="Futuristic glassmorphism portfolio — projects, services, and contact."
        path="/"
      />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 md:px-6 md:pb-28 md:pt-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6 lg:items-stretch"
        >
          <div className="flex min-h-0 lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-3">
            <ProfileCard variants={item} />
          </div>

          <div className="flex min-h-0 lg:col-start-5 lg:col-end-9 lg:row-start-1 lg:row-end-2">
            <AboutCard variants={item} />
          </div>

          <div className="flex min-h-0 lg:col-start-9 lg:col-end-[13] lg:row-start-1 lg:row-end-2">
            <ProjectsPreviewCard variants={item} />
          </div>

          <div className="flex min-h-0 lg:col-start-5 lg:col-end-9 lg:row-start-2 lg:row-end-3">
            <ServicesCard variants={item} />
          </div>

          <div className="flex min-h-0 lg:col-start-9 lg:col-end-[13] lg:row-start-2 lg:row-end-3">
            <ContactCard variants={item} />
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="mt-12 md:mt-16"
        >
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">
                Testimonials
              </p>
              <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">Voices from collaborators</h2>
            </div>
            <Link
              to="/testimonials"
              className="text-sm font-semibold text-purple-200/90 underline-offset-4 hover:text-purple-100/95 hover:underline"
            >
              View all
            </Link>
          </div>
          <TestimonialCarousel items={testimonials} />
        </motion.section>
      </main>
    </PageShell>
  );
}
