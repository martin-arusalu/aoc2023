type Data = Array<number[]>;
const real = `Time:        59     79     65     75
Distance:   597   1234   1032   1328`;
const test = `Time:      7  15   30
Distance:  9  40  200`;

function format(input: string): Data {
  const [timeString, distanceString] = input.split("\n");
  const times = timeString.split(": ")[1].split(" ").filter((e) => !!e).map(
    Number,
  );
  const distances = distanceString.split(": ")[1].split(" ").filter((e) => !!e)
    .map(Number);

  return [times, distances];
}

function part1(input: string) {
  console.time("part1");
  const [times, distances] = format(input);
  let result = 1;

  for (let race = 0; race < times.length; race++) {
    let possibilities = 0;

    for (let i = 1; i < times[race]; i++) {
      if (i * (times[race] - i) > distances[race]) possibilities++;
    }

    result *= possibilities;
  }

  console.log(result);
  console.timeEnd("part1");
}

function part2(input: string) {
  console.time("part2");
  let result = 0;

  const [times, distances] = format(input);

  const time = +times.join("");
  const distance = +distances.join("");

  for (let i = 1; i < time; i++) {
    if (i * (time - i) > distance) result++;
  }

  console.log(result);
  console.timeEnd("part2");
}

part1(test);
part1(real);
part2(test);
part2(real);
