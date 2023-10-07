import React, { useState } from "react";

function Todo({ task = "default todo", id = "1", remove }) {
  const handleDelete = () => remove(id);
  // default todo view
  let jsx = (
    <div>
      <li>{task}</li>
      {/* <button onClick={toggleEdit}>Edit</button> */}
      <button onClick={handleDelete}>X</button>
    </div>
  );

  return jsx;
}

export default Todo;
