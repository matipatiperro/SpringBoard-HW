class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  // if empty have val be the root
  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    let currentNode = this.root;
    // else find the right spot to put new node
    while (true) {
      if (currentNode.val === val) {
        return this;
      } else if (currentNode.val < val) {
        if (currentNode.right === null) {
          currentNode.right = new Node(val);
          return this;
        }
        currentNode = currentNode.right;
      } else if (currentNode.val > val) {
        if (currentNode.left === null) {
          currentNode.left = new Node(val);
          return this;
        }
        currentNode = currentNode.left;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    if (currentNode.val === val) {
      return this;
    } else if (currentNode.val < val) {
      if (currentNode.right === null) {
        currentNode.right = new Node(val);
        return this;
      }
      this.insertRecursively(val, currentNode.right);
      // currentNode = currentNode.right;
    } else if (currentNode.val > val) {
      if (currentNode.left === null) {
        currentNode.left = new Node(val);
        return this;
      }
      this.insertRecursively(val, currentNode.left);
      // currentNode = currentNode.left;
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root === null) {
      return undefined;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.val === val) return currentNode;
      if (currentNode.val < val) {
        if (currentNode.right === null) {
          return undefined;
        }
        currentNode = currentNode.right;
      } else if (currentNode.val > val) {
        if (currentNode.left === null) {
          return undefined;
        }
        currentNode = currentNode.left;
      }
    }
    return currentNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    if (this.root === null) {
      return undefined;
    }
    // console.log(currentNode.val)
    if (currentNode.val < val) {
      if (currentNode.right === null) {
        return undefined;
      }
      return this.find(val, currentNode.right);
      // currentNode = currentNode.right;
    } else if (currentNode.val > val) {
      if (currentNode.left === null) {
        return undefined;
      }
      return this.find(val, currentNode.left);
      // currentNode = currentNode.left;
    }
    return currentNode;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited = [];
    let currentNode = this.root;
    function traverse(currentNode) {
      if (currentNode === null) return visited;
      visited.push(currentNode.val);
      traverse(currentNode.left);
      traverse(currentNode.right);
    }
    traverse(currentNode);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];
    let currentNode = this.root;

    function traverse(currentNode) {
      currentNode.left && traverse(currentNode.left); // go left if there's a left
      visited.push(currentNode.val); // visit
      currentNode.right && traverse(currentNode.right); // go right if there's a right
    }

    traverse(currentNode);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // go left if there's a left
      node.right && traverse(node.right); // go right if there's a right
      data.push(node.val); // visit
    }

    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {}

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {}

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;
