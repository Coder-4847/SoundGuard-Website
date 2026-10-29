import { dbAngle } from './utils.js'

const STATES = ['ok', 'near', 'alarm', 'silenced']

// Thin controller around one device illustration (see deviceSVG in svg.js).
export function createDevice(svg) {
  const l1 = svg.querySelector('[data-l1]')
  const l2 = svg.querySelector('[data-l2]')
  const turn = svg.querySelector('[data-knob-turn]')
  const silenceBtn = svg.querySelector('[data-btn-silence]')
  let state = 'ok'

  return {
    el: svg,
    get state() {
      return state
    },
    setLCD(a, b) {
      l1.textContent = a
      l2.textContent = b
    },
    setState(next) {
      if (next === state) return
      state = next
      STATES.forEach((s) => svg.classList.toggle('is-' + s, s === next))
    },
    setKnob(db) {
      turn.style.transform = `rotate(${dbAngle(db)}deg)`
    },
    pressSilence() {
      silenceBtn.classList.add('is-pressed')
      setTimeout(() => silenceBtn.classList.remove('is-pressed'), 180)
    },
  }
}
