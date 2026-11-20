export default function Education({ education = [], highlights = [] }) {
  return (
    <section id="education">
      <h2>Education and achievements</h2>
      {education.map((e) => (
        <div className="item" key={e.title}>
          <h3>{e.title}</h3>
          <div className="meta">{e.org} · {e.date} · {e.note}</div>
        </div>
      ))}
      <div className="item">
        <h3>Certifications and more</h3>
        <ul>
          {highlights.map((h) => (
            <li key={h.text}>
              {h.text}{' '}
              {h.link && <a href={h.link} target="_blank" rel="noopener noreferrer">(view)</a>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
