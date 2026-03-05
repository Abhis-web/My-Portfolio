import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from './Reveal';

const heroName = 'Abhisek Pattanaik';
const heroNameWords = (() => {
  let globalIndex = 0;

  return heroName.split(' ').map((word, wordIndex) => {
    const letters = word.split('').map((char, letterIndex) => {
      const index = globalIndex + letterIndex;
      return { char, index, key: `${wordIndex}-${letterIndex}-${char}` };
    });

    globalIndex += word.length;
    return { key: `${word}-${wordIndex}`, letters };
  });
})();

const nameLetterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.14 + index * 0.038,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.82], [1, 0.36]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative overflow-hidden pb-[var(--space-2xl)]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/6 to-black/0" />
      </div>

      <motion.div className="relative z-10" style={{ y, opacity }}>
        <Reveal className="space-y-[var(--space-sm)]">
          <p className="text-xs uppercase tracking-[0.34em] text-zinc-400 sm:text-sm">
            Full Stack Developer
          </p>
          <motion.h1
            className="max-w-5xl text-[clamp(3rem,9.3vw,8.2rem)] font-semibold leading-[0.93] tracking-[-0.02em] text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.62 }}
            aria-label={heroName}
          >
            {heroNameWords.map((word, wordIndex) => (
              <span key={word.key} className="inline-block whitespace-nowrap align-baseline">
                {word.letters.map((letter) => (
                  <motion.span
                    key={letter.key}
                    custom={letter.index}
                    variants={nameLetterVariants}
                    className="inline-block align-baseline will-change-transform"
                  >
                    {letter.char}
                  </motion.span>
                ))}
                {wordIndex < heroNameWords.length - 1 ? (
                  <span className="inline-block w-[0.3em]" aria-hidden="true" />
                ) : null}
              </span>
            ))}
          </motion.h1>
          <p className="text-[clamp(1.45rem,3.4vw,2.6rem)] font-medium text-zinc-300">
            Code. Build. Improve.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            I build modern web applications and AI-powered digital tools.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-[var(--space-lg)] flex flex-wrap gap-4">
          <motion.a
            href="#projects"
            whileHover={{ y: -2.5, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-white bg-white px-7 py-3.5 text-sm font-medium text-black hover:bg-zinc-200"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -2.5, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-zinc-700 bg-zinc-950/80 px-7 py-3.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-900"
          >
            Contact
          </motion.a>
        </Reveal>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
