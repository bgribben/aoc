const fs = require('fs');

const getPart1Score = (rounds) => {
  const draw = 'A XB YC Z';
  const win = 'A YB Z C X';
  const moveValue = { X: 1, Y: 2, Z: 3 };

  return rounds.reduce((score, round) => {
    score += moveValue[round[2]];
    if (draw.includes(round)) return score + 3;
    if (win.includes(round)) return score + 6;
    return score;
  }, 0);
};

const getPart2Score = (rounds) => {
  const rock = 'A YB XC Z';
  const paper = 'A ZB YC X';
  const outcomeValue = { X: 0, Y: 3, Z: 6 };

  return rounds.reduce((score, round) => {
    score += outcomeValue[round[2]];
    if (rock.includes(round)) return score + 1;
    if (paper.includes(round)) return score + 2;
    return score + 3;
  }, 0);
};

const main = async () => {
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });
  const rounds = input.split('\n');

  console.time('Time');
  const part1 = getPart1Score(rounds);
  console.log('Part 1:', part1);
  const part2 = getPart2Score(rounds);
  console.log('Part 2:', part2);
  console.timeEnd('Time');
};

main();
