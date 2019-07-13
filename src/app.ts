import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';

import { Application } from 'express';
import clientErrorHandler from './middleware/client-error-handler';
// import loggerMiddleware from './middleware/logger';
import ContactController from './features/contact/Controller';

const { MONGO_URL, PORT } = process.env;

class App extends Server {
  public constructor() {
    super();

    this.setupMiddlewares();
    this.setupRoutes();
    this.setupDatabase();
  }

  public start(): void {
    this.app.listen(PORT || 5000, (): void => {
      // eslint-disable-next-line no-console
      console.log('[SUCCESS] - Express server listening on port', PORT || 5000);
    });
  }

  public getApp(): Application {
    return this.app;
  }

  // after tests manual disconnect is called since mongoose is handled inside app
  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    // eslint-disable-next-line no-console
    return console.log('[SUCCESS] - Disconnected from MongoDB.');
  }

  private setupMiddlewares(): void {
    this.app
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      // .use(loggerMiddleware)
      .use(clientErrorHandler);
    // .use(
    //   // eslint-disable-next-line
    //   (err, req, res, next): void => {
    //     // eslint-disable-next-line no-console
    //     console.error(err.stack);
    //     res.status(500).send('Something broke!');
    //   },
  }

  private setupRoutes(): void {
    super.addControllers([ContactController]);
  }

  private setupDatabase(): void {
    const options = { useNewUrlParser: true };
    mongoose.set('useCreateIndex', true);

    mongoose.connect(MONGO_URL, options).then(
      /* eslint-disable no-console */
      (): void => console.log('[SUCCESS] - Connected to MongoDB.'),
      (): void => console.log('[ERROR] - Cannot connect to MongoDB!'),
      /* eslint-enable no-console */
    );
  }
}
const instance = new App();
export default instance;
