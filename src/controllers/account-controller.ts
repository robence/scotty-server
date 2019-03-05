import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import { Model, model } from 'mongoose';
import { IAccountModel, AccountSchema } from '../models/Account';

const Account: Model<IAccountModel> = model<IAccountModel>(
  'Account',
  AccountSchema,
);

@Controller('api/accounts')
class AccountController {
  @Get(':id')
  get(req: Request, res: Response) {
    Account.findById(req.params.id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  @Get()
  getAll(req: Request, res: Response) {
    Account.get((err, accounts) => {
      if (err) {
        res.send(err);
      }
      res.json(accounts);
    });
  }

  @Post()
  create(req: Request, res: Response): void {
    const contact = new Account(req.body);

    contact.save((err) => {
      if (err) {
        return res.send(err);
      }
      res.json(contact);
    });
  }

  @Put(':id')
  private update(req: Request, res: Response): void {
    Account.findOneAndUpdate(
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
    Account.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json(req.params.id);
    });
  }
}

const instance = new AccountController();
export default instance;
