import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Snack1 from "./Snack1";
import Snack2 from "./Snack2";
import Snack3 from "./Snack3";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Snack Bar</h1>
        <NavBar />
        <Routes>
          <Route path="/snack1" element={<Snack1 />} />
          <Route path="/snack2" element={<Snack2 />} />
          <Route path="/snack3" element={<Snack3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
