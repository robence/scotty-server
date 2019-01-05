// /lib/routes/crmRoutes.ts
import { Application, Request, Response } from "express";
import ContactController from '../contact/ContactController';

export class Routes {
  public router: Application;

  constructor(router: Application) {
    this.router = router;
    this.config();
  }

  config(): void {
      this.setupContactsRoute();
  }

  setupContactsRoute() {
    this.router.route('/contacts')
      .get(ContactController.get)
      .post(ContactController.create);

    this.router.route('/contacts/:contacts_id')
      .get(ContactController.view)
      .patch(ContactController.update)
      .put(ContactController.update)
      .delete(ContactController.delete);
  }

}
