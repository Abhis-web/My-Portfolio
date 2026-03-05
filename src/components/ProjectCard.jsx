import { motion } from 'framer-motion';

function ProjectCard({ title, description, tech, liveUrl }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      className="surface-card group flex h-full flex-col p-7"
    >
      <h3 className="text-xl font-semibold text-white">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:text-zinc-100 hover:underline"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">{description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-700/90 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>

      <a
        href="https://github.com/Abhis-web"
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex w-fit items-center rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-400 hover:bg-zinc-900"
      >
        GitHub
      </a>
    </motion.article>
  );
}

export default ProjectCard;
