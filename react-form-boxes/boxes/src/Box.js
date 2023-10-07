import React from "react";

// this component should display a div with a background color,
// width and height based on the props passed to it.

function Box(width1 = 5, height1 = 5, backgroundColor = "green") {
  //   console.log("IN THE BOX");
  console.log("width1 is:!!!!! ", width1.width);
  console.log("width1 is:!!!!! ", `${width1.width}em`);
  return (
    <div>
      <div
        style={{
          height: `${height1.height}em`,
          width: `${width1.width}em`,
          backgroundColor: backgroundColor,
        }}
      />
      {/* need button to delete box */}
    </div>
  );
}

export default Box;
