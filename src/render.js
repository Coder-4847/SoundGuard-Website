// Builds the page markup from src/content.js at build / dev-server time.
// The result is static HTML, so every word is in the DOM before any JS runs.

import {
  icon,
  checkIcon,
  logoMark,
  gaugeSVG,
  deviceSVG,
  laptopSVG,
  remoteSVG,
  dialSVG,
  ringsHTML,
} from './svg.js'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// "Nobody can fix a level they can’t *see*." -> accent word
const accent = (s) => esc(s).replace(/\*(.+?)\*/g, '<em class="accent">$1</em>')

const head = (c, { id, eyebrow, title, center = false }) => `
  <div class="section-head${center ? ' is-center' : ''}">
    <p class="eyebrow" data-reveal>${esc(eyebrow)}</p>
    <h2 class="h2" id="${id}" data-lines>${esc(title)}</h2>
  </div>`

// ---- Navigation ---------------------------------------------------------------
function nav(c) {
  const links = c.nav.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')
  return `
<header class="nav" data-nav>
  <div class="nav-inner">
    <a class="brand" href="#top" aria-label="${esc(c.brand)}, back to top">${logoMark()}<span>${esc(c.brand)}</span></a>
    <nav class="nav-links" id="nav-menu" aria-label="Primary" data-nav-menu>
      <ul>${links}</ul>
    </nav>
    <a class="btn btn-primary btn-sm nav-cta" href="${esc(c.contactHref)}">${esc(c.cta)}</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu" data-nav-toggle>
      <span class="when-closed">${icon('menu')}</span><span class="when-open">${icon('close')}</span>
    </button>
  </div>
</header>`
}

// ---- Hero -----------------------------------------------------------------------
function hero(c) {
  const h = c.hero
  return `
<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero-glow" aria-hidden="true"></div>
  <div class="hero-copy">
    <h1 class="h1" id="hero-title" data-lines>${esc(h.headline)}</h1>
    <p class="lead" data-hero-sub>${esc(h.sub)}</p>
    <div class="hero-actions" data-hero-sub>
      <a class="btn btn-primary" href="${esc(c.contactHref)}">${esc(c.cta)}</a>
      <a class="btn btn-ghost" href="#how">${esc(h.secondary)}</a>
    </div>
  </div>
  <div class="hero-device" data-hero-device>
    ${ringsHTML()}
    <div class="hero-device-inner" data-hero-device-inner>${deviceSVG({ lcd: h.lcd, cls: 'device-hero' })}</div>
  </div>
  <a class="scroll-cue" href="#problem" aria-label="${esc(h.scroll)} to the next section" data-scroll-cue>
    <span>${esc(h.scroll)}</span><i aria-hidden="true"></i>
  </a>
</section>`
}

// ---- Problem --------------------------------------------------------------------
function problem(c) {
  const p = c.problem
  return `
<section class="problem" id="problem" aria-labelledby="problem-title">
  <div class="problem-stage" data-problem>
    <h2 class="eyebrow" id="problem-title">${esc(p.eyebrow)}</h2>
    <div class="problem-lines">
      ${p.lines.map((l) => `<p class="problem-line" data-problem-line>${accent(l)}</p>`).join('')}
    </div>
  </div>
</section>`
}

