const fs = require('fs');

const main = async () => {
  console.time("Time");
  const input = await fs.readFileSync('./input', { encoding: 'utf-8'} );
  const totals = input.split('\n\n').map(items => items.split('\n').reduce((acc, curr) => acc + +curr, 0)).sort((a, b) => b - a)
  console.log("Part 1:", totals[0])
  console.log("Part 2:", totals[0] + totals[1] + totals[2])
  console.timeEnd("Time");
};

main();