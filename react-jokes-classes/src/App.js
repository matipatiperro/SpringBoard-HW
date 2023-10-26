import React, { Component } from "react";
import JokeList2 from "./JokeList";

/** App component. Renders list of jokes. */

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeList2 />
      </div>
    );
  }
}

export default App;
