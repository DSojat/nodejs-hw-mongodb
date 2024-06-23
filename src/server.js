import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { default as contactsRouter } from './routers/contacts.js'; // Імпортуємо роутер

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const server = express();

  server.use(express.json());
  server.use(cors());

  server.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  server.use(contactsRouter); // Додаємо роутер до server як middleware

  server.use('*', (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
    next();
  });

  server.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