// ---- How it works ---------------------------------------------------------------
function scene() {
  const waves = [0, 1, 2]
    .map((i) => `<path class="sc-wave" data-wave d="M0 0A90 90 0 0 1 0 120" transform="translate(${-85 + i * 30} 0)"/>`)
    .join('')
  return `
<svg class="scene" viewBox="10 96 1140 336" role="img" aria-label="A laptop with the SoundGuard web app, connected by a USB cable to the SoundGuard unit" data-scene>
  <g data-s-laptop transform="translate(120 130)">
    <g data-s-laptop-anim>
      <g transform="translate(0 53)" data-waves>${waves}</g>
      ${laptopSVG()}
    </g>
  </g>
  <path class="cable" data-cable d="M546 368C640 368 620 290 708 290"/>
  <path class="cable-lit" data-cable-lit d="M546 368C640 368 620 290 708 290" pathLength="100" stroke-dasharray="100 100" stroke-dashoffset="100"/>
  <g class="plug" data-plug-a transform="translate(546 368)"><rect x="-14" y="-9" width="28" height="18" rx="4"/><rect x="-6" y="-4" width="12" height="8" rx="2"/></g>
  <g class="plug" data-plug-b transform="translate(708 290)"><rect x="-14" y="-9" width="28" height="18" rx="4"/><rect x="-6" y="-4" width="12" height="8" rx="2"/></g>
  <g class="pulse" data-pulse opacity="0"><circle class="pulse-halo" r="18"/><circle class="pulse-dot" r="6"/></g>
  <g data-s-device transform="translate(690 100)">
    <g data-s-device-anim>
      ${deviceSVG({ cls: 'device-scene', label: 'The SoundGuard unit' }).replace('<svg ', '<svg width="440" height="320" style="width:440px;height:320px" ')}
    </g>
  </g>
</svg>`
}

function how(c) {
  const h = c.how
  const steps = h.steps
    .map(
      (s, i) => `
        <li class="hiw-step" data-step>
          <span class="hiw-num">0${i + 1}</span>
          <h3 class="hiw-title">${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </li>`,
    )
    .join('')
  const dots = h.steps
    .map((s, i) => `<li data-dot><span class="dot-n">0${i + 1}</span><span class="dot-t">${esc(s.title)}</span></li>`)
    .join('')
  return `
<section class="hiw" id="how" aria-labelledby="how-title">
  <div class="hiw-stage" data-hiw>
    ${head(c, { id: 'how-title', eyebrow: h.eyebrow, title: h.title })}
    <div class="hiw-visual">${scene()}</div>
    <div class="hiw-foot">
      <ol class="hiw-steps" data-steps>${steps}</ol>
    </div>
    <ol class="hiw-progress" aria-hidden="true" data-progress>
      <li class="hiw-track" aria-hidden="true"><i data-track-fill></i></li>${dots}
    </ol>
  </div>
</section>`
}

// ---- Demo -----------------------------------------------------------------------
function demo(c) {
  const d = c.demo
  return `
<section class="demo section" id="demo" aria-labelledby="demo-title">
  <div class="container">
    ${head(c, { id: 'demo-title', eyebrow: d.eyebrow, title: d.title })}
    <div class="demo-grid" data-demo>
      <div class="card demo-unit" data-reveal>
        ${deviceSVG({ cls: 'device-demo', label: 'Simulated SoundGuard unit' })}
      </div>
      <div class="card demo-panel" data-reveal>
        <div class="demo-gauge">${gaugeSVG()}</div>
        <p class="demo-status" data-demo-status aria-live="polite">${esc(d.status.ok)}</p>
        <div class="demo-controls">
          <div class="field">
            <label for="demo-threshold"><span>${esc(d.thresholdLabel)}</span><output for="demo-threshold" data-out-threshold>70 dB</output></label>
            <input type="range" id="demo-threshold" min="30" max="110" step="1" value="70" data-in-threshold />
          </div>
          <div class="field">
            <label for="demo-noise"><span>${esc(d.noiseLabel)}</span><output for="demo-noise" data-out-noise>30 dB</output></label>
            <input type="range" id="demo-noise" min="30" max="110" step="1" value="30" data-in-noise />
          </div>
          <div class="demo-buttons">
            <button class="btn btn-primary" type="button" data-noise-btn data-label-start="${esc(d.makeNoise)}" data-label-stop="${esc(d.stopNoise)}">${esc(d.makeNoise)}</button>
            <button class="btn btn-ghost" type="button" data-silence-btn disabled>${esc(d.silence)}</button>
            <button class="btn btn-ghost btn-icon" type="button" aria-pressed="false" data-sound-btn data-on="${esc(d.soundOn)}" data-off="${esc(d.soundOff)}">
              <span data-sound-icon>${icon('speakerOff')}</span><span data-sound-label>${esc(d.soundOff)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <p class="caption" data-reveal>${esc(d.caption)}</p>
  </div>
</section>`
}

