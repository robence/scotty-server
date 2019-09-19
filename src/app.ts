import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import * as cors from 'cors';
import { Application } from 'express';
import { Logger } from '@overnightjs/logger';
import * as passport from 'passport';

import { loggerMiddleware, clientErrorHandler } from './middleware';
import controllers from './features';

export default class App extends Server {
  public constructor() {
    super();

    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  public start(port): void {
    this.app.listen(port, (): void => {
      Logger.Imp(`Express server listening on port ${port}.`);
    });
  }

  public getApp(): Application {
    return this.app;
  }

  private setupMiddlewares(): void {
    this.app
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(loggerMiddleware)
      .use(passport.initialize());
  }

  private setupRoutes(): void {
    super.addControllers(controllers);
  }

  private setupErrorHandler(): void {
    this.app.use(clientErrorHandler);
  }
}
