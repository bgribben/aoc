const fs = require('fs');

const pattern = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;
const stringsAsNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });

  const sum = input.split('\n').reduce((_sum, line) => {
    const matches = [...line.matchAll(pattern)];
    let string = '';
    matches.forEach((match, i) => {
      if (i === 0) {
        string += isNaN(match[1]) ? stringsAsNumbers[match[1]] : match[1];
      }
      if (i === matches.length - 1) {
        string += isNaN(match[1]) ? stringsAsNumbers[match[1]] : match[1];
      }
    });
    return _sum + +string;
  }, 0);

  console.log(sum);
  console.timeEnd('Time');
};

main();
