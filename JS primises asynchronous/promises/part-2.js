// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=1

let baseURL = "https://deckofcardsapi.com/api/deck";

let firstQ = function first() {
  let deck = null;
  let firstCard = null;
  $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`)
    .then((data) => {
      deck = data.deck_id;
      return $.getJSON(`${baseURL}/${deck}/draw/`);
    })
    .then((data2) => {
      firstCard = data2.cards[0];
      console.log(`${firstCard.value} of ${firstCard.suit}`);
    });
};
// firstQ();

let secondQ = function second() {
  let deck = null;
  let deck_count = 1;
  let cardCount = 2;
  $.getJSON(`${baseURL}/new/shuffle/?deck_count=${deck_count}`)
    .then((data) => {
      deck = data.deck_id;
      //   console.log(deck);
      return $.getJSON(`${baseURL}/${deck}/draw/?count=${cardCount}`);
    })
    .then((data2) => {
      for (let i = 0; i < cardCount; i++) {
        console.log(`${data2.cards[i].value} of ${data2.cards[i].suit}`);
      }
    });
};
// secondQ();

//// part 3
let numDecks = 1;
let numCards = 52;
let deck = null;
$.getJSON(`${baseURL}/new/shuffle/?deck_count=${numDecks}`)
  .then((data) => {
    deck = data.deck_id;
    //   console.log(deck);
    return $.getJSON(`${baseURL}/${deck}/draw/?count=${numCards}`);
  })
  .then((data2) => {
    deck = data2;
    console.log(deck);
  });

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
    `${deck.cards[cardCount].value} of ${deck.cards[cardCount].suit}`
  );

  $("li").remove();
  for (let i = cardCount - 1; i >= 0; i--) {
    $("ul").append(`<li>${deck.cards[i].value} of ${deck.cards[i].suit}</li>`);
  }
  cardCount++;
});
