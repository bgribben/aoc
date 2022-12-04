const fs = require('fs');

const main = async () => {
  console.time('Time');
  const input = await fs.readFileSync('./input', { encoding: 'utf-8' });

  const { contains, overlaps } = input.split('\n').reduce(
    (totals, sector) => {
      const [a1, a2, b1, b2] = sector.match(/(\d+)/g);

      if ((+a1 <= +b1 && +a2 >= +b2) || (+b1 <= +a1 && +b2 >= +a2))
        totals.contains += 1;
      if ((+a1 <= +b1 && +a2 >= +b1) || (+b1 <= +a1 && +b2 >= +a1))
        totals.overlaps += 1;

      return totals;
    },
    { contains: 0, overlaps: 0 }
  );

  console.log('Part 1:', contains);
  console.log('Part 2:', overlaps);

  console.timeEnd('Time');
};

main();
