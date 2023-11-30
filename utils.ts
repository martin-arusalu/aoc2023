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
};

// TODO manhattan distance
// TODO graph functions
