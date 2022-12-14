const fs = require('fs');

const cycleLength = {
  addx: 2,
  noop: 1,
};

let strength = 0;
let screen = [];

const isWithinSprite = (rowPosition, sprite) =>
  rowPosition >= sprite - 1 && rowPosition <= sprite + 1;

const monitorStrength = (cycle, register) => {
  const intervals = [20, 60, 100, 140, 180, 220];
  if (intervals.includes(cycle)) {
    strength += cycle * register;
  }
};

const drawPixel = (cycle, sprite) => {
  const intervals = [40, 80, 120, 160, 200, 240];
  const row = intervals.findIndex((interval) => cycle <= interval);
  const rowPosition = (cycle % 40) - 1;
  const pixel = isWithinSprite(rowPosition, sprite) ? '#' : '.';

  screen[row] = screen[row] ? screen[row] + pixel : pixel;
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });
  let register = 1;
  let cycle = 0;

  input.split('\n').forEach((line) => {
    const [command, amount] = line.split(' ');
    for (let i = 0; i < cycleLength[command]; i++) {
      cycle++;
      monitorStrength(cycle, register);
      drawPixel(cycle, register);
    }
    register += +amount || 0;
  });
  console.log('Part 1:', strength);
  console.log('Part 2:', screen);
  console.timeEnd('Time');
};

main();
