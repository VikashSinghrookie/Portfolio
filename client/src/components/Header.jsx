import { useState } from 'react';

const LINKS = ['About', 'Projects', 'Experience', 'Skills', 'Education', 'Contact'];

export default function Header({ name }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '');
  document.documentElement.dataset.theme = theme;

  const toggle = () => {
    const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const next = dark ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  return (
    <header>
      <div className="bar">
        <a className="logo" href="#top">{name}</a>
        <nav>{LINKS.map((l) => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}</nav>
        <button className="tbtn" onClick={toggle} aria-label="Toggle theme">Theme</button>
      </div>
    </header>
  );
}
