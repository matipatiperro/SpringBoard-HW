/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      // null condition
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      // no head condition
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    // no node case
    // if (this.length === 0) return null; // requirements say through error
    if (this.length === 0) {
      throw new Error("empty linked list.");
    }

    let returnNode = this.tail;
    this.tail = null;

    // one node case: where tail and head are same
    if (this.length === 1) {
      this.head = null;
      return returnNode;
    }

    // general case, find new tail
    let currentNode = this.head;
    while (currentNode.next !== null) {
      // console.log(currentNode.val);
      let tempNode = currentNode;

      currentNode = currentNode.next;
      // console.log("current1:", currentNode.val);

      if (currentNode.next === null) {
        // we hit the the tail node that was cleared as LL.tail, now clear it from the linked list connection
        currentNode = tempNode;
        break; // need this break or != null condition never satisfied
      }
    }
    this.tail = currentNode;
    this.tail.next = null;
    this.length--;
    return returnNode;
  }

  /** shift(): return & remove first item. */

  shift() {
    // no node case
    if (this.length === 0) {
      throw new Error("empty linked list.");
    }
    let tempNode = this.head;

    if (this.length == 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return tempNode;
    }

    // regular case
    this.head = this.head.next;
    this.length--;
    return tempNode;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let indexNode = this.getNodeAt(idx);
    return indexNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let indexNode = this.getNodeAt(idx);
    indexNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let newNode = new Node(val);

    if (idx === 1) {
      newNode.next = this.head;
      this.head = newNode;

      this.length++;
      return;
    }
    let indexNode = this.getNodeAt(idx - 1);
    // end case
    if (indexNode.next === null) {
      this.tail.next = newNode; // set the next value of the old tail
      this.tail = newNode; // replace old tail with new node
    } else {
      let remainingNode = indexNode.next;
      indexNode.next = newNode;
      newNode.next = remainingNode;
    }
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length < idx || idx < 1) {
      throw new Error("invalid index value");
    }
    if (this.length === idx) {
      this.pop();
      console.log("popped");
    } else {
      console.log("no");
      if (idx === 1) {
        let nextNode = this.getNodeAt(2);
        this.head = nextNode;
      } else {
        let previousNode = this.getNodeAt(idx - 1);
        let nextNode = this.getNodeAt(idx + 1);
        previousNode.next = nextNode;
      }
      this.length--;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }

  // get node at specified index
  getNodeAt(idx) {
    if (this.length < idx || idx < 1) {
      throw new Error("invalid index value");
    }
    let indexNode = this.head;
    if (idx === 1) return indexNode;

    for (let i = 1; i < idx; i++) {
      indexNode = indexNode.next;
    }
    return indexNode;
  }
}

let ll = new LinkedList([1, 2, 3]);
// console.log(ll.shift());
// console.log(ll.head);
// console.log(ll.tail);
// ll.setAt(3, 4);

console.log(ll);
ll.insertAt(1, 9);
console.log("value is", ll.getAt(1));
console.log("length is", ll.length);
ll.removeAt(4);
console.log("value is", ll.getAt(3));
console.log(ll);

// console.log("value is", ll.getAt(4));
// console.log(ll);

module.exports = LinkedList;