// ---- Features -------------------------------------------------------------------
function features(c) {
  const f = c.features
  return `
<section class="features section" id="features" aria-labelledby="features-title">
  <div class="container">
    ${head(c, { id: 'features-title', eyebrow: f.eyebrow, title: f.title })}
    <ul class="grid grid-3" data-stagger>
      ${f.items
        .map(
          (i) => `
      <li class="card feature" data-stagger-item>
        <span class="icon-wrap">${icon(i.icon)}</span>
        <h3 class="h3">${esc(i.title)}</h3>
        <p>${esc(i.text)}</p>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>`
}

// ---- Control --------------------------------------------------------------------
function control(c) {
  const k = c.control
  return `
<section class="control" id="control" aria-labelledby="control-title">
  <div class="control-stage" data-control>
    ${head(c, { id: 'control-title', eyebrow: k.eyebrow, title: k.title, center: true })}
    <div class="control-body">
      <div class="control-knob">
        <div class="dial-wrap">${dialSVG()}
          <p class="dial-readout" aria-hidden="true"><span data-control-value>70</span><small>dB</small></p>
        </div>
        <p class="label">${esc(k.knobLabel)}</p>
        <p class="note">${esc(k.knobNote)}</p>
      </div>
      <div class="control-remote">
        ${remoteSVG()}
        <p class="note">${esc(k.remoteNote)}</p>
      </div>
    </div>
  </div>
</section>`
}

// ---- Audience -------------------------------------------------------------------
function audience(c) {
  const a = c.audience
  return `
<section class="audience section" id="audience" aria-labelledby="audience-title">
  <div class="container">
    ${head(c, { id: 'audience-title', eyebrow: a.eyebrow, title: a.title })}
    <ul class="grid grid-3" data-stagger>
      ${a.items
        .map(
          (i) => `
      <li class="card feature" data-stagger-item>
        <span class="icon-wrap">${icon(i.icon)}</span>
        <h3 class="h3">${esc(i.title)}</h3>
        <p>${esc(i.text)}</p>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>`
}

// ---- What you need --------------------------------------------------------------
function need(c) {
  const n = c.need
  return `
<section class="need section" id="need" aria-labelledby="need-title">
  <div class="container">
    ${head(c, { id: 'need-title', eyebrow: n.eyebrow, title: n.title })}
    <p class="lead measure" data-reveal>${esc(n.intro)}</p>
    <ul class="need-list" data-stagger>
      ${n.items
        .map(
          (i) => `
      <li data-stagger-item>
        <span class="icon-wrap">${icon(i.icon)}</span>
        <div><h3 class="h3">${esc(i.title)}</h3><p>${esc(i.text)}</p></div>
      </li>`,
        )
        .join('')}
    </ul>
  </div>
</section>`
}

// ---- Price ----------------------------------------------------------------------
function price(c) {
  const p = c.pricing
  return `
<section class="price section" id="price" aria-labelledby="price-title">
  <div class="container">
    <div class="price-head" data-price>
      <p class="eyebrow" data-reveal>${esc(p.eyebrow)}</p>
      <h2 class="sr-only" id="price-title">${esc(c.currency)} ${esc(c.price)}. ${esc(c.priceNote)}</h2>
      <p class="price-figure" aria-hidden="true"><span class="price-cur">${esc(c.currency)}</span> <span class="price-num" data-count="${esc(c.price)}">${esc(c.price)}</span></p>
      <p class="price-note" data-reveal>${esc(c.priceNote)}</p>
    </div>
    <div class="price-lists">
      <div data-reveal>
        <h3 class="h3">${esc(p.included.title)}</h3>
        <ul class="checks" data-checks>
          ${p.included.items.map((t) => `<li>${checkIcon()}<span>${esc(t)}</span></li>`).join('')}
        </ul>
      </div>
      <div data-reveal>
        <h3 class="h3">${esc(p.also.title)}</h3>
        <ul class="checks is-plain">
          ${p.also.items.map((t) => `<li><span class="bullet" aria-hidden="true"></span><span>${esc(t)}</span></li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="price-cta" data-reveal>
      <a class="btn btn-primary btn-lg" href="${esc(c.contactHref)}">${esc(c.cta)}</a>
    </div>
  </div>
</section>`
}

// ---- FAQ ------------------------------------------------------------------------
function faq(c) {
  const f = c.faq
  return `
<section class="faq section" id="faq" aria-labelledby="faq-title">
  <div class="container narrow">
    ${head(c, { id: 'faq-title', eyebrow: f.eyebrow, title: f.title })}
    <div class="accordion" data-accordion data-reveal>
      ${f.items
        .map(
          (i, n) => `
      <div class="acc-item">
        <h3 class="acc-h"><button class="acc-btn" type="button" aria-expanded="false" aria-controls="faq-p${n}" id="faq-b${n}"><span>${esc(i.q)}</span><i class="acc-plus" aria-hidden="true"></i></button></h3>
        <div class="acc-panel" id="faq-p${n}" role="region" aria-labelledby="faq-b${n}"><div class="acc-inner"><p>${esc(i.a)}</p></div></div>
      </div>`,
        )
        .join('')}
    </div>
  </div>
</section>`
}

// ---- Team -----------------------------------------------------------------------
function team(c, assets) {
  const t = c.team
  const imgs = t.images.filter((i) => assets.includes(i.file))
  return `
<section class="team section" id="team" aria-labelledby="team-title">
  <div class="container">
    ${head(c, { id: 'team-title', eyebrow: t.eyebrow, title: t.title })}
    <div class="story measure">
      ${t.story.map((p) => `<p class="lead" data-reveal>${esc(p)}</p>`).join('')}
    </div>
    ${
      imgs.length
        ? `<div class="frames frames-${imgs.length}" data-stagger>${imgs
            .map(
              (i) =>
                `<figure class="frame" data-stagger-item><img src="assets/${esc(i.file)}" alt="${esc(i.alt)}" loading="lazy" decoding="async"></figure>`,
            )
            .join('')}</div>`
        : ''
    }
    <ul class="members" data-stagger>
      ${t.members
        .map(
          (m) => `
      <li data-stagger-item><p class="member-name">${esc(m.name)}</p><p class="member-role">${esc(m.role)}</p></li>`,
        )
        .join('')}
    </ul>
  </div>
</section>`
}

// ---- Footer ---------------------------------------------------------------------
function footer(c) {
  const f = c.footer
  return `
<footer class="footer" data-footer>
  <div class="container footer-inner">
    <a class="brand" href="#top" aria-label="${esc(c.brand)}, back to top">${logoMark()}<span>${esc(c.brand)}</span></a>
    <p class="footer-line">${esc(f.line)}</p>
    <div class="footer-links">
      <a href="${esc(c.contactHref)}">${esc(f.contact)}</a>
      <a href="#top" class="to-top" data-to-top>${esc(f.top)}${icon('up')}</a>
    </div>
  </div>
</footer>`
}

export function renderBody(c, { assets = [] } = {}) {
  return [
    `<div class="progress" aria-hidden="true"><i data-progress-bar></i></div>`,
    `<a class="skip" href="#main">Skip to content</a>`,
    nav(c),
    `<main id="main">`,
    hero(c),
    problem(c),
    how(c),
    demo(c),
    features(c),
    control(c),
    audience(c),
    need(c),
    price(c),
    faq(c),
    team(c, assets),
    `</main>`,
    footer(c),
  ].join('\n')
}

export const metaFor = (c) => ({
  title: esc(c.site.title),
  description: esc(c.site.description),
  themeColor: esc(c.site.themeColor),
})

