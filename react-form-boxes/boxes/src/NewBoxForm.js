import React, { useState } from "react";
// import { v4 as uuid } from "uuid";

function NewBoxForm({ createBox }) {
  const [formData, setFormData] = useState({
    height: "",
    width: "",
    backgroundColor: "",
  });

  //   console.log(createBox);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log("name is: ", name);
    console.log("value is: ", value);
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const gatherInput = (evt) => {
    evt.preventDefault();
    // createBox({ ...formData, id: uuid() });
    // console.log("gatherinput data is: ", formData);
    createBox({ ...formData });
    setFormData({ height: "", width: "", backgroundColor: "" });
  };
  // console.log(formData);
  return (
    <div>
      <form onSubmit={gatherInput}>
        <div>
          <label htmlFor="height">Height</label>
          <input
            onChange={handleChange}
            type="text"
            name="height"
            value={formData.height}
            id="height"
          />
        </div>
        <div>
          <label htmlFor="width">Width</label>
          <input
            onChange={handleChange}
            type="text"
            name="width"
            id="width"
            value={formData.width}
          />
        </div>
        <button id="newBoxButton">Add a new box!</button>
      </form>
    </div>
  );
}

export default NewBoxForm;
