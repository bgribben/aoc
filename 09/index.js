const fs = require('fs');

const moves = {
  L: -1,
  R: 1,
  D: -1,
  U: 1,
};

const visited = {};
const numberOfKnots = 10;
const knots = Array.from({ length: numberOfKnots }, () => ({ x: 0, y: 0 }));

const logVisit = (...indexes) => {
  indexes.forEach((index) => {
    const knot = knots[index];
    if (visited[index]) {
      visited[index][`${knot.x},${knot.y}`] = true;
    } else {
      visited[index] = {
        [`${knot.x},${knot.y}`]: true,
      };
    }
  });
};

const checkKnots = (index = 1) => {
  if (index === numberOfKnots) return;
  const knotA = knots[index - 1];
  const knotB = knots[index];

  if (Math.abs(knotA.x - knotB.x) > 1 || Math.abs(knotA.y - knotB.y) > 1) {
    const dx = knotA.x - knotB.x;
    const dy = knotA.y - knotB.y;

    if (dx) knotB.x += dx > 0 ? 1 : -1;
    if (dy) knotB.y += dy > 0 ? 1 : -1;
    checkKnots(index + 1);
  }
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });

  input.split('\n').forEach((line) => {
    const [dir, distance] = line.split(' ');

    for (let i = 0; i < +distance; i++) {
      const target = 'LR'.includes(dir) ? 'x' : 'y';
      knots[0][target] += moves[dir];
      checkKnots();
      logVisit(1, numberOfKnots - 1);
    }
  });
  console.log('Part 1:', Object.keys(visited[1]).length);
  console.log('Part 2:', Object.keys(visited[numberOfKnots - 1]).length);
  console.timeEnd('Time');
};

main();
