const fs = require('fs');

let commonDenominator = 1;
const parseInput = (input, recordDenominators) =>
  input.split('\n\n').map((block) => {
    const monkey = {};
    block.split('\n').forEach((line) => {
      if (line.includes('Starting items:')) {
        monkey.items = line.match(/(\d+)/g);
      }

      if (line.includes('Operation:')) {
        let value;
        const matches = line.match(/(\d+)/g);
        if (matches) value = matches[0];
        if (line.includes('*')) {
          monkey.operation = value
            ? (input) => +input * +value
            : (input) => +input * +input;
        } else {
          monkey.operation = value
            ? (input) => +input + +value
            : (input) => +input + +input;
        }
      }

      if (line.includes('Test:')) {
        const [value] = line.match(/(\d+)/g);
        if (recordDenominators) {
          commonDenominator *= value;
        }
        monkey.test = (input) => +input % +value === 0;
      }

      if (line.includes('If true: ')) {
        const [target] = line.match(/(\d+)/g);
        monkey.trueTarget = target;
      }

      if (line.includes('If false: ')) {
        const [target] = line.match(/(\d+)/g);
        monkey.falseTarget = target;
      }
    });
    return monkey;
  });

const doRounds = (rounds, monkeys, manageStress) => {
  const inspectCounts = {};

  for (let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey, i) => {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift();
        if (!manageStress) {
          item = item % commonDenominator;
        }
        inspectCounts[i] = inspectCounts[i] ? inspectCounts[i] + 1 : 1;

        let newItem = monkey.operation(item);
        if (manageStress) {
          newItem = Math.floor(monkey.operation(item) / 3);
        }

        if (monkey.test(newItem)) {
          monkeys[monkey.trueTarget].items.push(newItem);
        } else {
          monkeys[monkey.falseTarget].items.push(newItem);
        }
      }
    });
  }

  return Object.values(inspectCounts).sort((a, b) => b - a);
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });
  const monkeysA = parseInput(input);
  const monkeysB = parseInput(input, true);

  const [a1, a2] = doRounds(20, monkeysA, true);
  const [b1, b2] = doRounds(10000, monkeysB);

  console.log('Part 1:', a1 * a2);
  console.log('Part 2:', b1 * b2);

  console.timeEnd('Time');
};

main();
