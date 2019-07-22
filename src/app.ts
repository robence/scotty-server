import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as dotenv from 'dotenv';
import { Application } from 'express';
import { Logger } from '@overnightjs/logger';

import {
  loggerMiddleware,
  clientErrorHandler,
  errorHandler,
} from './middleware';
import controllers from './features';

const { MONGO_URL, PORT } = process.env;

class App extends Server {
  public constructor() {
    super();

    this.setupMiddlewares();
    this.setupRoutes();
    this.setupDatabase();
    this.setupErrorHandlers();
  }

  public start(): void {
    this.app.listen(PORT || 5000, (): void => {
      Logger.Imp(`Express server listening on port ${PORT || 5000}.`);
    });
  }

  public getApp(): Application {
    return this.app;
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    Logger.Imp('Disconnected from MongoDB.');
  }

  private setupMiddlewares(): void {
    this.app
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(loggerMiddleware);
  }

  private setupRoutes(): void {
    super.addControllers(controllers);
  }

  private setupErrorHandlers(): void {
    this.app.use(clientErrorHandler).use(errorHandler);
  }

  private async setupDatabase(): Promise<void> {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    mongoose
      .connect(MONGO_URL)
      .then(
        (): void => Logger.Imp('Connected to MongoDB.'),
        (): void => Logger.Err('Cannot connect to MongoDB!'),
      );
  }
}
const instance = new App();
export default instance;
