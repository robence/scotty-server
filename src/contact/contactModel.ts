import * as mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: String,
  phone: String,
  create_date: {
    type: Date,
    default: Date.now
  }
});


contactSchema.statics.get = function (callback, limit) {
  Contact.find(callback).limit(limit);
};

const Contact = mongoose.model('contact', contactSchema);

export default Contact