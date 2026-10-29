import gsap from 'gsap'
import { $, clamp, dbFrac, dbAngle, setArc } from './utils.js'
import { createDevice } from './device.js'
import { content } from './content.js'
import { icon } from './svg.js'

const NEAR = 8 // dB below the threshold where the gauge turns amber
const LCD_STATUS = { ok: 'OK', near: 'OK', alarm: 'ALARM!', silenced: 'SILENCED' }

// A noisy "classroom" sequence: [target dB, seconds]. It rises above the default
// threshold, dips below it (re-arming), then rises again.
const NOISE = [
  [52, 0.9], [64, 0.7], [58, 0.5], [90, 0.9], [104, 0.6], [96, 0.5],
  [62, 1.1], [48, 0.8], [84, 0.7], [100, 0.6], [66, 0.9], [40, 1.1],
]

const ICON_SPEAKER_ON = icon('speaker')

export function initDemo() {
  const root = $('[data-demo]')
  if (!root) return
  const text = content.demo

  const dv = createDevice($('[data-device]', root))
  const gauge = $('[data-gauge]', root)
  const fill = $('[data-g-fill]', root)
  const marker = $('[data-g-marker]', root)
  const value = $('[data-g-value]', root)
  const status = $('[data-demo-status]', root)
  const inThr = $('[data-in-threshold]', root)
  const inNoise = $('[data-in-noise]', root)
  const outThr = $('[data-out-threshold]', root)
  const outNoise = $('[data-out-noise]', root)
  const noiseBtn = $('[data-noise-btn]', root)
  const silenceBtn = $('[data-silence-btn]', root)
  const soundBtn = $('[data-sound-btn]', root)

  let threshold = 70
  let level = 30
  let silenced = false
  let state = ''
  let seq = null

  // ---- Core logic: alarm re-arms only after the level drops to the threshold or below.
  function evaluate() {
    if (level > threshold) return silenced ? 'silenced' : 'alarm'
    silenced = false
    return level >= threshold - NEAR ? 'near' : 'ok'
  }

  function render() {
    const next = evaluate()
    const lv = Math.round(level)

    setArc(fill, dbFrac(level))
    value.textContent = lv
    marker.style.transform = `rotate(${dbAngle(threshold)}deg)`
    outThr.textContent = `${threshold} dB`
    outNoise.textContent = `${lv} dB`
    inThr.style.setProperty('--p', dbFrac(threshold) * 100 + '%')
    inNoise.style.setProperty('--p', dbFrac(level) * 100 + '%')
    inThr.setAttribute('aria-valuetext', `${threshold} decibels`)
    inNoise.setAttribute('aria-valuetext', `${lv} decibels`)

    dv.setKnob(threshold)
    dv.setLCD(`Threshold ${threshold} dB`, LCD_STATUS[next])

    if (next !== state) {
      state = next
      gauge.dataset.state = next
      dv.setState(next)
      status.textContent = text.status[next === 'near' ? 'near' : next]
      silenceBtn.disabled = next !== 'alarm'
      syncBeep()
    }
  }

  // ---- Noise sequence
  const setNoiseLabel = (running) => {
    noiseBtn.textContent = running ? noiseBtn.dataset.labelStop : noiseBtn.dataset.labelStart
    noiseBtn.setAttribute('aria-pressed', String(running))
  }
  function stopNoise() {
    if (seq) seq.kill()
    seq = null
    setNoiseLabel(false)
  }
  function startNoise() {
    stopNoise()
    const o = { v: level }
    seq = gsap.timeline({ onComplete: stopNoise })
    NOISE.forEach(([v, d]) =>
      seq.to(o, {
        v,
        duration: d,
        ease: 'sine.inOut',
        onUpdate() {
          level = o.v
          inNoise.value = String(Math.round(level))
          render()
        },
      }),
    )
    setNoiseLabel(true)
  }

  noiseBtn.addEventListener('click', () => (seq ? stopNoise() : startNoise()))
  inNoise.addEventListener('input', () => {
    stopNoise()
    level = Number(inNoise.value)
    render()
  })
  inThr.addEventListener('input', () => {
    threshold = Number(inThr.value)
    render()
  })
  silenceBtn.addEventListener('click', () => {
    if (state !== 'alarm') return
    silenced = true
    dv.pressSilence()
    render()
  })

  // ---- Optional alarm beep. Off by default; only created after a click.
  let audio = null
  let soundOn = false
  let beepTimer = null

  function beep() {
    const t = audio.currentTime
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
    osc.connect(gain).connect(audio.destination)
    osc.start(t)
    osc.stop(t + 0.22)
  }
  function syncBeep() {
    const want = soundOn && state === 'alarm' && !document.hidden
    if (want && !beepTimer) {
      beep()
      beepTimer = setInterval(beep, 480)
    } else if (!want && beepTimer) {
      clearInterval(beepTimer)
      beepTimer = null
    }
  }
  const iconWrap = $('[data-sound-icon]', soundBtn)
  const iconOff = iconWrap.innerHTML
  soundBtn.addEventListener('click', async () => {
    soundOn = !soundOn
    if (soundOn) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) {
        soundOn = false
        return
      }
      audio = audio || new AC()
      await audio.resume()
    }
    soundBtn.setAttribute('aria-pressed', String(soundOn))
    $('[data-sound-label]', soundBtn).textContent = soundOn ? soundBtn.dataset.on : soundBtn.dataset.off
    iconWrap.innerHTML = soundOn ? ICON_SPEAKER_ON : iconOff
    syncBeep()
  })
  document.addEventListener('visibilitychange', syncBeep)

  inThr.value = String(clamp(threshold, 30, 110))
  render()
}
