import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Message from '../models/Message.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fallbackFile = path.join(__dirname, '../../data/messages.json');
const router = Router();

// 5 messages per 15 minutes per IP
router.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false }));

const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

router.post('/', async (req, res) => {
  const { name = '', email = '', message = '' } = req.body || {};
  if (!name.trim() || !emailOk(email) || message.trim().length < 5) {
    return res.status(400).json({ error: 'Please enter your name, a valid email and a message.' });
  }
  const doc = { name: name.trim(), email: email.trim(), message: message.trim() };

  try {
    if (mongoose.connection.readyState === 1) {
      await Message.create(doc);
    } else {
      let list = [];
      try { list = JSON.parse(await fs.readFile(fallbackFile, 'utf8')); } catch {}
      list.push({ ...doc, createdAt: new Date().toISOString() });
      await fs.writeFile(fallbackFile, JSON.stringify(list, null, 2));
    }
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save your message. Please try again.' });
  }
});

export default router;
