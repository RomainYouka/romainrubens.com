import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { readFile } from 'node:fs/promises';

// Exercise the compiled app, not just configuration text. No external traffic.
const port = 5011;
const base = `http://127.0.0.1:${port}`;
const projectRoutes = ['/renaultextensionapp', '/stratosapp', '/googlemapsextension', '/googleplayonios', '/goupildigitalecosystem'];
const nextProjectRoutes = { '/renaultextensionapp': '/googlemapsextension', '/googlemapsextension': '/stratosapp', '/stratosapp': '/projects/intratone', '/goupildigitalecosystem': '/googleplayonios', '/googleplayonios': '/projects/namequest' };
const projectAssets = new Set();
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)], {
  env: { ...process.env, VERCEL_ENV: 'preview' },
  stdio: 'inherit',
});
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Test server exited');
    try { ready = (await fetch(base)).ok; } catch { /* Starting. */ }
    if (ready) break;
    await delay(250);
  }
  assert.ok(ready, 'Production server must start');
  // /skills now redirects to the CV PDF, whose SAMEORIGIN policy permits
  // the site's PDF viewer. Check the redirect itself separately below.
  for (const path of ['/', '/articles', '/accessibility', '/legal', '/projects', ...projectRoutes, '/projects/namequest', '/contact', '/llms.txt', '/sitemap.xml']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    assert.equal(response.headers.get('x-frame-options'), 'DENY', path);
    assert.match(response.headers.get('content-security-policy') || '', /object-src 'none'/, path);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/, `Preview ${path}`);
    const body = await response.text();
    if (path !== '/projects/namequest') assert.ok(!(response.headers.get('content-security-policy') || '').includes('open.spotify.com'), `Spotify is not allowed on ${path}`);
    if (path === '/projects/namequest') {
      assert.match(response.headers.get('content-security-policy') || '', /frame-src 'self' https:\/\/open\.spotify\.com/);
      assert.match(body, /title="Listen to the project podcast"/);
      assert.match(body, /href="https:\/\/open.spotify.com\/episode\/03xwhLY3oo5cApzEvD9IvY"/);
    }
    if (projectRoutes.includes(path)) {
      assert.equal((body.match(/<main\b/g) || []).length, 1, `${path}: exactly one main landmark`);
      assert.equal((body.match(/<h1\b/g) || []).length, 1, `${path}: exactly one page title`);
      assert.match(body, /href="\/projects"/, `${path}: back to catalogue`);
      assert.ok(body.includes(`href="${nextProjectRoutes[path]}"`), `${path}: next project follows the catalogue order`);
      for (const [, src] of body.matchAll(/\bsrc="(\/projects\/[^"?]+)"/g)) projectAssets.add(src.replaceAll('&amp;', '&'));
      if (path === '/stratosapp') assert.match(body, /screens1-960.webp 960w/);
      if (path === '/goupildigitalecosystem') {
        assert.match(body, /preload="none"/, 'Hero video must not preload offscreen');
        assert.ok(!/<video[^>]*autoPlay/i.test(body), 'Video playback follows visibility and motion preference');
      }
    }
    if (path === '/') {
      assert.match(body, /data-home-scene/);
      assert.match(body, /data-diode-background/);
      assert.match(body, /data-home-experience/);
      assert.ok(!body.includes('data-story-countdown'), 'Removed countdown stays absent');
      assert.ok(!/<footer\b/.test(body), 'Homepage does not render a legal footer');
      assert.match(body, /Connected Ecosystems/);
    }
    if (path === '/articles') assert.match(body, /href="https:\/\/medium.com\/@romainrubens\//);
    if (path === '/googleplayonios') {
      assert.match(body, /Google Play/);
      assert.match(body, /href="\/projects\/namequest"/);
      assert.ok(!body.includes('romainrubens23@gmail.com'), 'Use public contact details in mockups');
    }
    if (path === '/contact') {
      assert.match(body, /<main[^>]*data-theme="dark"/, 'Contact keeps its dark presentation');
      assert.ok(!/<footer\b/.test(body), 'Contact does not render a legal footer');
      assert.ok(!body.includes('Copy email address'), 'Contact no longer offers clipboard actions');
      assert.match(body, /hello@romainrubens\.com/);
      assert.match(body, /href="https:\/\/cal\.com\/romainrubens"/);
      assert.ok(!/href="https?:\/\/(?:www\.)?(?:medium|pinterest|behance)\./.test(body), 'Removed social platforms stay absent from Contact');
      assert.ok(!body.includes('CONTACT FORM'), 'No unrequested data collection form');
    }
    if (path === '/llms.txt') {
      assert.ok(!/framasoft/i.test(body), 'Removed project is not advertised to crawlers');
      for (const section of ['## Projets', '## Compétences', '## Contact', '## Articles']) assert.ok(body.includes(section), section);
    }
    console.log(`PASS ${path}`);
  }
  const retiredProject = await fetch(base + '/projects/framasoft', { redirect: 'manual' });
  assert.equal(retiredProject.status, 308, 'Removed project redirects permanently');
  assert.equal(retiredProject.headers.get('location'), '/projects');
  assert.equal((await fetch(base + '/projects/blocks/framasoft-light.webp')).status, 404, 'Removed project artwork is no longer public');
  console.log('PASS retired project and route-scoped Spotify embed policy');
  for (const src of projectAssets) {
    const response = await fetch(base + src, { method: 'HEAD' });
    assert.equal(response.status, 200, `Project resource ${src}`);
  }
  console.log(`PASS ${projectAssets.size} case-study resources without missing files`);
  for (const src of ['/projects/goupil/hero-poster.avif', '/devices/iphone-18-pro.webp']) {
    const response = await fetch(base + src, { method: 'HEAD' });
    assert.match(response.headers.get('cache-control') || '', /max-age=3600/, `Asset cache ${src}`);
  }
  for (let index = 1; index <= 7; index++) for (const width of [960, 2400, 4096]) {
    const src = `/projects/stratos/screens${index}-${width}.webp`;
    const response = await fetch(base + src, { method: 'HEAD' });
    assert.equal(response.status, 200, src);
    assert.match(response.headers.get('content-type') || '', /image\/webp/, src);
  }
  console.log('PASS responsive Stratos images and AVIF/device cache policies');
  const retiredSkills = await fetch(base + '/skills', { redirect: 'manual' });
  assert.ok([307, 308].includes(retiredSkills.status), 'Retired skills route redirects');
  assert.equal(retiredSkills.headers.get('location'), '/cv');
  assert.equal(retiredSkills.headers.get('x-frame-options'), 'DENY');
  const cv = await fetch(base + '/cv');
  assert.equal(cv.status, 200, 'CV remains accessible');
  assert.match(cv.headers.get('content-type') || '', /application\/pdf/);
  assert.equal(cv.headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.match(cv.headers.get('content-security-policy') || '', /frame-ancestors 'self'/);
  console.log('PASS retired skills redirect and PDF embedding protection');
  const nativeFigures = JSON.parse(await readFile(new URL('../src/app/goupildigitalecosystem/native-extra.json', import.meta.url), 'utf8'));
  const nativeAssets = new Set();
  const collectNativeAssets = (node) => {
    if (!node || typeof node !== 'object') return;
    for (const [key, value] of Object.entries(node)) {
      if ((key === 'src' || key === 'svg') && typeof value === 'string' && value.startsWith('/')) nativeAssets.add(value);
      else if (typeof value === 'object') collectNativeAssets(value);
    }
  };
  for (const src of Object.values(nativeFigures)) {
    const figure = await fetch(base + src);
    assert.equal(figure.status, 200, src);
    assert.match(figure.headers.get('content-type') || '', /application\/json/, src);
    assert.equal(figure.headers.get('x-content-type-options'), 'nosniff', src);
    const data = await figure.json();
    assert.ok(data.style.width > 0 && data.style.height > 0, src);
    collectNativeAssets(data);
  }
  console.log(`PASS ${Object.keys(nativeFigures).length} native component resources`);
  for (const src of nativeAssets) assert.equal((await fetch(base + src, { method: 'HEAD' })).status, 200, `Native illustration ${src}`);
  console.log(`PASS ${nativeAssets.size} nested native illustration assets`);
  const exportedFigures = JSON.parse(await readFile(new URL('../src/app/goupildigitalecosystem/exported-assets.json', import.meta.url), 'utf8'));
  const visualExports = [
    ...Object.keys(exportedFigures).map(name => `/projects/goupil/exports/${name}.webp`),
    ...['typography-system', 'components-a', 'components-b', 'hero-symbols'].map(name => `/projects/googleplay-ios/exports/${name}.webp`),
    ...['apple', 'tcl', 'heroShapes', 'signage', 'survey', 'bar', 'chick', 'maps', 'constraints', 'persona1', 'persona2', 'persona3', 'flow'].map(name => `/projects/googlemaps-extension/exports/${name}.webp`),
  ];
  for (const src of visualExports) {
    const asset = await fetch(base + src);
    assert.equal(asset.status, 200, src);
    assert.match(asset.headers.get('content-type') || '', /image\/webp/, src);
    assert.ok((await asset.arrayBuffer()).byteLength > 0, src);
  }
  console.log(`PASS ${visualExports.length} original transparent visual exports`);
  const deviceFrame=await fetch(base+'/devices/iphone-18-pro.webp');
  assert.equal(deviceFrame.status,200,'Homepage device frame');
  assert.match(deviceFrame.headers.get('content-type')||'',/image\/webp/);
  assert.ok((await deviceFrame.arrayBuffer()).byteLength>1000,'Non-empty licensed device frame');
  console.log('PASS homepage device frame');
  const write = await fetch(base + '/api/skills/update', {
    method: 'POST', headers: { 'content-type': 'application/json', origin: base }, body: '{}',
  });
  assert.equal(write.status, 503, 'Cloud/production writes must stay disabled');
  assert.match(write.headers.get('cache-control') || '', /no-store/);
  console.log('PASS write protection');
} finally {
  server.kill('SIGTERM');
}
