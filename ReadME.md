
# Express API with Swagger, Logging, and Health Checks

This project is a lightweight, production‑ready Express.js API featuring:

- **Swagger UI** for interactive API documentation
- **Rotating access logs** using `morgan` + `rotating-file-stream`
- **Security headers** via `helmet`
- **Environment variables** via `dotenv`
- A simple **JSON-based data store**
- Built‑in **health** and **log inspection** endpoints

The goal is to provide a clean, maintainable starting point for building small to medium-sized APIs with proper observability and documentation.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Start the server using PM2:

```bash
npm start
```

The API will run on the port defined in your `.env` file (default: `3000`).

---

## 📘 API Documentation (Swagger)

Swagger UI is available at:

```
/swagger
```

This interactive interface documents all available routes, request/response schemas, and status codes.

---

## 📊 Logs

The API writes detailed HTTP access logs to:

```
/logs/access.log
```

Rotated logs are stored in the same directory with timestamped filenames.

You can retrieve **today’s logs** via:

```
GET /api/logs/today
```

This endpoint reads the active `access.log`, parses each entry, and returns them as structured JSON objects.

---

## ❤️ Health Check

A lightweight health endpoint is available at:

```
GET /api/health
```

This route performs a basic self‑diagnostic, including:

- Checking the existence of `src/db/data.json`
- Validating that it contains a `characters` array
- Returning service status, timestamp, and additional metadata

Example response:

```json
{
  "status": "OK",
  "message": "Service healthy",
  "charactersCount": 12,
  "timestamp": "2026-03-08T14:45:15.437Z"
  "uptimeSeconds": 100.00
}
```

---

## 📁 Project Structure

```
src/
  api/
    characters/
    logs/
    health/
  config/
    helmet.config.js
    logger.config.js
    swagger.config.js
  db/
    data.json
  app.js
```

---

## 🔐 Security

The API uses:

- `helmet` for secure HTTP headers
- CSP rules compatible with Swagger UI

---

## 📄 License

MIT
