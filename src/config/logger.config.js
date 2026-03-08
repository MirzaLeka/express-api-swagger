const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('node:path');
const fs = require('node:fs');

// Ensure logs directory exists (for the sake of .gitignore)
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Morgan custom token for request ID (added by express-request-id)
morgan.token('id', (req) => req.id || '-');

// Filename generator for rotating logs
const generator = (time, index) => {
  // First call: return the active log file
  if (!time) return 'access.log';

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');
  const hour = String(time.getHours()).padStart(2, '0');
  const minute = String(time.getMinutes()).padStart(2, '0');

  // Example: access-20260308-1522-1.log
  return `access-${year}${month}${day}-${hour}${minute}-${index}.log`;
};

// Create rotating write stream
const accessLogStream = rfs.createStream(generator, {
  interval: '1d',   // rotate every day
  size: '10M',      // or when file exceeds 10MB
  path: logDirectory
});

// Morgan format with maximum detail
const detailedFormat =
  ':remote-addr - :remote-user [:date[iso]] ' +
  '":method :url HTTP/:http-version" :status :res[content-length] - ' +
  ':response-time ms ":referrer" ":user-agent"';

  // :id

module.exports = {
  httpLogger: morgan(detailedFormat, { stream: accessLogStream })
};