/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    console.log(this.words);
    let mchain = {};
    for (let i in this.words) {
      // check if obj has value for key, if not, create empty value for key
      if (mchain[this.words[i]] === undefined) {
        mchain[this.words[i]] = [];
      }
      // add next word to the current key, but skip last word
      if (Number(i) == this.words.length - 1) break;
      mchain[this.words[i]].push(this.words[Number(i) + 1]);
    }
    this.mchain = mchain;
    console.log(mchain);
  }

  static chooseWord(arr) {
    // console.log("arr is ");
    // console.log(arr);
    return arr[Math.floor(Math.random() * arr.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    //     To emit realistic-but-random text, we could pick a starting word randomly (say, “in”). Then we would:
    // 1. find all words that can come after that word
    // 2. pick one of those next-words randomly
    // 3. if we picked ***null*** , we’ve reached the end of the chain, so stop
    // 4. otherwise, restart at step 1

    let currentWord = MarkovMachine.chooseWord(this.words);

    let answerText = [];

    while (numWords > 0 && this.mchain[currentWord].length !== 0) {
      if (this.mchain[currentWord].length !== 0) {
        answerText.push(currentWord);
        currentWord = MarkovMachine.chooseWord(this.mchain[currentWord]);
      }
      if (this.mchain[currentWord].legnth === 0) return answerText.join(" ");
      numWords--;
    }
    // console.log(answerText);
    return answerText.join(" ");
  }
}

let mm = new MarkovMachine("the cat in the hat");
console.log(mm.makeText(10));

module.exports = {
  MarkovMachine,
};
