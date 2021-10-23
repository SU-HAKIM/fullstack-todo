import React, { Component } from "react";

import { FormPropsType } from "../types/types";

class Form extends Component<FormPropsType> {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} className="d-flex mb-4">
        <input
          type="text"
          name="todo"
          placeholder="enter todo text"
          onChange={this.props.handleChange}
          value={this.props.todo}
          className="form-control"
        />
        <input type="submit" value="add" className="btn btn-primary" />
      </form>
    );
  }
}

export default Form;
