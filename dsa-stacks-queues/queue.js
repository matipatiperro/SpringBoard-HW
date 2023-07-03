/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */
// FIFO first in first out

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */
  // the end of the queue is the last item added

  enqueue(val) {
    let newNode = new Node(val);

    if (this.first === null) {
      this.first = newNode;
      this.last = newNode;
    } else if (this.first === this.last) {
      this.first.next = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.first === null) throw new Error("Queue already empty");
    else {
      let returnVal = this.first.val;
      if (this.first === this.last) {
        this.first = null;
        this.size--;
        return returnVal;
      }
      this.first = this.first.next;
      this.size--;
      return returnVal;
    }
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.first) {
      return this.first.val;
    }
    return null;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if (this.first) return false;
    else return true;
  }
}

module.exports = Queue;

let fNode = new Node(1);
let sNode = new Node(2);
let fQueue = new Queue();
fQueue.enqueue(fNode);
fQueue.enqueue(sNode);
console.log(fQueue);
