import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '../../data/portfolio.json');
const router = Router();

// Content lives in server/data/portfolio.json. Edit it, refresh the page.
router.get('/', async (_req, res) => {
  try {
    res.json(JSON.parse(await fs.readFile(file, 'utf8')));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not read portfolio data.' });
  }
});

export default router;
