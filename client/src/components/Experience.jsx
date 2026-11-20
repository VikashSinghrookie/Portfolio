import Tags from './Tags.jsx';

export default function Experience({ items = [] }) {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {items.map((e) => (
        <div className="item" key={e.title}>
          <h3>{e.title}</h3>
          <div className="meta">{e.org} · {e.date}</div>
          <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <Tags items={e.tags} />
        </div>
      ))}
    </section>
  );
}
