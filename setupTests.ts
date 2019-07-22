import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config({ path: '.env.test' });

  if (result.error) {
    throw result.error;
  }
}
