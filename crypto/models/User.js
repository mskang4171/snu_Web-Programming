const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  key: String,
});

const Key = mongoose.model("Key", {
  key: String,
  user: { ref: "User", type: Schema.Types.ObjectId },
});

module.exports = {
  User,
};

// signup
// signin
