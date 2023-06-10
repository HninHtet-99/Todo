import React, { useState } from "react";

const Todo = ({ todo, deleteTodo, editTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  //edit
  let onEditeHandler = (e) => {
    e.preventDefault();
    let editedTodo = {
      id: todo.id,
      title,
      completed: todo.completed,
    };
    editTodo(editedTodo);
    setIsEdit(false);
  };
  //checkbox
  let checkBoxHandler = () => {
    let editedTodo = {
      id: todo.id,
      title,
      completed: !todo.completed,
    };
    editTodo(editedTodo);
    setIsEdit(false);
  };
  return (
    <div>
      <li className="todo-item-container">
        <div className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={checkBoxHandler}
          />
          {!isEdit && (
            <span
              className={`todo-item-label ${
                todo.completed ? "line-through" : ""
              }`}
              onDoubleClick={() => setIsEdit(true)}
            >
              {todo.title}
            </span>
          )}
          {isEdit && (
            <form action="" onSubmit={onEditeHandler}>
              <input
                autoFocus
                type="text"
                className="todo-item-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </form>
          )}
        </div>
        <button className="x-button" onClick={() => deleteTodo(todo.id)}>
          <svg
            className="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    </div>
  );
};

export default Todo;
