import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedBtn from "./components/ClearCompletedBtn";
import { useCallback, useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilteredTodos(todos);
      });
  });

  //todo filter
  let filteredBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFilteredTodos(todos);
      }
      if (filter === "Active") {
        setFilteredTodos(todos.filter((todo) => !todo.completed));
      }
      if (filter === "Completed") {
        setFilteredTodos(todos.filter((todo) => todo.completed));
      }
    },
    [todos]
  );

  let addTodo = (todo) => {
    // update data at server side
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // update data at client side
    setTodos((prevState) => [...prevState, todo]);
  };

  let deleteTodo = (id) => {
    // server side
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    //client side
    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  };

  let editTodo = (todo) => {
    //server side
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    //client side
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return todo; //[editTodo, todo , todo]
        }
        return t;
      });
    });
  };
  // item remaining
  let remainingCount = todos.filter((todo) => !todo.completed).length;

  let checkAll = () => {
    //server
    todos.forEach((todo) => {
      todo.completed = true;
      editTodo(todo);
    });
    //client
    setTodos((prevState) => {
      return prevState.map((t) => {
        return { ...t, completed: true };
      });
    });
  };

  // clear completed
  let cleanCompleted = () => {
    //server
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
    //client
    setTodos((prevState) => {
      return prevState.filter((t) => !t.completed);
    });
  };
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App with react</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
        <CheckAllAndRemaining
          remainingCount={remainingCount}
          checkAll={checkAll}
        />
        <div className="other-buttons-container">
          <TodoFilters filteredBy={filteredBy} />
          <ClearCompletedBtn cleanCompleted={cleanCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
