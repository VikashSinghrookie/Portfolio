export default function About({ stats = [] }) {
  return (
    <section id="about">
      <h2>About</h2>
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
        ))}
      </div>
    </section>
  );
}
