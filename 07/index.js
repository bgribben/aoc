const fs = require('fs');

const dirs = [];

const getDirSizes = (commands) =>
  Object.values(
    commands.reduce((acc, output) => {
      const isCommand = output[0] === '$';
      const isCd = output.slice(0, 4) === '$ cd';
      const isBack = output.slice(5) === '..';
      const isFile = output.slice(0, 3) !== 'dir';

      if (isCommand) {
        if (isCd) isBack ? dirs.pop() : dirs.push(output.slice(5));
      } else if (isFile) {
        const [size] = output.split(' ');
        let absoluteDir = '';
        dirs.forEach((dir) => {
          absoluteDir += dir;
          acc[absoluteDir] = acc[absoluteDir]
            ? acc[absoluteDir] + +size
            : +size;
        });
      }
      return acc;
    }, {})
  );

const getPart1 = (dirSizes) =>
  dirSizes.reduce((acc, size) => (size <= 100000 ? (acc += size) : acc), 0);

const getPart2 = (dirSizes) => {
  const sortedSizes = [...dirSizes].sort((a, b) => a - b);
  return sortedSizes.find((size) => dirSizes[0] - size <= 40000000);
};

const main = async () => {
  console.time('Time');

  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });
  const dirSizes = getDirSizes(input.split('\n'));

  const part1 = getPart1(dirSizes);
  const part2 = getPart2(dirSizes);

  console.log('Part 1:', part1);
  console.log('Part 2:', part2);
  console.timeEnd('Time');
};

main();
