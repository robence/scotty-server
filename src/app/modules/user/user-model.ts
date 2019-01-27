import * as mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

userSchema.statics.get = function(callback, limit) {
  User.find(callback).limit(limit);
};

const User = mongoose.model("user", userSchema);

export default User;
