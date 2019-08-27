/* eslint-disable */
// @ts-ignore
const mongoose = require('mongoose');
// import { Document, Schema, Model, model } from 'mongoose';
// import * as uniqueValidator from 'mongoose-unique-validator';

// export type CategoryType = {
//   name: string;
// };
// export type CategoryModelType = Document & CategoryType;

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true },
);

// CategorySchema.plugin(uniqueValidator);

// const CategoryModel: Model<CategoryModelType> = model<CategoryModelType>('Category', CategorySchema);

// export default CategoryModel;

mongoose.model('Category', CategorySchema);
