import { Request, Response } from 'express';

import Contact from '../models/Contact';

class ContactController {
  get(req: Request, res: Response) {
    Contact.findById(req.params.id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  getAll(req: Request, res: Response) {
    Contact.get((err, contacts) => {
      if (err) {
        res.send(err);
      }
      res.json(contacts);
    });
  }

  create(req: Request, res: Response) {
    const contact = new Contact(req.body);

    //
    // contact.validate((err) => {
    //   console.log(err); // Will tell you that null is not allowed.
    // });

    contact.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  update(req: Request, res: Response) {
    Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, contact) => {
        if (err) {
          res.send(err);
        }
        contact.save((err) => {
          if (err) {
            res.json(err);
          }
          res.json(contact);
        });
      },
    );
  }

  delete(req: Request, res: Response) {
    Contact.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json(req.params.id);
    });
  }
}

const instance = new ContactController();
export default instance;
