// Deadlines checked against the official Indico on 17 November 2026.
// Keep the explicit Lima offset: visitors may be in a different time zone.
export const EF_DEADLINES = Object.freeze({
  registration: '2026-12-17T23:59:00-05:00',
  abstracts: '2026-12-17T23:59:00-05:00',
});

export function remainingTime(deadline, now = Date.now()) {
  const end = Date.parse(deadline);
  if (!Number.isFinite(end) || !Number.isFinite(now)) return null;
  const total = Math.max(0, Math.ceil((end - now) / 1000));
  return {
    closed: now >= end,
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
  };
}

export function updateCountdown(card, now = Date.now()) {
  const key = card.dataset.efCountdown;
  const remaining = remainingTime(EF_DEADLINES[key], now);
  if (!remaining) return;

  const clock = card.querySelector('[data-countdown-clock]');
  clock.hidden = false;
  for (const unit of ['days', 'hours', 'minutes', 'seconds']) {
    const node = clock.querySelector(`[data-unit="${unit}"]`);
    const value = String(remaining[unit]).padStart(2, '0');
    if (node.textContent !== value) node.textContent = value;
  }

  const closed = remaining.closed;
  card.classList.toggle('is-closed', closed);
  const status = card.querySelector('[data-countdown-status]');
  const label = closed ? card.dataset.closedLabel : card.dataset.openLabel;
  if (status.textContent !== label) status.textContent = label;

  const link = card.querySelector('[data-countdown-link]');
  const action = link.querySelector('[data-countdown-action]');
  action.textContent = closed ? 'Consultar en Indico' : card.dataset.actionLabel;
  link.href = closed ? card.dataset.closedHref : card.dataset.openHref;
  const caption = card.querySelector('[data-countdown-caption]');
  caption.textContent = closed ? 'El plazo ha finalizado' : 'Tiempo restante';
  return remaining;
}

function startCountdowns() {
  const cards = [...document.querySelectorAll('[data-ef-countdown]')];
  if (!cards.length) return;
  let interval;

  function update() {
    const now = Date.now();
    for (const card of cards) updateCountdown(card, now);
    for (const node of document.querySelectorAll('[data-ef-status]')) {
      const remaining = remainingTime(EF_DEADLINES[node.dataset.efStatus], now);
      if (remaining) node.textContent = remaining.closed ? node.dataset.closedLabel : node.dataset.openLabel;
    }
    const allClosed = Object.values(EF_DEADLINES).every(deadline => now >= Date.parse(deadline));
    if (allClosed && interval) { clearInterval(interval); interval = undefined; }
    return allClosed;
  }

  function resume() {
    if (interval) clearInterval(interval);
    interval = undefined;
    if (!update() && !document.hidden) interval = setInterval(update, 1000);
  }

  // Recalculate from the clock after sleep or returning to the tab; never drift.
  document.addEventListener('visibilitychange', resume);
  window.addEventListener('pageshow', resume);
  resume();
}

if (typeof document !== 'undefined') startCountdowns();
