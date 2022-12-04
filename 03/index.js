const fs = require('fs');

const priorities = '.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getPart1 = (rucksacks) =>
  rucksacks.reduce((acc, rucksack) => {
    let priority;
    const asArray = rucksack.split('');
    asArray.some((item, i) => {
      const lastIndex = asArray.lastIndexOf(item);
      if (
        i <= asArray.length / 2 &&
        lastIndex !== i &&
        lastIndex >= asArray.length / 2
      ) {
        return (priority = priorities.indexOf(item));
      }
    });
    return acc + priority;
  }, 0);

const getPart2 = (rucksacks) => {
  let sum = 0;
  for (let i = 0; i < rucksacks.length; i += 3) {
    const [a, b, c] = rucksacks.slice(i, i + 3);
    const common = a
      .split('')
      .find((item) => b.includes(item) && c.includes(item));
    sum += priorities.indexOf(common);
  }

  return sum;
};

const main = async () => {
  console.time('Time');

  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });
  const asLines = input.split('\n');

  const part1 = getPart1(asLines);
  const part2 = getPart2(asLines);

  console.log('Part 1:', part1);
  console.log('Part 2:', part2);

  console.timeEnd('Time');
};

main();
