/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    function treeTraverse(node) {
      if (node.left === null && node.right == null) return 1;
      if (node.left === null) return treeTraverse(node.right) + 1;
      if (node.right === null) return treeTraverse(node.left) + 1;
      return Math.min(treeTraverse(node.left), treeTraverse(node.right)) + 1;
    }
    return treeTraverse(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    function treeTraverse(node) {
      if (node.left === null && node.right == null) return 1;
      if (node.left === null) return treeTraverse(node.right) + 1;
      if (node.right === null) return treeTraverse(node.left) + 1;
      return Math.max(treeTraverse(node.left), treeTraverse(node.right)) + 1;
    }
    return treeTraverse(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  // NOTE: my solution only goes down nodes, i think the desired solution travels a path - up and down like a V
  maxSum() {
    if (!this.root) return 0;
    function treeTraverse(node) {
      console.log(node.val);
      if (node.left === null && node.right == null) return node.val;
      if (node.left === null) return treeTraverse(node.right) + node.val;
      if (node.right === null) return treeTraverse(node.left) + node.val;
      // console.log(node.val)
      return (
        Math.max(treeTraverse(node.left), treeTraverse(node.right)) + node.val
      );
    }
    return treeTraverse(this.root);
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    //   console.log(lowerBound)
    let closeValue = null;
    if (!this.root) return null;
    function treeTraverse(node) {
      // console.log(node.val)
      if (lowerBound < node.val) {
        //   console.log("here")
        if (closeValue === null) closeValue = node.val;
        else if (node.val < closeValue) closeValue = node.val;
        //   console.log(closeValue)
      }
      if (node.left === null && node.right == null) return closeValue;
      if (node.left === null) {
        return treeTraverse(node.right);
      }
      if (node.right === null) {
        return treeTraverse(node.left);
      }
      treeTraverse(node.right);
      treeTraverse(node.left);
    }
    treeTraverse(this.root);
    return closeValue;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {}

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };