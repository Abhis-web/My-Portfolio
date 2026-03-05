import Reveal from './Reveal';

function SkillGroup({ title, items, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="surface-card h-full p-7">
        <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
        <ul className="space-y-3.5 text-zinc-300">
          {items.map((item) => (
            <li key={item} className="text-sm sm:text-base">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default SkillGroup;
