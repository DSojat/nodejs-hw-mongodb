import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import router from './routers/index.js'; // Імпортуємо роутер
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
  const server = express();

  server.use(express.json());
  server.use(cors());
  server.use(cookieParser());

  server.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  server.use(router); // Додаємо роутер до server як middleware

  server.use('/uploads', express.static(UPLOAD_DIR));

  server.use('*', notFoundHandler);

  server.use(errorHandler);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
