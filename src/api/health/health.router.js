const express = require('express');
const router = express.Router();
const fs = require('node:fs/promises');
const path = require('node:path');

// Swagger docs for this router
require('./health.swagger');

/**
 * GET /api/health
*/
router.get('/', async (req, res) => {
  const dbPath = path.join(__dirname, '../../db/data.json');

  try {
    // Check file existence
    const raw = await fs.readFile(dbPath, 'utf8');

    // Validate JSON
    const data = JSON.parse(raw);

    // Validate structure
    const hasCharactersArray =
      data &&
      typeof data === 'object' &&
      Array.isArray(data.characters);

    if (!hasCharactersArray) {
      return res.status(500).send({
        status: 'ERROR',
        message: 'Error in data.json',
        timestamp: new Date().toISOString(),
        uptimeSeconds: process.uptime(),
      });
    }

    // Everything OK
    res.send({
      status: 'OK',
      message: 'Service healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      charactersCount: data.characters.length
    });

  } catch (err) {
    // File missing, unreadable, or invalid JSON
    res.status(500).send({
      status: 'ERROR',
      message: 'Health check failed',
      error: err.message,
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
    });
  }
});

module.exports = router;