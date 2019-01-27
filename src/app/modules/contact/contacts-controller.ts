import Contact from "./contact-model";

import { Request, Response } from "express";

class ContactsController {
  
  get(req: Request, res: Response) {
    Contact.get((err, contacts) => {
      if (err) {
        res.send(err);
      }
      res.json(contacts);
    });
  }

  create(req: Request, res: Response) {
    let contact = new Contact(req.body);

    contact.save(err => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }
}

const instance = new ContactsController();
export default instance;
