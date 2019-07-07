import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
// eslint-disable-next-line
import * as dotenv from 'dotenv';

import { Application } from 'express';
import ContactController from './features/Contact/contact-controller';

const { MONGO_URL, PORT } = process.env;

class App extends Server {
  public constructor() {
    super();

    this.config();
    this.setupRoutes();
    this.mongoSetup();
  }

  public start(): void {
    this.app.listen(
      PORT || 5000,
      (): void => {
        // eslint-disable-next-line no-console
        console.log(
          '[SUCCESS] - Express server listening on port',
          PORT || 5000,
        );
      },
    );
  }

  public getApp(): Application {
    return this.app;
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    // eslint-disable-next-line no-console
    return console.log('[SUCCESS] - Disconnected from MongoDB.');
  }

  private config(): void {
    this.app
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(
        // eslint-disable-next-line
        (err, req, res, next): void => {
          // eslint-disable-next-line no-console
          console.error(err.stack);
          res.status(500).send('Something broke!');
        },
      );
  }

  private setupRoutes(): void {
    super.addControllers([ContactController]);
  }

  private mongoSetup(): void {
    const options = { useNewUrlParser: true };
    mongoose.set('useCreateIndex', true);

    mongoose.connect(MONGO_URL, options).then(
      // eslint-disable-next-line no-console
      (): void => console.log('[SUCCESS] - Connected to MongoDB.'),
      // eslint-disable-next-line no-console
      (): void => console.log('[ERROR] - Cannot connect to MongoDB!'),
    );
  }
}
const instance = new App();
export default instance;
