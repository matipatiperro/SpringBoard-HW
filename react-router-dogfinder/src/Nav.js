import { NavLink } from "react-router-dom";
import Dogs from "./Dogs";

function Nav({ dogs }) {
  console.log(dogs);
  const links = dogs.map((dog) => (
    <NavLink to={`/dogs/${dog.name}`}>
      <br></br>
      {dog.name}
      {/* <Dogs dog={dogs} /> */}
    </NavLink>
  ));

  return (
    <nav>
      <NavLink to="/dogs" end>
        Home
      </NavLink>
      {links}
    </nav>
  );
}

export default Nav;
