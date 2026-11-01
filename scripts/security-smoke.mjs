import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

// Exercise the compiled app, not just configuration text. No external traffic.
const port = 5011;
const base = `http://127.0.0.1:${port}`;
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
  for (const path of ['/', '/articles', '/skills', '/projects', '/contact', '/llms.txt', '/sitemap.xml']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff', path);
    assert.equal(response.headers.get('x-frame-options'), 'DENY', path);
    assert.match(response.headers.get('content-security-policy') || '', /object-src 'none'/, path);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/, `Preview ${path}`);
    const body = await response.text();
    if (path === '/articles') assert.match(body, /href="https:\/\/medium.com\/@romainrubens\//);
    if (path === '/llms.txt') {
      for (const section of ['## Projets', '## Compétences', '## Contact', '## Articles']) assert.ok(body.includes(section), section);
    }
    console.log(`PASS ${path}`);
  }
  const write = await fetch(base + '/api/skills/update', {
    method: 'POST', headers: { 'content-type': 'application/json', origin: base }, body: '{}',
  });
  assert.equal(write.status, 503, 'Cloud/production writes must stay disabled');
  assert.match(write.headers.get('cache-control') || '', /no-store/);
  console.log('PASS write protection');
} finally {
  server.kill('SIGTERM');
}
