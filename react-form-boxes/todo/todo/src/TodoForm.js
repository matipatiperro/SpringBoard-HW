import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function NewTodoForm({ createTodo }) {
  const [task, setTask] = useState("");

  const handleChange = (evt) => {
    setTask(evt.target.value);
    // console.log(task);
  };

  const gatherInput = (evt) => {
    evt.preventDefault();
    createTodo({ task, id: uuid() });

    setTask("");
  };
  console.log(task);
  return (
    <div>
      <form onSubmit={gatherInput}>
        <label htmlFor="task">Task:</label>
        <input onChange={handleChange} name="task" type="text" value={task} />
        <button>Add a todo!</button>
      </form>
    </div>
  );
}

export default NewTodoForm;
