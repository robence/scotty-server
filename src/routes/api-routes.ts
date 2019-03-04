import { Application } from 'express';

import ContactController from '../controllers/contact-controller';
// import UserController from '../modules/user/user-controller';
// import UsersController from '../modules/user/users-controller';
// import AccountController from '../modules/account/account-controller';
// import AccountsController from '../modules/account/accounts-controller';

export class Routes {
  constructor(public router: Application) {
    this.config();
  }

  config(): void {
    this.setupContacts();

    // this.setupUsers();
    // this.setupUserDetails();
    //
    // this.setupAccounts();
    // this.setupAccountDetails();
  }

  setupContacts() {
    this.router
      .route('/api/contacts')
      .get(ContactController.getAll)
      .post(ContactController.create);

    this.router
      .route('/api/contacts/:id')
      .get(ContactController.get)
      .put(ContactController.update)
      .delete(ContactController.delete);
  }

  // setupUsers() {
  //   this.router
  //     .route('/users')
  //     .get(UsersController.get)
  //     .post(UsersController.create);
  // }
  //
  // setupUserDetails() {
  //   this.router
  //     .route('/users/:id')
  //     .get(UserController.get)
  //     .put(UserController.update)
  //     .delete(UserController.delete);
  // }
  //
  // setupAccounts() {
  //   this.router
  //     .route('/accounts')
  //     .get(AccountsController.get)
  //     .post(AccountsController.create);
  // }
  //
  // setupAccountDetails() {
  //   this.router
  //     .route('/accounts/:id')
  //     .get(AccountController.get)
  //     .put(AccountController.update)
  //     .delete(AccountController.delete);
  // }
}
