// **Pokedex : I**s provided, via props, an array of objects describing different pokemon,
// and renders a sequence of ***Pokecard*** components.

// Use the defaultProps feature of ***Pokedex*** to provide a default list of Pokemon characters to show.
import React from "react";
import PokeCard from "./Pokecard";
import "./Pokedex.css";

function Pokedex(props) {
  //   console.log("*****HERE*****");
  //   console.log(props);
  return (
    <div className="Pokedex">
      <h2 className="Pokedex-title">Pokedex</h2>
      <div className="cards"></div>
      {/* have an array of pokemon, map them to cards */}
      {props.pokemon.map((p) => (
        <PokeCard
          id={p.id}
          name={p.name}
          type={p.type}
          exp={p.base_experience}
        />
      ))}
    </div>
  );
}
Pokedex.defaultProps = {
  pokemon: [
    { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
    { id: 7, name: "Squirtle", type: "water", base_experience: 63 },
    { id: 11, name: "Metapod", type: "bug", base_experience: 72 },
    { id: 12, name: "Butterfree", type: "flying", base_experience: 178 },
  ],
};

export default Pokedex;
