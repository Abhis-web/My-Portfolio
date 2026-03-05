import { motion } from 'framer-motion';
import Reveal from './Reveal';

function SectionHeading({ title, subtitle }) {
  return (
    <Reveal className="mb-[var(--space-lg)] max-w-3xl">
      <div className="mb-3 flex items-center gap-3">
        <motion.span
          className="h-px w-16 bg-zinc-600/90 sm:w-24"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        <p className="text-xs uppercase tracking-[0.34em] text-muted sm:text-sm">{subtitle}</p>
        <motion.span
          className="h-px flex-1 bg-zinc-700/80"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
      <h2 className="text-[clamp(2.1rem,4.4vw,3.4rem)] font-semibold tracking-tight text-white">
        {title}
      </h2>
      <motion.span
        className="mt-5 block h-px w-full max-w-md bg-zinc-700/65"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </Reveal>
  );
}

export default SectionHeading;
