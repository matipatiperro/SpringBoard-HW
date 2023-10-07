import React, { useState } from "react";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box";

// Place your state that contains all of the boxes here.
// This component should render all of the Box components along with the NewBoxForm component
function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const add = (boxObj) => {
    setBoxes((boxes) => [...boxes, boxObj]);
    console.log("boxes is: ", boxes);
    console.log("boxOBJ is: ", boxObj);
  };
  console.log("boxes2 is: ", boxes);
  console.log("boxes2 length: ", boxes.length);
  const boxComponents = boxes.map(
    (box) => (
      <Box
        // key={box.id}
        // id={box.id}

        width={box.width}
        height={box.height}
        backgroundColor={box.backgroundColor}
      />
    )
    // Box(box.width, box.height, box.backgroundColor)
  );
  //   console.log(boxComponents);
  // const boxComponents = Box(10);
  // <div style="height: 5em; width: 10em; background-color: blue;"></div>
  // <div style="width: 10em; background-color: blue;"></div>
  console.log("test", boxComponents);
  console.log("test2", boxes);

  return (
    <div>
      <NewBoxForm createBox={add} />
      {boxComponents}
    </div>
  );
  //   return (
  //     <div>
  //       <div
  //         style={{
  //           height: `5em`,
  //           width: `5em`,
  //           backgroundColor: "blue",
  //         }}
  //       />
  //     </div>
  //   );
}
export default BoxList;
