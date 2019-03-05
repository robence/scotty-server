import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { ICategory } from '../entities';

export interface ICategoryModel extends Document {}

const name = {
  type: String,
  unique: true,
  lowercase: true,
  required: [true, "can't be blank"],
  match: [/^[a-zA-Z& ]+$/, 'is invalid, only letters a-Z can be used'],
};

const SubCategorySchema = Schema({ name }, { timestamps: true });
export const CategorySchema = Schema(
  {
    name,
    subCategories: [{ type: SubCategorySchema, default: [] }],
  },
  { timestamps: true },
);

CategorySchema.plugin(uniqueValidator);

CategorySchema.statics.get = function(callback, limit): ICategory {
  return Category.find(callback).limit(limit);
};

const Category: Model<ICategoryModel> = model<ICategoryModel>(
  'Category',
  CategorySchema,
);

export default Category;
