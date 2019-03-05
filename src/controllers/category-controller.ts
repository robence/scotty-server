import { Request, Response } from 'express';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';

import { Model, model } from 'mongoose';
import { ICategoryModel, CategorySchema } from '../models/Category';

const Category: Model<ICategoryModel> = model<ICategoryModel>(
  'Category',
  CategorySchema,
);

@Controller('api/categories')
class CategoryController {
  @Get(':id')
  get(req: Request, res: Response) {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.json(category);
    });
  }

  @Get()
  getAll(req: Request, res: Response) {
    Category.get((err, categories) => {
      if (err) {
        res.send(err);
      }
      res.json(categories);
    });
  }

  @Post()
  create(req: Request, res: Response): void {
    const category = new Category(req.body);

    category.save((err) => {
      if (err) {
        return res.send(err);
      }
      res.json(category);
    });
  }

  @Put(':id')
  private update(req: Request, res: Response): void {
    Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, category) => {
        if (err) {
          res.send(err);
        }
        category.save((err) => {
          if (err) {
            res.json(err);
          }
          res.json(category);
        });
      },
    );
  }

  @Delete(':id')
  private delete(req: Request, res: Response): void {
    Category.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json(req.params.id);
    });
  }
}

const instance = new CategoryController();
export default instance;
