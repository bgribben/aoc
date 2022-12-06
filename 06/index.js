const fs = require('fs');

const detectPackets = (input, windowSize) => {
  const window = [];
  for (let i = 0; i < input.length; i++) {
    window.push(input[i]);
    if (window.length < windowSize) continue;
    if (window.length > windowSize) window.shift();
    const unique = [...new Set(window)];
    if (unique.length === windowSize) {
      return i + 1;
    }
  }
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });

  const part1 = detectPackets(input, 4);
  const part2 = detectPackets(input, 14);

  console.log('Part 1:', part1);
  console.log('Part 2:', part2);
  console.timeEnd('Time');
};

main();
