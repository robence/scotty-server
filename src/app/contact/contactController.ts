import Contact from "./contactModel";
import { Request, Response } from "express";

class ContactController {
  get(req: Request, res: Response) {
    Contact.get((err, contacts) => {
      if (err) {
        res.send({
          status: "error",
          message: "err"
        });
      }
      res.json({
        status: "success",
        message: "Contacts retrieved successfully",
        data: contacts
      });
    });
  }

  create(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    let contact = new Contact();
    // Todo: do this inside constructor
    contact.name = body.name ? body.name : "";
    contact.gender = body.gender;
    contact.email = body.email;
    contact.phone = body.phone;

    contact.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "New contact created!",
        data: contact
      });
    });
  }

  view(req: Request, res: Response) {
    Contact.findById(req.params.contact_id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Contact details loading..",
        data: contact
      });
    });
  }

  update(req: Request, res: Response) {
    // TODO: Replace with next 10 lines
    // Contact.findOneAndUpdate({ _id: req.params.contactId },
    // req.body, { new: true }, (err, contact) => {

    Contact.findById(req.params.contact_id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      contact.name = req.body.name ? req.body.name : contact.name;
      contact.gender = req.body.gender;
      contact.email = req.body.email;
      contact.phone = req.body.phone;

      contact.save(function(err) {
        if (err) {
          res.json(err);
        }
        res.json({
          message: "Contact Info updated!",
          data: contact
        });
      });
    });
  }

  delete(req: Request, res: Response) {
    Contact.remove({ _id: req.params.contact_id }, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({
        status: "success",
        message: "Successfully deleted contact!"
      });
    });
  }
}

const instance = new ContactController();
export default instance;
