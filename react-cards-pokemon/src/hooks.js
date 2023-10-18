import { useState } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid";

// const [isFacingUp, setIsFacingUp] = useState(true);
// const flipCard = () => {
//   setIsFacingUp(isUp => !isUp);
// };
function useFlip(initialState = true) {
  const [isFlipped, setFlipped] = useState(initialState);
  const flip = () => {
    setFlipped((isUp) => !isUp);
  };
  return [isFlipped, flip];
}

function useAxios(baseUrl) {
  const [cards, setCards] = useState([]);
  const addCard = async () => {
    const response = await axios.get(baseUrl);
    setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  };
  return [cards, addCard];
}
export { useFlip, useAxios };
