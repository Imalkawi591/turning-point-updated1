import express from 'express';
import payload from 'payload';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET as string,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  app.listen(PORT, async () => {
    payload.logger.info(`Server listening on port ${PORT}`);
    payload.logger.info(`Admin URL: http://localhost:${PORT}${payload.getAdminURL()}`);
  });
};

start();