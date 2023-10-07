import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);

  // add a new todo
  const create = (newTodo) => {
    setTodos((todos) => [...todos, newTodo]);
  };

  // delete a todo by id
  const remove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const todoComponents = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      remove={remove}
      task={todo.task}
      //   update={update}
    />
  ));

  return (
    <div>
      <TodoForm createTodo={create} />
      <ul>
        {/* <TodoItem /> */}
        {todoComponents}
      </ul>
    </div>
  );
}

export default TodoList;
