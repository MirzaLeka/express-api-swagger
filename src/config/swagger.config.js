const path = require('node:path');

const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Characters API',
      version: '1.0.0',
      description: 'Famous cartoon characters from various universes'
    }
  },
  apis: [
    path.join(__dirname, '../app.js'),
    path.join(__dirname, '../api/**/*.js')
  ]
};

module.exports = swaggerConfig;
