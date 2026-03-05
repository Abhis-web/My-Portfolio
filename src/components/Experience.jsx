import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SectionShell from './SectionShell';

function Experience() {
  return (
    <SectionShell id="experience">
      <SectionHeading title="Experience" subtitle="Current" />
      <Reveal>
        <div className="surface-card p-7 sm:p-10">
          <h3 className="text-xl font-semibold text-white">Independent Developer</h3>
          <p className="mt-4 text-zinc-300 sm:text-lg">
            Building AI-powered web applications and personal projects.
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}

export default Experience;
