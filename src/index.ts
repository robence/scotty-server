import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

// eslint-disable-next-line import/first
import App from './app';

App.start();
