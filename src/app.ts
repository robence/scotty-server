import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

import ContactController from './controllers/contact-controller';
import AccountController from './controllers/account-controller';
import CategoryController from './controllers/category-controller';

const { MONGO_URL, PORT } = process.env;

class App extends Server {
  public env;

  constructor() {
    super();

    this.config();
    this.setupRoutes();
    this.mongoSetup();
  }

  public start(): void {
    this.app.listen(PORT || 5000, () => {
      console.log('[SUCCESS] - Express server listening on port', PORT || 5000);
    });
  }

  public getApp() {
    return this.app;
  }

  private config(): void {
    this.app
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
      });
  }

  private setupRoutes() {
    super.addControllers([
      ContactController,
      AccountController,
      CategoryController,
    ]);
  }

  private mongoSetup(): void {
    const options = { useNewUrlParser: true };
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);

    mongoose
      .connect(MONGO_URL, options)
      .then(
        () => console.log('[SUCCESS] - Connected to MongoDB.'),
        (err) => console.log('[ERROR] - Cannot connect to MongoDB!'),
      );
  }
}
const instance = new App();
export const app = instance.getApp();
export default instance;
