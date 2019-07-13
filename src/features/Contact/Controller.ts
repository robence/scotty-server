import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import ContactService from './Service';

@Controller('api/contacts')
class ContactController {
  @Post()
  private async create(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.createContact(req.body);
    res.status(status).send(payload);
  }

  @Get(':id')
  private async read(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.retrieveContact(
      req.params.id,
    );
    res.status(status).send(payload);
  }

  @Get()
  private async readAll(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.retrieveContacts();
    res.status(status).send(payload);
  }

  @Put(':id')
  private async update(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.updateContact(
      req.params.id,
      req.body,
    );
    res.status(status).send(payload);
  }

  @Delete(':id')
  private async delete(req: Request, res: Response): Promise<void> {
    const { status, payload } = await ContactService.deleteContact(
      req.params.id,
    );
    res.status(status).send(payload);
  }
}

const instance = new ContactController();
export default instance;
