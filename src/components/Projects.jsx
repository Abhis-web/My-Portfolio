import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import SectionShell from './SectionShell';

const filters = ['All', 'AI', 'Full Stack', 'Web Apps'];

const projects = [
  {
    title: 'Farm AI',
    description: 'AI platform helping farmers with crop insights and recommendations.',
    tech: ['React', 'Node.js', 'Tailwind', 'AI APIs'],
    categories: ['AI', 'Full Stack'],
    liveUrl: 'https://farm-ai-alpha.vercel.app'
  },
  {
    title: 'FinSight AI',
    description:
      'AI-powered financial insights platform with news analysis and market intelligence.',
    tech: ['React', 'Tailwind', 'AI APIs'],
    categories: ['AI', 'Web Apps'],
    liveUrl: 'https://fitsightai-frontend.vercel.app'
  },
  {
    title: 'Savant AI',
    description: 'Modern AI assistant platform with productivity and intelligent tools.',
    tech: ['React', 'Node.js', 'AI APIs'],
    categories: ['Full Stack', 'Web Apps']
  }
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SectionShell id="projects">
      <SectionHeading title="Projects" subtitle="Selected Work" />
      <Reveal className="mb-[var(--space-lg)]">
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm ${
                  isActive
                    ? 'border-zinc-300 text-black'
                    : 'border-zinc-700 bg-zinc-950/70 text-zinc-300 hover:border-zinc-500 hover:text-white'
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 bg-zinc-200"
                    transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                  />
                ) : null}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-[var(--space-md)] md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.98, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, scale: 0.97, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tech={project.tech}
                liveUrl={project.liveUrl}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionShell>
  );
}

export default Projects;
