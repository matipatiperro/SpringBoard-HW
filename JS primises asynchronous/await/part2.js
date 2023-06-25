// ## **Part 2: Deck of Cards**

// 1. Make a request to the [Deck of Cards API](http://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, ***console.log*** the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.

//     Once you have both cards, ***console.log*** the values and suits of both cards.

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

//first
let baseURL = "https://deckofcardsapi.com/api/deck/";
// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

async function first() {
  let deck = await $.getJSON(`${baseURL}new/shuffle/?deck_count=1`);
  console.log(deck);
  let firstCard = await $.getJSON(`${baseURL}${deck.deck_id}/draw/?count=1`);
  console.log(firstCard.cards);
  console.log(`${firstCard.cards[0].value} of ${firstCard.cards[0].suit}`);
}
// first();

async function second() {
  let deck = await $.getJSON(`${baseURL}new/shuffle/?deck_count=1`);
  console.log(deck);
  let firstCard = await $.getJSON(`${baseURL}${deck.deck_id}/draw/?count=2`);
  console.log(`${firstCard.cards[0].value} of ${firstCard.cards[0].suit}`);
  console.log(`${firstCard.cards[1].value} of ${firstCard.cards[1].suit}`);
}
// second();

//// third
async function third() {
  let numDecks = 1;
  let numCards = 52;
  let deck = await $.getJSON(`${baseURL}/new/shuffle/?deck_count=${numDecks}`);
  let cards = await $.getJSON(
    `${baseURL}${deck.deck_id}/draw/?count=${numCards}`
  );

  let $btn = $("button");
  let cardCount = 0;
  $btn.on("click", function () {
    //   console.log("click!");
    if (cardCount == 52) {
      cardCount = 0;
      console.log("End reached, starting from the top");
    }
    //   console.log(cardCount);
    $("h2").text("");
    $("h2").append(
      `${cards.cards[cardCount].value} of ${cards.cards[cardCount].suit}`
    );

    $("li").remove();
    for (let i = cardCount - 1; i >= 0; i--) {
      $("ul").append(
        `<li>${cards.cards[i].value} of ${cards.cards[i].suit}</li>`
      );
    }
    cardCount++;
  });
}
third();
