import React, { useState } from "react";
import "./Eightball.css";
import answers from "./answers.json";
import { choice } from "./random";

function Eightball() {
  const [style, setStyle] = useState({
    theClass: "ballQ",
    text: "Think of a question",
  });
  // console.log("outside");
  // console.log(style);

  // let text = "Think of a question";

  return (
    <div
      className={style.theClass}
      onClick={() => {
        console.log("clicked");
        if (style.theClass === "ballQ") {
          let tmp = choice(answers);
          setStyle({ theClass: "ballR", text: tmp.msg });
          // console.log(style);
        } else {
          setStyle({ theClass: "ballQ", text: "Think of a question" });
        }
        // console.log("********");
        // console.log(style);
      }}
    >
      {style.text}
    </div>
  );
}

export default Eightball;
