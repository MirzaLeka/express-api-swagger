require('dotenv').config();
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config/swagger.config');
const { httpLogger } = require('./config/logger.config');

const swaggerSpec = swaggerJsdoc(swaggerConfig);
const helmetConfig = require('./config/helmet.config')
const app = express();
const PORT = process.env.PORT || 3000;

app
  .use(httpLogger) // HTTP Logging
  .use(express.json()) // Request Body parsing
  .use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec)) // Swagger UI
  .use(helmet(helmetConfig)) // Secure headers
  .use('/api/characters', require('./api/characters/characters.router')) // Loading routes
  .use('/api/logs', require('./api/logs/logs.router'))
  .use('/api/health', require('./api/health/health.router'))

  .listen(PORT, () => {
  console.log(`Server has started on port ${PORT}!`);
});
