const fs = require('fs');

const performMoves = (moves, initialStacks, maintainOrder) => {
  const stacks = JSON.parse(JSON.stringify(initialStacks));
  const crane = [];

  moves.forEach((move) => {
    const [count, from, to] = move.match(/(\d+)/g).map((x) => +x);
    for (let i = 0; i < count; i++) {
      crane.unshift(stacks[from - 1].shift());
    }

    for (let i = 0; i < count; i++) {
      maintainOrder
        ? stacks[to - 1].unshift(crane.shift())
        : stacks[to - 1].unshift(crane.pop());
    }
  });

  return stacks;
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });
  let [stacksInput, moves] = input.split('\n\n');
  const stacks = [];

  stacksInput.split('\n').forEach((line, i, arr) => {
    if (i === arr.length - 1) return;
    for (let j = 0; j < line.length; j += 4) {
      const stack = j / 4;
      const crate = line.slice(j, j + 3)[1].trim();
      if (crate) {
        stacks[stack] = stacks[stack] ? [...stacks[stack], crate] : [crate];
      }
    }
  });

  const part1 = performMoves(moves.split('\n'), stacks);
  const part2 = performMoves(moves.split('\n'), stacks, true);

  console.log('Part 1:', part1.map((stack) => stack[0]).join(''));
  console.log('Part 2:', part2.map((stack) => stack[0]).join(''));

  console.timeEnd('Time');
};

main();
