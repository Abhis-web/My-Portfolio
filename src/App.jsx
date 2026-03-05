import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import IntroTerminal from './components/IntroTerminal';
import CommandPalette from './components/CommandPalette';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const htmlStyle = document.documentElement.style;
    const bodyStyle = document.body.style;
    const prevHtmlOverflow = htmlStyle.overflow;
    const prevBodyOverflow = bodyStyle.overflow;

    if (!introFinished) {
      htmlStyle.overflow = 'hidden';
      bodyStyle.overflow = 'hidden';
    } else {
      htmlStyle.overflow = '';
      bodyStyle.overflow = '';
    }

    return () => {
      htmlStyle.overflow = prevHtmlOverflow;
      bodyStyle.overflow = prevBodyOverflow;
    };
  }, [introFinished]);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-canvas text-ink">
      <CursorGlow />

      {!introFinished ? (
        <IntroTerminal onFinish={setIntroFinished} />
      ) : (
        <>
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute left-1/2 top-[-240px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-zinc-500/20 blur-[130px]" />
            <div className="absolute bottom-[-220px] right-[-120px] h-[460px] w-[460px] rounded-full bg-zinc-700/20 blur-[130px]" />
          </div>

          <Navbar />
          <main className="layout-shell pb-[var(--space-3xl)] pt-[calc(var(--space-3xl)+1rem)]">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <CommandPalette />
        </>
      )}
    </div>
  );
}

export default App;
