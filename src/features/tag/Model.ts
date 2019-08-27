/* eslint-disable */
// @ts-ignore
const mongoose = require('mongoose');
// import { Document, Schema, Model, model } from 'mongoose';
// import * as uniqueValidator from 'mongoose-unique-validator';

// export type TagType = {
//   name: string;
// };
// export type TagModelType = Document & TagType;

const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true },
);

// TagSchema.plugin(uniqueValidator);

// const TagModel: Model<TagModelType> = model<TagModelType>('Tag', TagSchema);

// export default TagModel;

mongoose.model('Tag', TagSchema);
