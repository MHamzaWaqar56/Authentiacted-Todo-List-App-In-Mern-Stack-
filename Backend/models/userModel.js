const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: {},
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
