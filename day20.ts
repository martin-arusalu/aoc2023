const real = `%qx -> gz
%tr -> rm
%qr -> kx, jm
%gj -> tx, rj
%lc -> hr
&kx -> zs, br, jd, bj, vg
&kd -> rg
%rm -> pf, ml
%tg -> tq, cp
%cp -> tp, tq
%sx -> qc, pf
&zf -> rg
%jz -> kx, pt
%dt -> tg, tq
%xv -> rj
%vz -> rj, xv
%vn -> vv, tq
%hl -> xt
%qc -> pf
%br -> jz
broadcaster -> sr, cg, dt, zs
%sk -> kx, qr
%xq -> dj
&vg -> rg
%zd -> pf, lc
%hr -> pm
%cg -> qx, rj
%tx -> vz, rj
%qf -> sb
&rj -> gs, sb, qx, qf, gz, hl, cg
%rb -> lz
%ml -> pf, xq
%bj -> jd
&gs -> rg
%sr -> pf, zd
%sb -> gj
&tq -> tp, rb, dt, kd, zt
%tp -> dm
%vv -> tq
%pm -> tr
%dj -> pf, sx
%lz -> vn, tq
%jd -> lx
%qn -> tq, rb
%zs -> kx, bj
&rg -> rx
%pt -> cb, kx
%xt -> ns, rj
%gz -> hl
%zt -> qn
%jm -> kx
%vp -> br, kx
&pf -> tr, hr, zf, sr, xq, pm, lc
%gp -> tq, zt
%dm -> tq, gp
%lx -> kx, vp
%ns -> qf, rj
%cb -> sk, kx`;
const test = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;
const test2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

type Module = { next: string[]; value?: boolean | { [key: string]: boolean } };
function format(input: string) {
  const final: { [key: string]: Module } = {};
  input.split("\n").forEach((e) => {
    const [name, next] = e.split(" -> ");
    final[name] = {
      next: next.split(", ").map((e) => {
        if (input.indexOf(`%${e} ->`) >= 0) return `%${e}`;
        if (input.indexOf(`&${e} ->`) >= 0) return `&${e}`;
        return e;
      }),
    };
  });

  return final;
}

function deepCopy<T>(src: T): T {
  const target = Array.isArray(src) ? [] as T : {} as T;
  for (const prop in src) {
    const value = src[prop];
    if (value && typeof value === "object") {
      target[prop] = deepCopy(value);
    } else {
      target[prop] = value;
    }
  }
  return target;
}

function part1(input: string) {
  console.time("part1");
  let result = 0;

  const data = format(input);

  for (const module in data) {
    if (module.charAt(0) === "%") {
      data[module].value = false;
    } else if (module.charAt(0) === "&") {
      data[module].value = {};
      Object.keys(data)
        .filter((m) => data[m].next.includes(module))
        .forEach((m) =>
          (data[module].value as { [key: string]: boolean })[m] = false
        );
    }
  }

  let highPulsesSent = 0;
  let lowPulsesSent = 0;
  const signalsToSend: Array<[string, string, boolean]> = [];

  function process(
    prev: string,
    moduleName: string,
    on: boolean,
  ) {
    const module = data[moduleName];
    if (moduleName.charAt(0) === "%" && !on) {
      module.value = !module.value;
      for (const nextModule of module.next) {
        signalsToSend.push([moduleName, nextModule, module.value]);
      }
    } else if (moduleName.charAt(0) === "&") {
      (module.value as { [key: string]: boolean })[prev] = on;
      let toSend = true;
      if (
        Object.keys(module.value as { [key: string]: boolean }).every((e) =>
          !!(module.value as { [key: string]: boolean })[e]
        )
      ) {
        toSend = false;
      }

      for (const nextModule of module.next) {
        signalsToSend.push([moduleName, nextModule, toSend]);
      }
    } else if (moduleName === "broadcaster") {
      for (const nextModule of module.next) {
        signalsToSend.push([moduleName, nextModule, on]);
      }
    }

    return signalsToSend;
  }

  function push() {
    signalsToSend.push([
      "button",
      "broadcaster",
      false,
    ]);
    while (signalsToSend.length > 0) {
      const iteration = signalsToSend.length;
      for (let i = 0; i < iteration; i++) {
        const signal = signalsToSend.shift();
        if (signal) {
          if (signal[2]) {
            highPulsesSent++;
          } else {
            lowPulsesSent++;
          }
          process(...signal);
        }
      }
    }
  }

  for (let i = 0; i < 1000; i++) {
    push();
  }

  result = highPulsesSent * lowPulsesSent;

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

// part1(test);
// part1(test2);
part1(real);
// part2(real);
