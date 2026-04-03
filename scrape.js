import { chromium } from 'playwright';

const seeds = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table');

    const sum = await page.evaluate(() => {
      let total = 0;

      document.querySelectorAll('table td').forEach(cell => {
        const value = parseFloat(cell.textContent.trim());
        if (!isNaN(value)) {
          total += value;
        }
      });

      return total;
    });

    console.log(`Seed ${seed}: ${sum}`);
    grandTotal += sum;
  }

  console.log(`FINAL TOTAL: ${grandTotal}`);

  await browser.close();
})();
