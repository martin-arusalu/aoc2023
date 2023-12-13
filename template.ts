const real = ``;
const test = ``;

function format(input: string) {
  return input.split("\n");
}

function part1(input: string) {
  console.time("part1");
  let result = 0;

  const data = format(input);

  console.log(result);
  console.timeEnd("part1");
}

function part2(input: string) {
  console.time("part2");
  let result = 0;

  const data = format(input);

  console.log(result);
  console.timeEnd("part2");
}

part1(test);
// part1(real);
// part2(test);
// part2(real);
