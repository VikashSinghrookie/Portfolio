import { useMemo } from 'react';

// Decorative contribution grid. Replace with real data later if you like.
function useCells() {
  return useMemo(() => {
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    return Array.from({ length: 210 }, (_, i) => {
      const r = rnd() * (0.4 + (i / 210) * 0.9);
      return r < 0.3 ? 0.08 : r < 0.5 ? 0.3 : r < 0.7 ? 0.55 : r < 0.9 ? 0.8 : 1;
    });
  }, []);
}

export default function Hero({ data }) {
  const cells = useCells();
  return (
    <div className="hero" id="top">
      <div>
        <h1>{data.name}</h1>
        <p className="role">{data.role}</p>
        <p className="lead">{data.tagline}</p>
        <div className="cta">
          <a className="btn p" href="#contact">Get in touch</a>
          <a className="btn" href="#projects">See my work</a>
        </div>
      </div>
      <div>
        <div className="heat" role="img" aria-label={data.heatCaption}>
          {cells.map((o, i) => <i key={i} style={{ opacity: o }} />)}
        </div>
        <p className="cap">{data.heatCaption}</p>
      </div>
    </div>
  );
}
