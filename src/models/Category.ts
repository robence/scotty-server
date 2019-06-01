import { Document, Schema, Model, model } from 'mongoose';

import { ICategory } from '../entities';

export interface ICategoryModel extends Document {}

const name = {
  type: String,
  required: [true, "can't be blank"],
  match: [/^[a-zA-Z& ]+$/, 'is invalid, only letters a-Z can be used'],
};

const SubCategorySchema = Schema({ name }, { timestamps: true });
export const CategorySchema = Schema(
  {
    name,
    subCategories: {
      type: [{ name }],
      default: [],
    },
  },
  { timestamps: true },
);

CategorySchema.statics.get = function(callback, limit): ICategory {
  return Category.find(callback).limit(limit);
};

const Category: Model<ICategoryModel> = model<ICategoryModel>(
  'Category',
  CategorySchema,
);

export default Category;
