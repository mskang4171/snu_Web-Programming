const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = mongoose.model("Task", {
  title: String,
  description: String,
  dueDate: Date,
  user: { ref: "User", type: Schema.Types.ObjectId },
});

module.exports = {
  Task,
};

// signup
// signin
