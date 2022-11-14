const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likes: { type: Array, default: [] },
    dislikes: { type: Array, default: [] },
    showList: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
