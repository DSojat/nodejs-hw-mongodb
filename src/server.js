import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

  server.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  server.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      res.json({
        status: 404,
        message: 'Contact not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  server.use('*', (req, res, next) => {
    res.json({
      status: 404,
      message: 'Not found',
    });
  });

  server.use((err, req, res, next) => {
    res.json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
