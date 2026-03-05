import SectionHeading from './SectionHeading';
import SkillGroup from './SkillGroup';
import SectionShell from './SectionShell';

const skillData = [
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs']
  },
  {
    title: 'AI / Tools',
    items: ['OpenAI API', 'Prompt Engineering', 'AI Integration']
  },
  {
    title: 'Other Tools',
    items: ['Git', 'GitHub', 'Vite', 'VS Code', 'Figma']
  }
];

function Skills() {
  return (
    <SectionShell id="skills">
      <SectionHeading title="Skills" subtitle="What I Use" />
      <div className="grid gap-[var(--space-md)] sm:grid-cols-2">
        {skillData.map((group, index) => (
          <SkillGroup key={group.title} title={group.title} items={group.items} delay={index * 0.07} />
        ))}
      </div>
    </SectionShell>
  );
}

export default Skills;
