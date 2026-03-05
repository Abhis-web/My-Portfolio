import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const terminalLines = [
  '> initializing portfolio...',
  '> loading developer profile...',
  "> welcome to Abhisek Pattanaik's portfolio"
];

const initialTypedLines = terminalLines.map(() => '');

function TerminalIntro() {
  const [typedLines, setTypedLines] = useState(initialTypedLines);
  const [activeLine, setActiveLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId;
    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;

    const typeNextChar = () => {
      if (cancelled) {
        return;
      }

      const fullLine = terminalLines[lineIndex];
      const nextCharCount = charIndex + 1;

      setTypedLines((previous) => {
        const next = [...previous];
        next[lineIndex] = fullLine.slice(0, nextCharCount);
        return next;
      });

      charIndex = nextCharCount;

      if (charIndex < fullLine.length) {
        timeoutId = window.setTimeout(typeNextChar, 34);
        return;
      }

      if (lineIndex < terminalLines.length - 1) {
        lineIndex += 1;
        charIndex = 0;
        setActiveLine(lineIndex);
        timeoutId = window.setTimeout(typeNextChar, 280);
        return;
      }

      setIsComplete(true);
    };

    timeoutId = window.setTimeout(typeNextChar, 450);

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
      className="pb-[var(--space-lg)]"
      aria-label="Portfolio terminal intro"
    >
      <div className="surface-card overflow-hidden p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <p className="ml-2 text-[11px] uppercase tracking-[0.24em] text-zinc-500">Terminal</p>
        </div>

        <div className="space-y-2.5 font-mono text-sm text-zinc-300 sm:text-[0.95rem]">
          {typedLines.map((line, index) => {
            const shouldShowCursor =
              (!isComplete && index === activeLine) || (isComplete && index === terminalLines.length - 1);

            return (
              <p key={terminalLines[index]} className="min-h-[1.35em]">
                {line}
                {shouldShowCursor ? <span className="terminal-cursor" aria-hidden="true" /> : null}
              </p>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default TerminalIntro;
