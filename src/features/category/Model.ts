import { Document, Schema, Model, model } from 'mongoose';

export interface CategoryType {
  name: string;
}

export type CategoryModelType = Document & CategoryType;

const CategorySchema = new Schema({
  name: {
    type: String,
  },
});

const CategoryModel: Model<CategoryModelType> = model<CategoryModelType>(
  'Category',
  CategorySchema,
);

export default CategoryModel;
