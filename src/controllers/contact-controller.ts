import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import { Model, model } from 'mongoose';
import { IContactModel, ContactSchema } from '../models/Contact';

const Contact: Model<IContactModel> = model<IContactModel>(
  'Contact',
  ContactSchema,
);

@Controller('api/contacts')
class ContactController {
  @Get(':id')
  get(req: Request, res: Response) {
    Contact.findById(req.params.id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  @Get()
  getAll(req: Request, res: Response) {
    Contact.get((err, contacts) => {
      if (err) {
        res.send(err);
      }
      res.json(contacts);
    });
  }

  @Post()
  create(req: Request, res: Response): void {
    const contact = new Contact(req.body);

    contact.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  @Put(':id')
  private update(req: Request, res: Response): void {
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

  @Delete(':id')
  private delete(req: Request, res: Response): void {
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
