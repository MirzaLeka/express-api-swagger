const express = require('express');
const router = express.Router();
const fs = require('node:fs/promises');
const path = require('node:path');

// Swagger docs for this router
require('./logs.swagger');

/**
 * GET /api/logs/today
*/
router.get('/today', async (req, res) => {
  try {
    const logPath = path.join(__dirname, '../../logs/access.log');
    const raw = await fs.readFile(logPath, 'utf8');

    const lines = raw.split('\n').filter(Boolean);
    const parsed = lines.map(parseLogLine).filter(Boolean);

    res.send(parsed);
  } catch (err) {
    res.status(500).send({ status: 500, message: 'Could not read logs', err });
  }
});

// parse access.log records into objects
function parseLogLine(line) {
  const regex =
    /^(\S+)\s-\s(\S+)\s\[(.+?)\]\s"(\S+)\s(.+?)\sHTTP\/(.+?)"\s(\d+)\s(\S+)\s-\s([\d.]+)\sms\s"(.+?)"\s"(.+)"$/;

  const match = line.match(regex);
  if (!match) return null;

  return {
    remoteAddr: match[1],
    remoteUser: match[2],
    date: match[3],
    method: match[4],
    url: match[5],
    httpVersion: match[6],
    status: Number(match[7]),
    contentLength: match[8] === '-' ? null : Number(match[8]),
    responseTimeMs: Number(match[9]),
    referrer: match[10],
    userAgent: match[11]
  };
}

module.exports = router;
