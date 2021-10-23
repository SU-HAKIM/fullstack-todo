import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: String,
    default:
      new Date().toLocaleTimeString() + "|" + new Date().toLocaleDateString(),
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
