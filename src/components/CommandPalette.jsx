import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const commands = [
  {
    id: 'top',
    label: 'Back to top',
    command: 'top',
    description: 'Jump to the top of the portfolio',
    action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  {
    id: 'about',
    label: 'Open About',
    command: 'about',
    description: 'Scroll to About section',
    action: () => scrollToSection('about')
  },
  {
    id: 'skills',
    label: 'Open Skills',
    command: 'skills',
    description: 'Scroll to Skills section',
    action: () => scrollToSection('skills')
  },
  {
    id: 'projects',
    label: 'Open Projects',
    command: 'projects',
    description: 'Scroll to Projects section',
    action: () => scrollToSection('projects')
  },
  {
    id: 'contact',
    label: 'Open Contact',
    command: 'contact',
    description: 'Scroll to Contact section',
    action: () => scrollToSection('contact')
  },
  {
    id: 'github',
    label: 'Open GitHub',
    command: 'github',
    description: 'Visit Abhisek GitHub profile',
    action: () => window.open('https://github.com/Abhis-web', '_blank', 'noopener,noreferrer')
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn',
    command: 'linkedin',
    description: 'Visit Abhisek LinkedIn profile',
    action: () =>
      window.open('https://www.linkedin.com/in/abhisek-pattanaik/', '_blank', 'noopener,noreferrer')
  }
];

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const offset = 104;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredCommands = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return commands;
    }

    return commands.filter((item) => {
      const haystack = `${item.command} ${item.label} ${item.description}`.toLowerCase();
      return haystack.includes(search);
    });
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const isQuickOpen = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (isQuickOpen) {
        event.preventDefault();
        setIsOpen((previous) => !previous);
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((previous) => {
          if (!filteredCommands.length) {
            return 0;
          }
          return (previous + 1) % filteredCommands.length;
        });
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((previous) => {
          if (!filteredCommands.length) {
            return 0;
          }
          return (previous - 1 + filteredCommands.length) % filteredCommands.length;
        });
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (!selected) {
          return;
        }
        selected.action();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filteredCommands, isOpen, selectedIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setQuery('');
    setSelectedIndex(0);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (selectedIndex <= filteredCommands.length - 1) {
      return;
    }

    setSelectedIndex(0);
  }, [filteredCommands.length, selectedIndex]);

  const runCommand = (command) => {
    command.action();
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs tracking-wide text-zinc-300 backdrop-blur-xl hover:border-zinc-500 hover:text-white sm:text-sm"
      >
        <span className="font-medium">Quick Commands</span>
        <span className="rounded-md border border-zinc-700 bg-zinc-900/90 px-2 py-0.5 text-[10px] sm:text-xs">
          ⌘K / Ctrl+K
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[90] bg-black/50 px-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-[14vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/95 shadow-[0_30px_80px_rgba(0,0,0,0.58)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500">{'>'}</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Type a command: projects, contact, github..."
                    className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <ul className="max-h-[50vh] overflow-y-auto py-2">
                {filteredCommands.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => runCommand(item)}
                        className={`flex w-full items-start justify-between gap-3 px-5 py-3 text-left ${
                          isSelected ? 'bg-zinc-800/80' : 'hover:bg-zinc-900/80'
                        }`}
                      >
                        <span>
                          <span className="block text-sm text-zinc-100">{item.label}</span>
                          <span className="mt-1 block text-xs text-zinc-500">{item.description}</span>
                        </span>
                        <span className="rounded-md border border-zinc-700 bg-zinc-900/90 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-zinc-300">
                          {item.command}
                        </span>
                      </button>
                    </li>
                  );
                })}

                {filteredCommands.length === 0 ? (
                  <li className="px-5 py-8 text-center text-sm text-zinc-500">No matching commands</li>
                ) : null}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;
