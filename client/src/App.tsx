import React, { Component } from "react";
import Form from "./components/form";
import TodoList from "./components/TodoList";
import axios from "axios";
import { motion } from "framer-motion";

import { Todo, TodoType } from "./types/types";

const modalVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "40vw",
    opacity: 1,
    zIndex: 10,
    background: "#fff",
  },
};

class App extends Component {
  state: Todo = {
    text: "",
    todos: [],
    fetchData: 0,
    isOpen: false,
    editingText: "",
    editingId: "",
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post("/todo", { todo: this.state.text })
      .then((response) => {
        console.log(response.data, "submit");
        this.setState((prev) => {
          return {
            ...prev,
            todos: [...this.state.todos, response.data],
            text: "",
          };
        });
      })
      .catch((err) => console.log(err));
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prev) => {
      return { ...prev, text: e.target.value };
    });
  };
  componentDidMount() {
    axios.get("/todo").then((response) => {
      console.log(response);
      this.setState((prev) => {
        return { ...prev, todos: response.data };
      });
    });
  }

  handleDelete = (id: string) => {
    axios
      .delete(`/todo/${id}`)
      .then(() => {
        this.setState((prev) => {
          const newArr = this.state.todos.filter((todo) => todo._id !== id);
          return { ...prev, todos: newArr };
        });
      })
      .catch((err) => console.log(err));
  };
  handleEdit = (id: string, editing: boolean, text: string) => {
    if (editing) {
      this.setState((prev: Todo) => {
        return { ...prev, isOpen: true, editingText: text, editingId: id };
      });
    }
  };
  closeModal = (e: React.MouseEvent) => {
    this.setState((prev: Todo) => {
      return { ...prev, isOpen: false };
    });
  };
  handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prev: Todo) => {
      return { ...prev, editingText: e.target.value };
    });
  };
  handleEditPost = (e: React.MouseEvent) => {
    axios
      .patch(`/todo/${this.state.editingId}`, {
        todo: this.state.editingText,
      })
      .then((response) => {
        let todo = this.state.todos.filter(
          (todo: TodoType) => todo._id === this.state.editingId
        );
        let index = this.state.todos.indexOf(todo[0]);
        this.setState((prev: Todo) => {
          let newArr: TodoType[] = [...this.state.todos];
          newArr.splice(index, 1, response.data as TodoType);
          return { ...prev, todos: newArr };
        });
        this.setState((prev) => {
          return { ...prev, isOpen: false, editingText: "" };
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    console.log(this.state);
    return (
      <>
        <motion.div
          className="card card-body w-50 mx-auto"
          variants={modalVariants}
          initial="hidden"
          animate={this.state.isOpen ? "visible" : ""}
        >
          <div
            onClick={this.closeModal}
            style={{ margin: "10px", fontWeight: 600, cursor: "pointer" }}
          >
            X
          </div>
          <input
            type="text"
            name="text"
            className="form-control mb-4"
            value={this.state.editingText}
            onChange={this.handleEditChange}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleEditPost}
          >
            Edit
          </button>
        </motion.div>
        {/* modal */}
        <div className="card card-body w-50 mx-auto mt-5">
          <Form
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            todo={this.state.text}
          />
          <TodoList
            todos={this.state.todos}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
        </div>
      </>
    );
  }
}

export default App;
