// Inline SVG builders. Pure string functions so they run both in the Vite
// build (static HTML) and in the browser.

const rad = (d) => (d * Math.PI) / 180
const f = (n) => Math.round(n * 100) / 100

// ---- Icons: one stroke weight, 24px grid ------------------------------------
const ICONS = {
  gauge: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/><circle cx="12" cy="17" r="1"/>',
  sliders:
    '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
  mute: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
  display: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M7 10.5h6M7 14h3.5"/>',
  tune: '<path d="M3 12h3l2-5 4 10 3-8 2 3h4"/>',
  class: '<path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M10 20v-5h4v5"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M16.5 14.2A5 5 0 0 1 21 19"/>',
  laptop: '<rect x="5" y="5" width="14" height="10" rx="1.8"/><path d="M2.5 19h19"/>',
  usb: '<path d="M12 3v14"/><circle cx="12" cy="19" r="2"/><path d="M12 9l-4-2v3M12 12l4-2V8"/>',
  port: '<rect x="4" y="8" width="16" height="8" rx="2"/><path d="M8 12h8"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
  arrow: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  speaker: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  speakerOff: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l4.5 5M20.5 9.5l-4.5 5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
}

export const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ''}</svg>`

export const checkIcon = () =>
  `<svg class="icon check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle class="check-ring" cx="12" cy="12" r="10.5" stroke-width="1.2"/><path class="check-mark" pathLength="1" d="M7 12.5l3.4 3.4L17 9"/></svg>`

export const logoMark = () =>
  `<svg class="logo-mark" viewBox="0 0 32 32" fill="none" stroke="#3DD9C5" stroke-width="2.6" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M5 13v6M10.5 8.5v15M16 4v24M21.5 9.5v13M27 13v6"/></svg>`

