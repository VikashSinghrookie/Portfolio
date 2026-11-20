import Tags from './Tags.jsx';

export default function Projects({ projects = [] }) {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <article className="proj" key={p.name}>
            <h3>{p.name}</h3>
            <div className="meta">{p.role} · {p.date}</div>
            <p>{p.desc}</p>
            <Tags items={p.tags} />
            {p.link && <a className="plink" href={p.link} target="_blank" rel="noopener noreferrer">View live demo</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
