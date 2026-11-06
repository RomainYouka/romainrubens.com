import sharp from 'sharp';
import { stat } from 'node:fs/promises';

// Keep the original exports; generate responsive copies without changing framing.
let original = 0, mobile = 0;
for (let index = 1; index <= 7; index++) {
  const prefix = `public/projects/stratos/screens${index}`;
  original += (await stat(`${prefix}.webp`)).size;
  for (const width of [960, 2400, 4096]) {
    // The export includes transparent padding below the 1670px presentation.
    await sharp(`${prefix}.png`).extract({ left: 0, top: 0, width: 4096, height: 1670 }).resize({ width, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(`${prefix}-${width}.webp`);
  }
  mobile += (await stat(`${prefix}-960.webp`)).size;
}
console.log(JSON.stringify({ originalBytes: original, mobileBytes: mobile, savedPercent: Math.round((1 - mobile / original) * 100) }));
