import { Application } from "express";

import ContactController from "../modules/contact/contact-controller";
import ContactsController from "../modules/contact/contacts-controller";
import UserController from "../modules/user/user-controller";
import UsersController from "../modules/user/users-controller";

export class Routes {

  constructor(public router: Application) {
    this.config();
  }

  config(): void {
    this.setupContacts();
    this.setupContactDetails();

    this.setupUsers();
    this.setupUserDetails();
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

  setupUsers() {
    this.router.route("/users")
        .get(UsersController.get)
        .post(UsersController.create);
  }

  setupUserDetails() {
    this.router.route("/users/:id")
        .get(UserController.get)
        .put(UserController.update)
        .delete(UserController.delete);
  }
}
