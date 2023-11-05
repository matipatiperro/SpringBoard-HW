class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    // return this.nodes.add(vertex);
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vert of vertexArray) {
      // this.nodes.add(vert);
      this.addVertex(vert);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const nodeVals = [];
    const visited = new Set();
    function traverse(newNode) {
      if (newNode === null) return null;

      visited.add(newNode);
      nodeVals.push(newNode.value);
      // console.log("visiting: ", newNode.value);
      // console.log("adjacent are: ", newNode.adjacent);
      for (let node of newNode.adjacent) {
        if (!visited.has(node)) {
          traverse(node);
        } else {
          // console.log("already visited: ", node.value);
        }
      }
    }
    traverse(start);
    // console.log(nodeVals);
    return nodeVals;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const nodeVals = [];
    const visited = new Set();
    let currNode;

    while (queue.length) {
      currNode = queue.shift();
      // console.log("current node is: ", currNode);
      if (currNode)
        if (!visited.has(currNode)) {
          nodeVals.push(currNode.value);
          visited.add(currNode);
          currNode.adjacent.forEach((element) => {
            queue.push(element);
          });
        }
    }
    return nodeVals;
  }
}

module.exports = { Graph, Node };
