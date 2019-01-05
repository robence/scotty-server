import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { Routes } from "./my-routes";
// import { ApiRoutes } from './api-routes'

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  public mongoUrl: string = process.env.MONGO_URL || 'mongodb://localhost/scotty';

  constructor() {
    this.app = express();
    this.routePrv.routes(this.app);
    this.config();
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    const options =  { useNewUrlParser: true };
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, options).then(
      () => console.log('[SUCCESS] - Connected to MongoDB.'),
      err => console.log('[ERROR] - Cannot connect to MongoDB!')
    )
  }

}

export default new App().app;
