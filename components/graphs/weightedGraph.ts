// class Node {
//   constructor(value: number, priority: number) {
//     this.value_ = value;
//     this.priority_ = priority;
//   }

//   private value_: number;
//   private priority_: number;

//   getPriority() {
//     return this.priority_;
//   }
//   getValue() {
//     return this.value_;
//   }
// }

// class PriorityQueue {
//   constructor() {
//     this.values_ = [];
//   }
//   private values_: Array<Node>;

//   getQueueLength() {
//     return this.values_.length;
//   }

//   swap(index1: number, index2: number) {
//     let temp = this.values_[index1];
//     this.values_[index1] = this.values_[index2];
//     this.values_[index2] = temp;
//   }

//   enqueue(value: number, priority: number) {
//     const newNode = new Node(value, priority);
//     if (this.values_.length === 0) return this.values_.push(newNode);

//     this.values_.push(newNode);

//     const bubbleUp = () => {
//       // the index of the value will be last in the array
//       let n = this.values_.length - 1;
//       let parentIndex = Math.round((n - 1) / 2);

//       while (
//         this.values_[parentIndex].getPriority() > this.values_[n].getPriority()
//       ) {
//         // If larger, swap the child (value) with its node
//         this.swap(n, parentIndex);
//         // assign the index of the value to index of the node
//         n = parentIndex;
//         // find the new index (parent) of new child or the node
//         // repeat until there are no smaller value parents
//         parentIndex = Math.round((n - 1) / 2);
//       }
//     };

//     bubbleUp();
//   }

//   dequeue() {
//     const maxPriority = this.values_[0];

//     // assign last element to the root
//     this.values_[0] = this.values_[this.values_.length - 1];

//     let parentIndex = 0;

//     let swapped: null | number = 1;

//     while (
//       swapped !== null &&
//       // parentIndex * 2 + 1 < this.values_.length &&
//       parentIndex * 2 + 2 < this.values_.length
//     ) {
//       let leftChildIdx = parentIndex * 2 + 1;
//       let rightChildIdx = parentIndex * 2 + 2;
//       // swap with the largest child
//       let minIndex = Math.min(
//         this.values_[leftChildIdx].getPriority(),
//         this.values_[rightChildIdx].getPriority()
//       );
//       if (
//         minIndex === this.values_[leftChildIdx].getPriority() &&
//         this.values_[parentIndex].getPriority() >
//           this.values_[leftChildIdx].getPriority()
//       ) {
//         this.swap(parentIndex, leftChildIdx);
//         parentIndex = leftChildIdx;
//       } else if (
//         minIndex === this.values_[rightChildIdx].getPriority() &&
//         this.values_[parentIndex].getPriority() >
//           this.values_[rightChildIdx].getPriority()
//       ) {
//         this.swap(parentIndex, rightChildIdx);
//         parentIndex = rightChildIdx;
//       } else {
//         swapped = null;
//       }
//     }
//     // removes last element in the heap
//     // it was bubbled down from top and assigned to a new place
//     this.values_.pop();

//     return maxPriority;
//   }
// }

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
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
    const nodes = new PriorityQueue();
    const distances: Record<number, number> = {};
    const previous: Record<number, number> = {};
    const path: number[] = [];
    const animationGraphArray: number[] = [];
    let smallest: number;

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
      previous[vertex] = null;
    }
    // console console.log(distances);
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      console.log(smallest);
      console.log(nodes);
      // pushing all the nodes algorithm went through
      animationGraphArray.push(smallest);
      if (smallest === end) {
        // done
        while (previous[smallest]) {
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
          // adding weight of previous nodes to a new neighbor
          let newDistance = distances[smallest] + nextNode.weight;
          // checking if the new distance to that node is smaller than the current distance
          // which is saved in distances[of that node]
          if (newDistance < distances[nextNode.node]) {
            // updating new smallest distance to neighbor
            distances[nextNode.node] = newDistance;
            // updating previous - how we we got to neighbor
            previous[nextNode.node] = smallest;
            // Enqueue the node with new priority
            nodes.enqueue(nextNode.node, newDistance);
          }
        }
      }
    }

    const finalPath: number[] = path.concat(smallest).reverse();

    return { finalPath, animationGraphArray };
  }
}
