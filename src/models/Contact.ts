import { Document, Schema, Model, model } from 'mongoose';
// import { uniqueValidator } from 'mongoose-unique-validator';
// var uniqueValidator = require('mongoose-unique-validator');
import { IContact } from '../entities';

export interface IContactModel extends Document {}

export const ContactSchema = Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [
        /^[a-zA-Z0-9]+$/,
        'is invalid, only letters a-Z and digits 0-9 can be used',
      ],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid, use email@server.domain format'],
    },
  },
  { timestamps: true },
);

// ContactSchema.pre('save', function(next) {
//   var self = this;
//
//   Contact.findOne({ email: this.email }, 'email', function(err, results) {
//     if (err) {
//       next(err);
//     } else if (results) {
//       console.warn('results', results);
//       self.invalidate('email', 'email must be unique');
//
//       next('email must be unique');
//     } else {
//       next();
//     }
//   });
// });
// ContactSchema.plugin(uniqueValidator);

ContactSchema.statics.get = function(callback, limit): IContact {
  return Contact.find(callback).limit(limit);
};

const Contact: Model<IContactModel> = model<IContactModel>(
  'Contact',
  ContactSchema,
);

export default Contact;
