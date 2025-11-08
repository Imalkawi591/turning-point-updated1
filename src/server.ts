import express from 'express';
import payload from 'payload';
import path from 'path';
import 'dotenv/config';

const app = express();

// Redirect root to admin
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
async function start() {
  await payload.init({
  secret: process.env.PAYLOAD_SECRET!,
  express: app,
});

  // Add your own express routes here
  app.use('/api/v1', (req, res) => {
    res.send('API v1 endpoint');
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    payload.logger.info(`Server is running on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});