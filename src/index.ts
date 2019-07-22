import * as dotenv from 'dotenv';
import { Logger } from '@overnightjs/logger';
import App from './app';
import { start } from './database';

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const { MONGO_URL, PORT } = process.env;

start(MONGO_URL).then(
  (): void => {
    Logger.Imp('Connected to MongoDB.');
    const server = new App();
    server.start(PORT || 5000);
  },
  (): void => Logger.Err('Cannot connect to MongoDB!'),
);

// TODO: add graceful shutdown with database disconnect
