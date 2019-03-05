import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import { Model, model } from 'mongoose';
import { IRecordModel, RecordSchema } from '../models/Record';

const Record: Model<IRecordModel> = model<IRecordModel>('Record', RecordSchema);

@Controller('api/records')
class RecordController {
  @Get(':id')
  get(req: Request, res: Response) {
    Record.findById(req.params.id, (err, record) => {
      if (err) {
        res.send(err);
      }
      res.json(record);
    });
  }

  @Get()
  getAll(req: Request, res: Response) {
    Record.get((err, records) => {
      if (err) {
        res.send(err);
      }
      res.json(records);
    });
  }

  @Post()
  create(req: Request, res: Response): void {
    const record = new Record(req.body);

    record.save((err) => {
      if (err) {
        return res.send(err);
      }
      res.json(record);
    });
  }

  @Put(':id')
  private update(req: Request, res: Response): void {
    Record.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, record) => {
        if (err) {
          res.send(err);
        }
        record.save((err) => {
          if (err) {
            res.json(err);
          }
          res.json(record);
        });
      },
    );
  }

  @Delete(':id')
  private delete(req: Request, res: Response): void {
    Record.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json(req.params.id);
    });
  }
}

const instance = new RecordController();
export default instance;
