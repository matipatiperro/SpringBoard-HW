// Timers Exercise
// countdown
// Write a function called countdown that accepts a number as a parameter and every 1000 milliseconds decrements the value and console.logs it. Once the value is 0 it should log “DONE!” and stop.
// countDown(4);
// 3
// 2
// 1
// "DONE!"
function countdown(num) {
  if (num === 1) {
    console.log("DONE!");
  } else if (num > 1) {
    num--;
    console.log(num);
    setTimeout(countdown.bind(null, num), 1000);
  }
}
countdown(4);
/// Help from TA - is there a way to do this without recursion or the bind method (which im not totally sure what it does besides allow one to be able to call a function where it should have been passed instead)

// Think i got it (after reading the random game directions)
function countDown(counter) {
  function printNum() {
    if (counter === 1) {
      console.log("DONE!");
      clearInterval(myInterval);
    } else if (counter > 0) {
      counter--;
      console.log(counter);
    }
  }

  let myInterval = setInterval(printNum, 1000);
}
countDown(5);
