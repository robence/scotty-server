import { Document, Schema, Model, model } from 'mongoose';

import { IContact } from '../entities';

export interface IContactModel extends Document {}

const username = {
  type: String,
  unique: true,
  lowercase: true,
  required: [true, "can't be blank"],
  match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
};

const email = {
  type: String,
  unique: true,
  lowercase: true,
  required: [true, "can't be blank"],
  match: [/\S+@\S+\.\S+/, 'is invalid'],
};

const contactSchema = Schema({ username, email }, { timestamps: true });

contactSchema.statics.get = function(callback, limit): IContact {
  return Contact.find(callback).limit(limit);
};

const Contact: Model<IContactModel> = model<IContactModel>(
  'Contact',
  contactSchema,
);

export default Contact;

// selectPopulatedPaths: true

// contactSchema.path('name').validate(function(value) {
//   return v != null;
// });

// contactSchema.methods.fullName = function(): string {
//   return this.firstName.trim() + ' ' + this.lastName.trim();
// };
