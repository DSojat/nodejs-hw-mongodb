import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { default as contactsRouter } from './routers/contacts.js'; // Імпортуємо роутер
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

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

  server.use('*', notFoundHandler);

  server.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
