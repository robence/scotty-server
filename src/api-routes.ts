import * as express from 'express'
import ContactController from './contact/ContactController';

class ApiRoutes {
  public router;

  constructor() {
    this.router = express.Router();
    this.setupBaseRoute();
    this.setupContactsRoute();
  }

  setupBaseRoute() {
    this.router.get('/', function (req,res) {
      res.json({
        status: 'API Its Working',
        message: 'Welcome to scotty!'
      });
    });
  }

  setupContactsRoute() {
    this.router.route('/contacts')
      .get(ContactController.get)
      .post(ContactController.create);
  }

  setupContactDetailsRoutes() {
    this.router.route('/contacts/:contacts_id')
      .get(ContactController.view)
      .patch(ContactController.update)
      .put(ContactController.update)
      .delete(ContactController.delete);
  }

  getRouter() {
    return this.router;
  }
}

export default new ApiRoutes().router;
