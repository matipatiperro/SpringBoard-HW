import React from "react";
import { Navigate } from "react-router-dom";

function Dogs({ dog }) {
  //   console.log("********");
  //   console.log(dog);
  if (!dog) return <Navigate to="/dogs" />;
  return (
    <div>
      <h3>Dog name is: {dog.name}</h3>
      <h4>Dog age is: {dog.age}</h4>
      <ul>
        Dog facts are:
        {dog.facts.map((fact) => (
          <li>{fact}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dogs;
