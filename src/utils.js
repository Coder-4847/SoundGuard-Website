export const $ = (sel, root = document) => root.querySelector(sel)
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export const MOTION = '(prefers-reduced-motion: no-preference)'
export const REDUCE = '(prefers-reduced-motion: reduce)'

// 30..110 dB maps onto a -135..135 degree sweep
export const dbFrac = (db) => clamp((db - 30) / 80, 0, 1)
export const dbAngle = (db) => -135 + 270 * dbFrac(db)

// Gauge arcs use pathLength=100 with a "100 100" dash pattern.
export function setArc(el, frac) {
  const f = clamp(frac, 0, 1)
  el.style.strokeDashoffset = String(100 - f * 100)
  el.style.opacity = f < 0.01 ? '0' : '1'
}
