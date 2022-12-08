const fs = require('fs');

const checkVisibility = (arr, pos) => {
  let isVisibleFromStart = true;
  let isVisibleFromEnd = true;

  for (let i = 0; i < pos; i++) {
    if (+arr[i] >= +arr[pos]) {
      isVisibleFromStart = false;
    }
  }

  for (let i = arr.length - 1; i >= pos + 1; i--) {
    if (+arr[i] >= +arr[pos]) {
      isVisibleFromEnd = false;
    }
  }
  return isVisibleFromStart || isVisibleFromEnd;
};

const getScenicScore = (arr, pos) => {
  let start = 0;
  let end = 0;

  for (let i = pos - 1; i >= 0; i--) {
    start++;
    if (+arr[i] >= +arr[pos]) {
      break;
    }
  }
  for (let i = pos + 1; i < arr.length; i++) {
    end++;
    if (+arr[i] >= +arr[pos]) {
      break;
    }
  }

  return start * end;
};

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });

  let totalVisible = 0;
  let bestScenicScore = 0;

  const treeRows = input.split('\n');
  const treeColumns = treeRows[0].split('').map((_, i) => {
    let column = '';
    treeRows.forEach((row) => (column += row[i]));
    return column;
  });

  treeRows.forEach((row, y) => {
    if (y === 0 || y === treeRows.length - 1)
      return (totalVisible += row.length);

    row.split('').forEach((_, x) => {
      if (x === 0 || x === row.length - 1) {
        return (totalVisible += 1);
      }

      const isVisible =
        checkVisibility(row, x) || checkVisibility(treeColumns[x], y);
      if (isVisible) {
        totalVisible += 1;
      }

      const score = getScenicScore(row, x) * getScenicScore(treeColumns[x], y);
      if (score > bestScenicScore) {
        bestScenicScore = score;
      }
    });
  });

  console.log('Part 1:', totalVisible);
  console.log('Part 2:', bestScenicScore);
  console.timeEnd('Time');
};

main();
