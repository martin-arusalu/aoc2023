const alphabetFull = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetlow = "abcdefghijklmnopqrstuvwxyz";
const alphabetUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function sortObjByAttr<Obj>(
  objects: Obj[],
  attr: keyof Obj,
  desc = false,
) {
  const sorted = [...objects];

  return sorted.sort((a, b) => {
    const aElem = a[attr] as number;
    const bElem = b[attr] as number;

    return desc ? bElem - aElem : aElem - bElem;
  });
}

function splitArrayHalf<Elem>(arr: Array<Elem>) {
  const half = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half);

  return [firstHalf, secondHalf];
}

function splitString(str: string, index: number) {
  const result = [str.slice(0, index), str.slice(index)];
  return result;
}

function reverseString(str: string) {
  return str.split("").reverse().join("");
}

function replaceAt(original: string, index: number, replacement: string) {
  return original.substring(0, index) + replacement +
    original.substring(index + replacement.length);
}

function createStringMatrix(rows: number, columns: number, fill: string) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = fill.repeat(columns);
    matrix.push(row);
  }

  return matrix;
}

function createMatrix<T>(rows: number, columns: number, fill: T) {
  const matrix: Array<Array<T>> = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      row.push(fill);
    }
    matrix.push(row);
  }

  return matrix;
}

function renderMatrix(matrix: Array<Array<unknown>>) {
  for (let i = 0; i < matrix.length; i++) {
    const row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[i][j]);
    }
    console.log(row.join(","));
  }
}

// modified implementation of https://gist.github.com/Prottoy2938/66849e04b0bac459606059f5f9f3aa1a
class Node {
  val: string;
  priority: number;

  constructor(val: string, priority: number) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  values: Node[];

  constructor() {
    this.values = [];
  }
  enqueue(val: string, priority: number) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (end && this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          leftChild && (
            (swap === null && rightChild.priority < element.priority) ||
            (swap !== null && rightChild.priority < leftChild.priority)
          )
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class WeightedGraph {
  adjacencyList: { [key: string]: Array<{ node: string; weight: number }> };
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1: string, vertex2: string, weight: number) {
    const existing = this.adjacencyList[vertex1].find((e) =>
      e.node === vertex2
    );
    if (!existing) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
    }
  }
  Dijkstra(start: string, finish: string) {
    const nodes = new PriorityQueue();
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const path: string[] = [];
    let endDist = Number.MAX_SAFE_INTEGER;
    let smallest;
    //build up initial state
    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        //WE ARE DONE
        //BUILD UP PATH TO RETURN AT END
        endDist = distances[smallest];
        while (smallest && previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (const neighbor in this.adjacencyList[smallest]) {
          //find neighboring node
          const nextNode = this.adjacencyList[smallest][neighbor];
          //calculate new distance to neighboring node
          const candidate = distances[smallest] + nextNode.weight;
          const nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            //updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return {
      distance: endDist,
      path: path.concat(smallest ?? "").reverse().join("-"),
    };
  }
}

function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export default {
  alphabetFull,
  alphabetlow,
  alphabetUp,

  sortObjByAttr,
  splitArrayHalf,
  splitString,
  reverseString,
  createStringMatrix,
  createMatrix,
  renderMatrix,
  replaceAt,
  gcd,
  lcm,

  WeightedGraph,
  PriorityQueue,
  Node,
};

// TODO manhattan distance
