import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import * as mongoose from 'mongoose';

import ContactController from './controllers/contact-controller';

class App extends Server {
  public mongoUrl: string =
    process.env.MONGO_URL || 'mongodb://localhost/scotty';

  constructor() {
    super();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    super.addControllers([ContactController]);

    this.mongoSetup();
  }

  private mongoSetup(): void {
    const options = { useNewUrlParser: true };
    mongoose.Promise = global.Promise;
    mongoose.set('useCreateIndex', true);
    mongoose
      .connect(this.mongoUrl, options)
      .then(
        () => console.log('[SUCCESS] - Connected to MongoDB.'),
        (err) => console.log('[ERROR] - Cannot connect to MongoDB!'),
      );
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log('[SUCCESS] - Express server listening on port', port);
    });
  }

  public getApp() {
    return this.app;
  }
}
const instance = new App();
export const app = instance.getApp();
export default instance;
