import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import { ContactModel, ContactService } from '.';

@Controller('api/contacts')
class ContactController {
  @Get(':id')
  private async get(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.findById(req.params.id);
    // res.status(status).send(payload);

    console.log('CONTROLLER');
    console.log(payload);
    res.status(status).send(payload);
  }

  @Get()
  private async getAll(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.findAll();
    res.status(status).send(payload);
  }

  @Post()
  private create(req: Request, res: Response): void {
    const { body } = req;
    const contact = new ContactModel(body);

    contact
      .save()
      .then((user): void => {
        if (!user) {
          res.status(404).send();
        }
        res.send(user);
      })
      .catch((e): void => {
        res.status(400).send(e);
      });
  }

  @Put(':id')
  private update(req: Request, res: Response): void {
    const {
      params: { id },
      body,
    } = req;

    ContactModel.findByIdAndUpdate(id, body, { new: true })
      .then((contact): void => {
        if (!contact) {
          res.status(404).send();
        }
        res.send(contact);
      })
      .catch((e): void => {
        res.status(400).send(e);
      });
  }

  @Delete(':id')
  private delete(req: Request, res: Response): void {
    const { id } = req.params;
    ContactModel.findByIdAndDelete(id)
      .then((contact): void => {
        if (!contact) {
          res.status(404).send();
        }
        res.json(contact);
      })
      .catch((e): void => {
        res.status(400).send(e);
      });
  }
}

const instance = new ContactController();
export default instance;
