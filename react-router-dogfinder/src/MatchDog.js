import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Dogs from "./Dogs";

/**
 * MatchDog finds a dog by name or renders null
 *
 * state: none
 *
 * props:
 * dogs: [{name, src}]
 *
 *
 * Rendered at /dogs/:name
 *
 */

function MatchDog({ dogs }) {
  const { name } = useParams();
  console.log(name);
  console.log("----------");

  if (name) {
    const dogMatch = dogs.find(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    console.log(dogMatch);
    return <Dogs dog={dogMatch} />;
  }
  console.log("should be null");
  return null;
}
export default MatchDog;
