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

type Graph = { [coord: string]: Node };
type Distances = { [coord: string]: number };
type Node = { [coord: string]: number };

function createGraph(data: Array<Array<number>>) {
  const graph: Graph = {};

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const node: Node = {};

      if (y > 0) {
        const valueDifference = data[y - 1][x] - data[y][x];
        if (valueDifference < 2) {
          node[`${x};${y - 1}`] = 1;
        }
      }
      if (x > 0) {
        const valueDifference = data[y][x - 1] - data[y][x];
        if (valueDifference < 2) {
          node[`${x - 1};${y}`] = 1;
        }
      }
      if (x < data[y].length - 1) {
        const valueDifference = data[y][x + 1] - data[y][x];
        if (valueDifference < 2) {
          node[`${x + 1};${y}`] = 1;
        }
      }

      if (y < data.length - 1) {
        const valueDifference = data[y + 1][x] - data[y][x];
        if (valueDifference < 2) {
          node[`${x};${y + 1}`] = 1;
        }
      }

      graph[`${x};${y}`] = node;
    }
  }

  return graph;
}

function shortestDistanceNode(
  distances: Distances,
  visited: string[],
) {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (const node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    const currentIsShortest = shortest === null ||
      distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }

  // why 394? Check last year day 12
  if (shortest && distances[shortest] >= 394) return null;
  return shortest;
}

function findShortestPath(graph: Graph, startNode: string, endNode: string) {
  // track distances from the start node using a hash object
  let distances: Distances = {};
  distances[endNode] = Infinity;
  distances = Object.assign(distances, graph[startNode]);

  // track paths using a hash object
  const parents: { [coord: string]: string | null } = { [endNode]: null };
  for (const child in graph[startNode]) {
    parents[child] = startNode;
  }

  // collect visited nodes
  const visited: string[] = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    const distance = distances[node];
    const children = graph[node];

    // for each of those child nodes:
    for (const child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        const newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  const shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  const results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
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
  createGraph,
  findShortestPath,
  replaceAt,
  gcd,
  lcm,
};

// TODO manhattan distance
