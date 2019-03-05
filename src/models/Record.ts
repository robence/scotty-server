import { Document, Schema, Model, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { IRecord } from '../entities';

export interface IRecordModel extends Document {}

export const RecordSchema = Schema(
  {
    amount: {
      type: Number,
      required: [true, "can't be blank"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true },
);

RecordSchema.plugin(uniqueValidator);

RecordSchema.statics.get = function(callback, limit): IRecord {
  return Record.find(callback).limit(limit);
};

const Record: Model<IRecordModel> = model<IRecordModel>('Record', RecordSchema);

export default Record;