// ---- Gauge geometry -----------------------------------------------------------
// 270 degree arc, opening at the bottom. pathLength=100 so dash maths is a percentage.
export function arcPath(cx, cy, r) {
  const a0 = rad(135)
  const a1 = rad(405)
  const x0 = cx + r * Math.cos(a0)
  const y0 = cy + r * Math.sin(a0)
  const x1 = cx + r * Math.cos(a1)
  const y1 = cy + r * Math.sin(a1)
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 1 1 ${f(x1)} ${f(y1)}`
}

// Radial gauge used in the live demo.
export function gaugeSVG() {
  const cx = 150
  const cy = 150
  const r = 116
  const label = (db, ang, rr) => {
    const a = rad(ang)
    return `<text class="g-tick" x="${f(cx + rr * Math.cos(a))}" y="${f(cy + rr * Math.sin(a))}" text-anchor="middle" dominant-baseline="middle">${db}</text>`
  }
  return `<svg class="gauge" viewBox="0 0 300 300" role="img" aria-label="Radial decibel gauge" data-gauge>
  <path class="g-track" d="${arcPath(cx, cy, r)}" pathLength="100"/>
  <path class="g-fill" data-g-fill d="${arcPath(cx, cy, r)}" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100"/>
  <g class="g-marker" data-g-marker><line x1="150" y1="${cy - r - 15}" x2="150" y2="${cy - r + 15}"/></g>
  ${label(30, 135, 142)}${label(70, 270, 142)}${label(110, 405, 142)}
  <text class="g-value" data-g-value x="150" y="156" text-anchor="middle">30</text>
  <text class="g-unit" x="150" y="190" text-anchor="middle">dB</text>
</svg>`
}

// ---- The SoundGuard unit --------------------------------------------------------
// Front-facing illustration. State is driven by classes on the root
// (is-ok / is-near / is-alarm / is-silenced) and by data hooks.
export function deviceSVG({ lcd = ['Threshold 70 dB', 'OK'], cls = '', label = 'The SoundGuard unit' } = {}) {
  const leds = [64, 96, 128]
    .map(
      (x, i) =>
        `<g class="dv-led-g dv-led-${i}"><circle class="dv-halo" cx="${x}" cy="172" r="17"/><circle class="dv-led" cx="${x}" cy="172" r="9"/><circle class="dv-led-on" cx="${x}" cy="172" r="9"/></g>`,
    )
    .join('')
  const slits = [68, 80, 92, 104, 116]
    .map((y) => `<line x1="324" y1="${y}" x2="380" y2="${y}"/>`)
    .join('')
  const arcs = [
    'M384.1 53.7A50 50 0 0 1 384.1 130.3',
    'M390.6 46A60 60 0 0 1 390.6 138',
    'M397 38.4A70 70 0 0 1 397 145.6',
  ]
    .map((d) => `<path class="dv-arc" d="${d}"/>`)
    .join('')
  return `<svg class="device is-ok ${cls}" viewBox="0 0 440 320" role="img" aria-label="${label}" data-device>
  <rect class="dv-body" x="20" y="20" width="400" height="280" rx="36"/>
  <rect class="dv-bezel" x="40" y="40" width="236" height="96" rx="14"/>
  <rect class="dv-lcd" x="48" y="48" width="220" height="80" rx="8"/>
  <text class="dv-text" data-l1 x="60" y="82">${lcd[0]}</text>
  <text class="dv-text dv-status" data-l2 x="60" y="112">${lcd[1]}</text>
  <g class="dv-buzzer"><circle cx="352" cy="92" r="38"/>${slits}</g>
  <g class="dv-arcs">${arcs}</g>
  ${leds}
  <g class="dv-ir"><rect x="324" y="162" width="56" height="20" rx="10"/><text x="352" y="176" text-anchor="middle">IR</text></g>
  <g class="dv-knob" data-knob><circle class="dv-knob-ring" cx="92" cy="236" r="34"/><circle class="dv-knob-cap" cx="92" cy="236" r="26"/><g class="dv-knob-turn" data-knob-turn><line x1="92" y1="236" x2="92" y2="215"/></g></g>
  <g class="dv-btn" data-btn-power><circle cx="204" cy="236" r="18"/><path d="M198.5 231.5a8 8 0 1 0 11 0M204 228v7"/></g>
  <g class="dv-btn" data-btn-silence><circle cx="274" cy="236" r="18"/><path d="M267.5 238.5v-5h3l4.5-3.5v12l-4.5-3.5zM278 232l4 5m0-5l-4 5"/></g>
  <g class="dv-labels"><text x="92" y="288" text-anchor="middle">THRESHOLD</text><text x="204" y="288" text-anchor="middle">POWER</text><text x="274" y="288" text-anchor="middle">SILENCE</text></g>
</svg>`
}

// ---- Laptop with the web app on screen ------------------------------------------
export function laptopSVG() {
  return `<svg class="laptop" viewBox="0 0 420 252" width="420" height="252" aria-hidden="true" focusable="false">
  <rect class="lp-lid" x="40" y="0" width="340" height="226" rx="18"/>
  <rect class="lp-screen" x="54" y="14" width="312" height="198" rx="8"/>
  <circle class="lp-cam" data-mic cx="210" cy="7" r="2.6"/>
  <text class="lp-title" x="70" y="38">SoundGuard</text>
  <path class="g-track" d="${arcPath(210, 128, 62)}" pathLength="100"/>
  <path class="g-fill" data-lp-fill d="${arcPath(210, 128, 62)}" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100"/>
  <text class="lp-value" data-lp-value x="210" y="134" text-anchor="middle">32</text>
  <text class="lp-unit" x="210" y="156" text-anchor="middle">dB</text>
  <path class="lp-base" d="M0 232H420V238a14 14 0 0 1-14 14H14A14 14 0 0 1 0 238z"/>
  <rect class="lp-notch" x="170" y="232" width="80" height="6" rx="3"/>
</svg>`
}

// ---- Infrared remote -----------------------------------------------------------
export function remoteSVG() {
  const btn = (n, y) =>
    `<g class="rm-btn" data-rm="${n}"><circle cx="55" cy="${y}" r="21"/><text x="55" y="${y + 1}" text-anchor="middle" dominant-baseline="middle">${n}</text></g>`
  return `<svg class="remote" viewBox="0 0 110 300" role="img" aria-label="Infrared remote with buttons 1, 2, 3 and 0" data-remote>
  <rect class="rm-body" x="3" y="3" width="104" height="294" rx="30"/>
  <rect class="rm-ir" x="35" y="18" width="40" height="9" rx="4.5"/>
  ${btn(1, 76)}${btn(2, 130)}${btn(3, 184)}
  <line class="rm-sep" x1="30" y1="222" x2="80" y2="222"/>
  ${btn(0, 262)}
</svg>`
}

// ---- Big dial for the Control scene ---------------------------------------------
export function dialSVG() {
  const cx = 150
  const cy = 150
  let ticks = ''
  for (let i = 0; i <= 16; i++) {
    const a = rad(135 + (270 * i) / 16)
    const major = i % 2 === 0
    const r1 = major ? 112 : 117
    const r2 = 124
    ticks += `<line class="dl-tick${major ? ' major' : ''}" x1="${f(cx + r1 * Math.cos(a))}" y1="${f(cy + r1 * Math.sin(a))}" x2="${f(cx + r2 * Math.cos(a))}" y2="${f(cy + r2 * Math.sin(a))}"/>`
  }
  const lab = (t, ang) => {
    const a = rad(ang)
    return `<text class="g-tick" x="${f(cx + 138 * Math.cos(a))}" y="${f(cy + 138 * Math.sin(a) + 2)}" text-anchor="middle" dominant-baseline="middle">${t}</text>`
  }
  return `<svg class="dial" viewBox="0 0 300 300" role="img" aria-label="Threshold knob, turning from 30 to 110 decibels" data-dial>
  ${ticks}${lab(30, 135)}${lab(110, 405)}
  <path class="g-track" d="${arcPath(cx, cy, 124)}" pathLength="100" opacity="0"/>
  <circle class="dl-body" cx="150" cy="150" r="88"/>
  <circle class="dl-cap" cx="150" cy="150" r="70"/>
  <g class="dl-turn" data-dial-turn><line x1="150" y1="86" x2="150" y2="104"/></g>
</svg>`
}

// ---- Speaker waves rings behind the hero device ----------------------------------
export const ringsHTML = () =>
  `<div class="rings" aria-hidden="true"><span></span><span></span><span></span></div>`
