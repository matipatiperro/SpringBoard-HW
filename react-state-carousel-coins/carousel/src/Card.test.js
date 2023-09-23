import { render, fireEvent } from "@testing-library/react";
import TEST_IMAGES from "./_testCommon.js";
import React from "react";
import Card from "./Card";

// smoke test
// it("App renders without crashing", function () {
//   render(<App />);
// });

it("carousel renders without crashing", function () {
  let currCardIdx = 1;
  let total = 2;
  render(
    <Card
      caption={TEST_IMAGES[1].caption}
      src={TEST_IMAGES[1].src}
      currNum={currCardIdx + 1}
      totalNum={total}
    />
  );
});
