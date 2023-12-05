import utils from "./utils.ts";

type Data = Array<string>;
const real = ``;
const test = ``;

function format(input: string): Data {
  return input.split("\n");
}

function part1(input: string) {
  console.time("part1");
  const data = format(input);
  let result = 0;

  console.log(result);
  console.timeEnd("part1");
}

function part2(input: string) {
  console.time("part2");
  const data = format(input);
  let result = 0;

  console.log(result);
  console.timeEnd("part2");
}

part1(test);
// part1(real);
// part2(test);
// part2(real);
