import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  // holds the deck object from the api
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const [cardCount, setCardCount] = useState(52);
  const [isShuffling, setIsShuffling] = useState(false);
  // get deck and id, store in useEffect for persistence
  useEffect(function loadDeckFromAPI() {
    async function fetchData() {
      // default is one deck. Attributes of deck_id, remaining
      const d = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      //   console.log(d);
      console.log(d.data);
      setDeck(d.data);
    }
    fetchData();
  }, []);

  /** Draw card: change the state & effect will kick in. */
  async function draw() {
    try {
      const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (drawRes.data.remaining === 0)
        throw new Error("Error: no cards remaining!");
      console.log(drawRes.data.cards[0]);
      setCard(drawRes.data.cards[0].code);
      //   console.log("the card is: ", card);
      setCardCount(drawRes.data.remaining);
      console.log("cdrawRes: ", drawRes);
      console.log("cardcount is: ", cardCount);
      console.log("remaining is: ", drawRes.data.remaining);
    } catch (err) {
      alert(err);
    }
    return card;
  }

  /** Shuffle: change the state & effect will kick in. */
  async function startShuffling() {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setCardCount(52);
      setCard(null);
    } catch (err) {
      alert(err);
    } finally {
      setIsShuffling(false);
    }
  }

  function renderShuffleBtnIfOk() {
    if (!deck) return null;
    return (
      <button
        className="Deck-gimme"
        onClick={startShuffling}
        disabled={isShuffling}
      >
        SHUFFLE DECK
      </button>
    );
  }

  return (
    <div>
      <h2>Card is: {card} </h2>
      <h2> Cards remaining: {cardCount}</h2>
      <button onClick={draw}>DRAW</button>
      <div> {renderShuffleBtnIfOk()}</div>
    </div>
  );
}

export default Deck;
