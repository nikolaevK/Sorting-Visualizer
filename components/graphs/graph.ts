// Vertex => Node
// Edge => connection
// Undirected Graph => two way connection, no assigned direction
// Directed Graph => direction assigned to the edge
// Unweighted Graph => Edge has no value
// Weighted Graph => Edge has a value

// ADJACENCY MATRIX => using a matrix
// add and remove vertex O(n^2) because you have to add a column and a row
// add and remove edge O(1)
// Query O(1)
// storage O(n^2)

// ADJACENCY LIST => using hash table to store vertices and edges
// add Vertex and Edge O(1)
// Less space than adjacency matrix

// Undirected Graph
// Unweighted Graph

export class Graph {
  constructor() {
    this.adjacencyList_ = {};
  }

  private adjacencyList_: Record<number, number[]>;

  addVertex(vertex: number) {
    this.adjacencyList_[vertex] = [];
  }

  addEdge(vertex1: number, vertex2: number) {
    this.adjacencyList_[vertex1].push(vertex2);
    this.adjacencyList_[vertex2].push(vertex1);
  }

  removeEdge(vertex1: number, vertex2: number) {
    this.adjacencyList_[vertex1] = this.adjacencyList_[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList_[vertex2] = this.adjacencyList_[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex: number) {
    // assigning the length because Adjacency List is mutable and will decrease inside the loop
    let length = this.adjacencyList_[vertex].length;
    if (length > 0) {
      // removes all elements from the Adjacency List and removes itself from those vertices
      for (let i = 0; i < length; i++) {
        this.removeEdge(vertex, this.adjacencyList_[vertex][0]);
      }
    }
    // deletes the Vertex
    delete this.adjacencyList_[vertex];
  }

  DFSrecursive(vertex: number) {
    const results: number[] = [];
    const visited: Record<number, boolean> = {};

    const DFS = (vertex: number) => {
      if (this.adjacencyList_[vertex].length === 0) return; // base case
      visited[vertex] = true; // visited
      results.push(vertex);

      this.adjacencyList_[vertex].forEach((v) => {
        if (!visited[v]) return DFS(v);
      });
    };
    DFS(vertex);
    return results;
  }

  DFSiterative(vertex: number) {
    const stack: number[] = [];
    const results: number[] = [];
    const visited: Record<number, boolean> = {};

    stack.push(vertex);
    visited[vertex] = false;

    while (stack.length > 0) {
      let next = stack.pop();
      if (!visited[next!]) {
        visited[next!] = true;
        results.push(next!);
        this.adjacencyList_[next!].forEach((v) => stack.push(v));
      }
    }
    // Results will be in different order than the results from recursive solution
    // due to implementation of a stack but still DFS
    // instead of starting with first element in adjacency list, start with popped one (last)
    return results;
  }

  BFS(vertex: number) {
    const queue: number[] = [vertex];
    const results: number[] = [];
    const visited: Record<number, boolean> = {};
    let next;

    visited[vertex] = true;

    while (queue.length > 0) {
      next = queue.shift();
      results.push(next!);
      this.adjacencyList_[next!].forEach((v) => {
        if (!visited[v]) {
          visited[v] = true;
          queue.push(v);
        }
      });
    }
    return results;
  }
}
