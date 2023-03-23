class Node {
  constructor(value: number, priority: number) {
    this.value_ = value;
    this.priority_ = priority;
  }

  private value_: number;
  private priority_: number;

  getPriority() {
    return this.priority_;
  }
  getValue() {
    return this.value_;
  }
}

// Implemented as a Binary Heap
class PriorityQueue {
  constructor() {
    this.values_ = [];
  }
  private values_: Array<Node>;

  getQueueLength() {
    return this.values_.length;
  }

  swap(index1: number, index2: number) {
    let temp = this.values_[index1];
    this.values_[index1] = this.values_[index2];
    this.values_[index2] = temp;
  }

  enqueue(value: number, priority: number) {
    const newNode = new Node(value, priority);
    this.values_.push(newNode);

    const bubbleUp = () => {
      // the index of the value will be last in the array
      let index = this.values_.length - 1;

      while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (
          this.values_[parentIndex].getPriority() <=
          this.values_[index].getPriority()
        )
          break;
        // If child is more prioritized, swap the child (value) with its node
        this.swap(index, parentIndex);
        // assign new index to continue bubbling up
        index = parentIndex;
      }
    };

    bubbleUp();
  }

  dequeue() {
    const maxPriority = this.values_[0];

    // assign last element to the root
    this.values_[0] = this.values_[this.values_.length - 1];

    let parentIndex = 0;

    // Needed to break out of loop
    let swapped: null | number = 1;

    while (
      swapped !== null &&
      // parentIndex * 2 + 1 < this.values_.length &&
      parentIndex * 2 + 2 < this.values_.length
    ) {
      let leftChildIdx = parentIndex * 2 + 1;
      let rightChildIdx = parentIndex * 2 + 2;
      // swap with the largest child
      let minIndex = Math.min(
        this.values_[leftChildIdx].getPriority(),
        this.values_[rightChildIdx].getPriority()
      );
      if (
        minIndex === this.values_[leftChildIdx].getPriority() &&
        this.values_[parentIndex].getPriority() >
          this.values_[leftChildIdx].getPriority()
      ) {
        this.swap(parentIndex, leftChildIdx);
        parentIndex = leftChildIdx;
      } else if (
        minIndex === this.values_[rightChildIdx].getPriority() &&
        this.values_[parentIndex].getPriority() >
          this.values_[rightChildIdx].getPriority()
      ) {
        this.swap(parentIndex, rightChildIdx);
        parentIndex = rightChildIdx;
      } else {
        swapped = null;
      }
    }
    // removes last element in the heap to avoid duplicates
    // item was bubbled down from top and assigned to a new place
    this.values_.pop();

    return maxPriority;
  }
}

interface Edge {
  node: number;
  weight: number;
}

export class WeightedGraph {
  constructor() {
    this.adjacencyList_ = {};
  }

  private adjacencyList_: Record<number, Array<Edge>>;

  addVertex(vertex: number) {
    if (!this.adjacencyList_[vertex]) this.adjacencyList_[vertex] = [];
  }

  addEdge(vertex1: number, vertex2: number, weight: number) {
    this.adjacencyList_[vertex1].push({ node: vertex2, weight });
    this.adjacencyList_[vertex2].push({ node: vertex1, weight });
  }

  // Dijkstra's Algorithm
  dijkstra(start: number, end: number) {
    const nodes = new PriorityQueue(); // Provides ability to visit node with least weight
    const distances: Record<number, number> = {}; // tracks the distance from Start node to any other node
    const previous: Record<number, number> = {}; // Tracks the shortest path from one node to other
    const path: number[] = []; //
    const animationGraphArray: number[] = [];
    let smallest: number = 0;

    // initial state
    for (const key in this.adjacencyList_) {
      let vertex = parseInt(key);
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
    }

    while (nodes.getQueueLength()) {
      smallest = nodes.dequeue().getValue();
      // pushing all the nodes algorithm went through
      animationGraphArray.push(smallest);
      if (smallest === end) {
        // It will go only up to Node zero which has value of previous undefined
        // because the first node is 0, and zero is falsy, we account for that
        //by checking that its a number
        while (typeof previous[smallest] === "number") {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (const key in this.adjacencyList_[smallest]) {
          let neighbor = parseInt(key);
          // neighbor is an index of a neighbor
          let nextNode = this.adjacencyList_[smallest][neighbor]; // getting actual value, an object
          // adding weight of previous nodes to a new neighbor to indicate the distance from node zero to that node
          let newDistance = distances[smallest] + nextNode.weight;
          // checking if the new distance to that node is smaller than the current distance from zero
          // which is saved in distances[of that node]
          if (newDistance < distances[nextNode.node]) {
            // updating new smallest distance to that node
            distances[nextNode.node] = newDistance;
            // updating previous - how we we got to that node, new previous with shorter distance
            previous[nextNode.node] = smallest;
            // Enqueue the node with new priority, smaller weight
            nodes.enqueue(nextNode.node, newDistance);
          }
        }
      }
    }

    // Reverse the path because we pushed values from the end of the Previous Array
    // path array also does not include the last smallest value which breaks the loop
    // because its previous value is undefined
    const finalPath: number[] = path.concat(smallest).reverse();

    return { finalPath, animationGraphArray };
  }
}
