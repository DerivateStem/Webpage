import test from 'node:test';
import assert from 'node:assert/strict';
import { EF_DEADLINES, remainingTime, updateCountdown } from './ef-countdown.js';

const deadline = EF_DEADLINES.registration;
const end = Date.parse(deadline);

test('the Lima deadline is the same instant for visitors in any time zone', () => {
  assert.equal(end, Date.parse('2026-12-18T04:59:00Z'));
  assert.deepEqual(remainingTime(deadline, Date.parse('2026-12-17T18:59:00-10:00')),
    remainingTime(deadline, Date.parse('2026-12-18T13:59:00+09:00')));
  assert.equal(EF_DEADLINES.abstracts, deadline);
});

test('days, hours and minutes roll over without negative values', () => {
  assert.deepEqual(remainingTime(deadline, end - 90061000), { closed: false, days: 1, hours: 1, minutes: 1, seconds: 1 });
  assert.deepEqual(remainingTime(deadline, end - 86400000), { closed: false, days: 1, hours: 0, minutes: 0, seconds: 0 });
  assert.deepEqual(remainingTime(deadline, end - 1000), { closed: false, days: 0, hours: 0, minutes: 0, seconds: 1 });
  assert.equal(remainingTime(deadline, end - 1).seconds, 1);
});

test('the exact deadline and later dates show a closed, zeroed timer', () => {
  const closed = { closed: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  assert.deepEqual(remainingTime(deadline, end), closed);
  assert.deepEqual(remainingTime(deadline, end + 864000000), closed);
});

test('returning after sleep recalculates the actual remaining time', () => {
  assert.equal(remainingTime(deadline, end - 7200000).hours, 2);
  assert.equal(remainingTime(deadline, end - 60000).minutes, 1);
  assert.equal(remainingTime(deadline, end + 1).closed, true);
});

test('invalid dates do not produce a misleading timer', () => {
  assert.equal(remainingTime('not a date', end), null);
  assert.equal(remainingTime(deadline, NaN), null);
});

test('closing a countdown changes its status, message and action destination', () => {
  const units = Object.fromEntries(['days', 'hours', 'minutes', 'seconds'].map(unit => [unit, { textContent: '' }]));
  const clock = { hidden: true, querySelector: selector => units[selector.match(/data-unit="(.*?)"/)[1]] };
  const status = { textContent: '' };
  const caption = { textContent: '' };
  const action = { textContent: '' };
  const link = { href: '', querySelector: () => action };
  const nodes = { '[data-countdown-clock]': clock, '[data-countdown-status]': status, '[data-countdown-caption]': caption, '[data-countdown-link]': link };
  let isClosed = false;
  const card = {
    dataset: { efCountdown: 'registration', openLabel: 'Inscripciones abiertas', closedLabel: 'Inscripciones cerradas', actionLabel: 'Inscribirme gratis', openHref: 'https://lppc-indico.fas.harvard.edu/event/36/registrations/', closedHref: 'https://lppc-indico.fas.harvard.edu/event/36/' },
    querySelector: selector => nodes[selector],
    classList: { toggle: (_, closed) => { isClosed = closed; } },
  };
  updateCountdown(card, end - 1000);
  assert.equal(status.textContent, 'Inscripciones abiertas');
  assert.equal(link.href, card.dataset.openHref);
  assert.equal(action.textContent, 'Inscribirme gratis');
  assert.equal(clock.hidden, false);
  updateCountdown(card, end);
  assert.equal(isClosed, true);
  assert.equal(status.textContent, 'Inscripciones cerradas');
  assert.equal(action.textContent, 'Consultar en Indico');
  assert.equal(link.href, card.dataset.closedHref);
  assert.equal(caption.textContent, 'El plazo ha finalizado');
  assert.ok(Object.values(units).every(unit => unit.textContent === '00'));
});
