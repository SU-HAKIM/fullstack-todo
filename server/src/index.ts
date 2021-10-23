import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./models/todo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/todo", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const newTodo = new Todo({ text: req.body.todo });
    const result = await newTodo.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.patch("/todo/:id", async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: { text: req.body.todo },
      },
      { new: true }
    );
    const result = await todo.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.delete("/todo/:id", async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "data deleted" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

mongoose
  .connect("mongodb://localhost:27017/backend-engine")
  .then(() => {
    app.listen(5000, () => {
      console.log("connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
