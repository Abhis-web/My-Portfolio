import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  const scrollToTarget = (event, href) => {
    event.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (!element) {
      return;
    }

    const offset = 104;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6"
      initial={false}
      animate={{ y: isScrolled ? -1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="mx-auto flex items-center justify-between rounded-[1.35rem] border border-white/15 bg-zinc-950/65 px-5 backdrop-blur-2xl sm:px-7"
        animate={{
          width: isScrolled ? 'min(92vw, 51rem)' : 'min(94vw, 57rem)',
          paddingTop: isScrolled ? '0.68rem' : '0.82rem',
          paddingBottom: isScrolled ? '0.68rem' : '0.82rem',
          boxShadow: isScrolled
            ? '0 18px 44px rgba(0, 0, 0, 0.48)'
            : '0 24px 56px rgba(0, 0, 0, 0.38)'
        }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#"
          onClick={(event) => scrollToTarget(event, '#')}
          className="text-sm font-semibold tracking-[0.28em] text-white"
        >
          AP
        </a>
        <ul className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(event) => scrollToTarget(event, link.href)}
                className="text-sm text-zinc-300 hover:text-white focus-visible:text-white"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </motion.header>
  );
}

export default Navbar;
