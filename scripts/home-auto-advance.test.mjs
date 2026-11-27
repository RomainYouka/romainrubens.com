import assert from 'node:assert/strict';
import { setupHomeAutoAdvance } from '../src/lib/home-auto-advance.ts';

function fixture({ scrollY = 0, hidden = false, reduced = false } = {}) {
  const win = new EventTarget();
  const document = Object.assign(new EventTarget(), { hidden });
  const preference = Object.assign(new EventTarget(), { matches: reduced });
  let now = 0, id = 0, departures = 0;
  const timers = new Map();
  Object.assign(win, { document, scrollY, matchMedia: () => preference,
    setTimeout: (callback, delay) => { const key = ++id; timers.set(key, { callback, at: now + delay }); return key; },
    clearTimeout: key => timers.delete(key),
  });
  const controller = setupHomeAutoAdvance(() => departures++, win);
  const tick = milliseconds => {
    const end = now + milliseconds;
    for (const [key, timer] of timers) if (timer.at <= end) { now = timer.at; timers.delete(key); timer.callback(); }
    now = end;
  };
  return { win, document, preference, controller, tick, departures: () => departures };
}

const idle = fixture();
idle.controller.ready(); idle.controller.ready(); idle.tick(999);
assert.equal(idle.departures(), 0);
idle.tick(1); assert.equal(idle.departures(), 1);
idle.controller.ready(); idle.tick(10000); assert.equal(idle.departures(), 1);
idle.controller.dispose();

for (const event of ['wheel', 'touchmove', 'pointerdown', 'lenis-scroll-to-top', 'scroll', 'keydown']) {
  for (const beforeReady of [true, false]) {
    const f = fixture();
    if (!beforeReady) f.controller.ready();
    if (event === 'scroll') f.win.scrollY = 20;
    const input = new Event(event);
    if (event === 'keydown') Object.defineProperty(input, 'key', { value: 'ArrowDown' });
    f.win.dispatchEvent(input);
    if (beforeReady) f.controller.ready();
    f.tick(10000); assert.equal(f.departures(), 0, `${event}, beforeReady=${beforeReady}`);
    f.controller.dispose();
  }
}
for (const settings of [{ scrollY: 50 }, { hidden: true }, { reduced: true }]) {
  const f = fixture(settings); f.controller.ready(); f.tick(10000); assert.equal(f.departures(), 0); f.controller.dispose();
}
const hidden = fixture(); hidden.controller.ready(); hidden.document.hidden = true;
hidden.document.dispatchEvent(new Event('visibilitychange')); hidden.tick(5000); assert.equal(hidden.departures(), 0); hidden.controller.dispose();
const disposed = fixture(); disposed.controller.ready(); disposed.controller.dispose(); disposed.tick(5000); assert.equal(disposed.departures(), 0);
console.log('PASS 1s delay, single departure, manual-input cancellation, restored scroll, hidden tab, reduced motion and cleanup');
