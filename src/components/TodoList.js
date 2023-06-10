import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, editTodo }) => {
  return (
    <div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
