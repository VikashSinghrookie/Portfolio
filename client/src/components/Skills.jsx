import Tags from './Tags.jsx';

export default function Skills({ skills = {} }) {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group}><b>{group}</b><Tags items={items} /></div>
        ))}
      </div>
    </section>
  );
}
