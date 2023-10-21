import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/snack1">First snack: mars bar</Link>
        </li>
        <li>
          <Link to="/snack2">Second snack: tik tak bar</Link>
        </li>
        <li>
          <Link to="/snack3">Third snack: milky way bar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
