export type Todo = {
  text: "";
  todos: { _id: string; text: string }[];
  fetchData: number;
  isOpen: false;
  editingText: string;
  editingId: string;
};

export interface PropsType {
  todos: { _id: string; text: string }[];
  handleDelete: (id: string) => void;
  handleEdit(id: string, editing: boolean, text: string): void;
}

export type FormPropsType = {
  handleSubmit(e: React.SyntheticEvent): void;
  handleChange(e: React.ChangeEvent): void;
  todo: string;
};

export type TodoType = {
  _id: string;
  createAt?: string;
  text: string;
};
