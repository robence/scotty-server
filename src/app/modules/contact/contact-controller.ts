import Contact from "./contact-model";

import { Request, Response } from "express";

class ContactController {

  get(req: Request, res: Response) {
    Contact.findById(req.params.id, (err, contact) => {
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
        contact.save(function(err) {
          if (err) {
            res.json(err);
          }
          res.json(contact);
        });
      }
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
