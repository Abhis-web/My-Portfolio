import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SectionShell from './SectionShell';

function About() {
  return (
    <SectionShell id="about">
      <SectionHeading title="About" subtitle="Who I Am" />
      <Reveal>
        <div className="surface-card p-7 sm:p-10">
          <p className="max-w-4xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Hi, I&apos;m Abhisek Pattanaik, a full-stack developer passionate about building modern web
            applications and intelligent digital tools. I enjoy working across frontend and backend
            to create scalable and user-focused products.
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}

export default About;
