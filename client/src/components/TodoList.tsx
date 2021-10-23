import React, { Component } from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

import { PropsType } from "../types/types";
import { Todo } from "../types/types";

class TodoList extends Component<PropsType> {
  render() {
    return (
      <>
        <ul style={{ listStyleType: "square" }} className="list-group">
          {this.props.todos.map((todo, index) => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-around"
            >
              {todo.text}
              <div>
                <span onClick={() => this.props.handleDelete(todo._id)}>
                  <AiOutlineDelete
                    size="20"
                    color="red"
                    style={{ cursor: "pointer" }}
                  />{" "}
                </span>
                <span
                  onClick={() => {
                    this.props.handleEdit(todo._id, true, todo.text);
                  }}
                >
                  <AiFillEdit
                    size="20"
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default TodoList;
