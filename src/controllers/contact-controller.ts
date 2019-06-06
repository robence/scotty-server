import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import Contact from '../models/Contact';

@Controller('api/contacts')
class ContactController {
  @Get(':id')
  private get(req: Request, res: Response): void {
    Contact.findById(
      req.params.id,
      (err, contact): void => {
        if (err) {
          res.send(err);
        }
        res.json(contact);
      },
    );
  }

  @Get()
  private getAll(req: Request, res: Response): void {
    const findAll = (err, contacts): void => {
      if (err) {
        res.send(err);
      }
      res.json(contacts);
    };

    Contact.find(findAll);
    // .limit(10);
  }

  @Post()
  private create(req: Request, res: Response): void {
    const contact = new Contact(req.body);

    contact.save(
      (err): void => {
        if (err) {
          res.send(err);
        }
        res.json(contact);
      },
    );
  }

  @Put(':id')
  private update(req: Request, res: Response): void {
    Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (errFind, contact): void => {
        if (errFind) {
          res.send(errFind);
        }
        contact.save(
          (errSave): void => {
            if (errSave) {
              res.json(errSave);
            }
            res.json(contact);
          },
        );
      },
    );
  }

  @Delete(':id')
  private delete(req: Request, res: Response): void {
    Contact.deleteOne(
      { _id: req.params.id },
      (err): void => {
        if (err) {
          res.send(err);
        }
        res.json(req.params.id);
      },
    );
  }
}

const instance = new ContactController();
export default instance;
