// All backend calls live here. Change BASE if the API is hosted elsewhere.
const BASE = import.meta.env.VITE_API_URL || '/api';

export async function getPortfolio() {
  const res = await fetch(`${BASE}/portfolio`);
  if (!res.ok) throw new Error('Could not load portfolio data.');
  return res.json();
}

export async function sendMessage(payload) {
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}
