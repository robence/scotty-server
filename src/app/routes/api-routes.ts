// /lib/routes/crmRoutes.ts
import { Application } from "express";
import ContactController from "../modules/contact/contact-controller";
import ContactsController from "../modules/contact/contacts-controller";

export class Routes {

  constructor(public router: Application) {
    this.config();
  }

  config(): void {
    this.setupContacts();
    this.setupContactDetails();
  }

  setupContacts() {
    this.router.route("/contacts")
      .get(ContactsController.get)
      .post(ContactsController.create);
    }

  setupContactDetails() {
    this.router.route("/contacts/:id")
      .get(ContactController.get)
      .put(ContactController.update)
      .delete(ContactController.delete);
  }
}
