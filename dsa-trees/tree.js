/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree.
   * Given a n-ary tree of integers, return the sum of all the integers.
   */

  sumValues() {
    let total = 0;
    if (this.root === null) return 0;
    total = this.root.val;
    function traverseHelper(node) {
      for (let child of node.children) {
        total += child.val;
        if (child.children.length > 0) {
          traverseHelper(child);
        }
      }
    }
    traverseHelper(this.root);
    return total;
  }
  // let test = new TreeNode(12, [new TreeNode(8,[]), new TreeNode(5,[new TreeNode(6,[])])])
  // let treetest = new Tree(test)
  // console.log(treetest.sumValues())

  /** countEvens(): count all of the nodes in the tree with even values.
   *
   */

  countEvens() {
    let evenCount = 0;
    if (this.root === null) return 0;
    if (this.root.val % 2 === 0) evenCount++;
    function traverseHelper(node) {
      for (let child of node.children) {
        if (child.val % 2 === 0) evenCount++;
        if (child.children.length > 0) {
          traverseHelper(child);
        }
      }
    }
    traverseHelper(this.root);
    return evenCount;
  }
  // let test = new TreeNode(12, [new TreeNode(8,[]), new TreeNode(5,[new TreeNode(6,[])])])
  // let treetest = new Tree(test)
  // console.log(treetest.countEvens())

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let count = 0;
    if (this.root === null) return 0;
    if (this.root.val > lowerBound) count++;
    function traverseHelper(node) {
      for (let child of node.children) {
        if (child.val > lowerBound) count++;
        if (child.children.length > 0) {
          traverseHelper(child);
        }
      }
    }
    traverseHelper(this.root);
    return count;
  }
  // let test = new TreeNode(12, [new TreeNode(8,[]), new TreeNode(5,[new TreeNode(6,[])])])
  // let treetest = new Tree(test)
  // console.log(treetest.numGreater(7))
}

module.exports = { Tree, TreeNode };
