import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';

import TestOneController from './modules/overnight-js-controllers/test-one-controller';
import TestTwoController from './modules/overnight-js-controllers/test-two-controller';

class App extends Server {
  public app: express.Application;

  constructor() {
    super();

    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupControllers() /*: Array<CustomController>*/ {
    let testOneController = new TestOneController();
    let testTwoController = new TestOneController();

    // let dbConnObj = new SomeDbConnClass('credentials');
    // TestOneController.setDbConn(dbConnObj);
    // TestTwoController.setDbConn(dbConnObj);
    super.addControllers([TestOneController, TestTwoController]);
  }
}

export default new App().app;
