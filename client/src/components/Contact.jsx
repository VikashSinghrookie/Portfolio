import { useState } from 'react';
import { sendMessage } from '../api.js';

const empty = { name: '', email: '', message: '' };

export default function Contact({ email, links = {} }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: '', text: '' });
    try {
      await sendMessage(form);
      setForm(empty);
      setStatus({ type: 'ok', text: 'Message sent. I will get back to you soon.' });
    } catch (err) {
      setStatus({ type: 'err', text: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p className="lead">Open to internships and full-time roles. Send a message or email me at <a href={`mailto:${email}`}>{email}</a>.</p>
      <form className="form" onSubmit={submit}>
        <label>Name<input name="name" value={form.name} onChange={change} required maxLength={100} /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={change} required maxLength={200} /></label>
        <label>Message<textarea name="message" rows="5" value={form.message} onChange={change} required minLength={5} maxLength={2000} /></label>
        <button className="btn p" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
        {status.text && <p className={`status ${status.type}`} role="status">{status.text}</p>}
      </form>
      <div className="cta">
        {Object.entries(links).filter(([, v]) => v).map(([k, v]) => (
          <a className="btn" key={k} href={v} target="_blank" rel="noopener noreferrer">{k}</a>
        ))}
      </div>
    </section>
  );
}
