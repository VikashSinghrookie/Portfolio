import { useEffect, useState } from 'react';
import { getPortfolio } from './api.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getPortfolio().then(setData).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="state">{error} Is the server running?</p>;
  if (!data) return <p className="state">Loading…</p>;

  document.title = `${data.name} – ${data.role}`;

  return (
    <>
      <Header name={data.name} />
      <main>
        <Hero data={data} />
        <About stats={data.stats} />
        <Projects projects={data.projects} />
        <Experience items={data.experience} />
        <Skills skills={data.skills} />
        <Education education={data.education} highlights={data.highlights} />
        <Contact email={data.email} links={data.links} />
      </main>
      <footer>
        <span>© {new Date().getFullYear()} {data.name}</span>
        <span>{data.location}</span>
      </footer>
    </>
  );
}
