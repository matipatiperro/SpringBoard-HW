import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import MatchDog from "./MatchDog";
import Nav from "./Nav";

// app that routes to different dogs and displays information on that dog when you’re at that route.

// The routes look like this:

// - */dogs* is the homepage and shows all three dogs
// - Clicking on a dog from the homepage takes you to that dog’s route.
// For example, clicking on Whiskey will take you to */dogs/whiskey*.
// - every other endpoint not listed should redirect you to */dogs.*

function App(props) {
  return (
    <div>
      <h1>Dogs Page! Select a link below:</h1>

      <BrowserRouter>
        <Nav dogs={props.dogs} />
        {/* <Routes exact path="/dogs/:name"> */}
        <Routes>
          {/* <Route path="/dogs" element={<Dogs dog={props.dogs} />} /> */}
          {/* <Route path="/dogs/:name" element={<Dogs dog={props.dogs[0]} />} /> */}
          <Route path="/dogs/:name" element={<MatchDog dogs={props.dogs} />} />
          <Route path="/*" element={<Navigate replace to="/dogs" />} />
        </Routes>

        {/* <NavBar dogs={dogs.data} /> */}
        {/* <div className="container">
          <RouteList dogs={dogs.data} />
        </div> */}
      </BrowserRouter>
    </div>
  );
}

//  <App /> component preloaded with the following defaultProps for convenience:
App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      // src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!",
      ],
    },
    {
      name: "Duke",
      age: 3,
      // src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs.",
      ],
    },
    {
      name: "Perry",
      age: 4,
      // src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain.",
      ],
    },
    {
      name: "Tubby",
      age: 4,
      // src: tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore.",
      ],
    },
  ],
};

export default App;
