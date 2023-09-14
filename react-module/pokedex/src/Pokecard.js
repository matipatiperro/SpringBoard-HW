// Pokecard : Shows a single Pokemon, with their name, image, and type.
import React from "react";
import "./Pokecard.css";

let url =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

function PokeCard(props) {
  let imgLoc = `${url}${props.id}.png`;
  return (
    <div className="Pokecard">
      <div className="Pokename">{props.name}</div>
      <img className="Pokeimage" src={imgLoc}></img>
      <div className="Poketext">Type: {props.type}</div>
      <div className="Poketext">EXP: {props.exp}</div>
    </div>
  );
}

export default PokeCard;
