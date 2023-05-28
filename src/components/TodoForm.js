import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  let [title, setTitle] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    //add todo
    let todo = {
      id: Math.floor(Math.random() * 1000),
      title,
      completed: false,
    };
    addTodo(todo);
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoFocus
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
};

export default TodoForm;
