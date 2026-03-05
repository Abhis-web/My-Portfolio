import { motion } from 'framer-motion';

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.793 23.385c.6.111.82-.26.82-.577V21.09c-3.338.727-4.042-1.61-4.042-1.61-.546-1.388-1.334-1.757-1.334-1.757-1.09-.744.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.072 1.837 2.812 1.306 3.496.998.108-.776.42-1.306.764-1.607-2.665-.303-5.467-1.333-5.467-5.932 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.175 0 0 1.008-.322 3.3 1.23A11.495 11.495 0 0 1 12 6.334c1.02.004 2.047.138 3.008.404 2.291-1.552 3.298-1.23 3.298-1.23.655 1.652.243 2.872.119 3.175.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.625-5.48 5.921.432.374.817 1.11.817 2.238v3.314c0 .32.218.694.825.576A12.001 12.001 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.028-3.037-1.851-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.347V9h3.415v1.561h.05c.476-.9 1.637-1.85 3.367-1.85 3.598 0 4.268 2.368 4.268 5.451v6.29ZM5.337 7.433a2.065 2.065 0 1 1 0-4.13 2.065 2.065 0 0 1 0 4.13Zm1.778 13.019H3.559V9h3.556v11.452Z" />
    </svg>
  );
}

function Footer() {
  return (
    <motion.footer
      className="relative border-t border-white/10 py-[var(--space-lg)]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-divider" />
      <div className="layout-shell flex items-center justify-between">
        <p className="text-xs text-zinc-500 sm:text-sm">Abhisek Pattanaik</p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Abhis-web"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-700 p-2 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/abhisek-pattanaik/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-700 p-2 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-900 hover:text-white"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
