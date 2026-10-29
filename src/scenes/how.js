import gsap from 'gsap'
import { $, $$, MOTION, REDUCE, setArc } from '../utils.js'
import { createDevice } from '../device.js'
import { content } from '../content.js'

// Scene positions for the two orientations of the illustration.
const LAYOUT = {
  wide: {
    vb: '10 96 1140 336',
    laptop: 'translate(120 130)',
    device: 'translate(690 100)',
    cable: 'M546 368C640 368 620 290 708 290',
    a: 'translate(546 368)',
    b: 'translate(708 290)',
  },
  tall: {
    vb: '0 0 400 600',
    laptop: 'translate(70 20) scale(.75)',
    device: 'translate(20 330) scale(.8)',
    cable: 'M228 208C228 280 196 270 196 342',
    a: 'translate(228 208) rotate(90)',
    b: 'translate(196 342) rotate(90)',
  },
}

const DB_START = 32
const DB_END = 78

export function initHow(mm) {
  mm.add(
    {
      motion: MOTION,
      reduce: REDUCE,
      wide: '(min-width: 1000px)',
      short: '(max-height: 520px)',
      small: '(max-width: 759px)',
    },
    (ctx) => {
      const { reduce, wide, short, small } = ctx.conditions
      const section = $('.hiw')
      const stage = $('[data-hiw]', section)
      const scene = $('[data-scene]', section)
      const L = wide ? LAYOUT.wide : LAYOUT.tall

      // ---- Layout
      scene.setAttribute('viewBox', L.vb)
      $('[data-s-laptop]', scene).setAttribute('transform', L.laptop)
      $('[data-s-device]', scene).setAttribute('transform', L.device)
      const cable = $('[data-cable]', scene)
      const lit = $('[data-cable-lit]', scene)
      cable.setAttribute('d', L.cable)
      lit.setAttribute('d', L.cable)
      $('[data-plug-a]', scene).setAttribute('transform', L.a)
      $('[data-plug-b]', scene).setAttribute('transform', L.b)

      const dv = createDevice($('[data-device]', scene))
      const lpFill = $('[data-lp-fill]', scene)
      const lpValue = $('[data-lp-value]', scene)
      const mic = $('[data-mic]', scene)
      const waves = $$('[data-wave]', scene)
      const pulse = $('[data-pulse]', scene)
      const deviceAnim = $('[data-s-device-anim]', scene)
      const laptopAnim = $('[data-s-laptop-anim]', scene)
      const steps = $$('[data-step]', section)
      const dots = $$('[data-dot]', section)
      const trackFill = $('[data-track-fill]', section)
      const cableLen = cable.getTotalLength()
      const [thr] = content.hero.lcd

      const renderGauge = (db) => {
        setArc(lpFill, (db - 30) / 80)
        lpValue.textContent = Math.round(db)
      }
      const renderPulse = (p) => {
        const pt = cable.getPointAtLength(cableLen * p)
        pulse.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
        lit.style.strokeDashoffset = String(100 - p * 100)
      }
      const setAlarm = (on) => {
        dv.setState(on ? 'alarm' : 'ok')
        dv.setLCD(thr, on ? 'ALARM!' : 'OK')
      }
      const setActive = (i) => dots.forEach((d, n) => d.classList.toggle('is-active', n === i))

      // ---- Static version: reduced motion or very short landscape screens
      if (reduce || short) {
        gsap.set(waves, { opacity: 0.55, x: 0 })
        renderGauge(DB_END)
        renderPulse(1)
        pulse.setAttribute('opacity', '0')
        setAlarm(true)
        return () => {
          dv.setLCD(thr, 'OK')
          dv.setState('ok')
        }
      }

      // ---- Scrubbed, pinned version
      section.classList.add('is-scrub')
      renderGauge(DB_START)
      renderPulse(0)
      setAlarm(false)
      setActive(0)

      const state = { db: DB_START, pulse: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: small ? '+=300%' : '+=400%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          refreshPriority: 99,
          onUpdate(self) {
            // Discrete UI is derived from progress, so it is always right in both directions.
            const t = self.progress * tl.duration()
            setActive(Math.min(3, Math.floor(t)))
            mic.style.fill = t > 0.7 ? 'var(--accent)' : ''
            setAlarm(t >= 3.2)
          },
        },
      })

      // 1 Listen: sound waves arrive at the laptop
      waves.forEach((w, j) => {
        tl.fromTo(w, { x: -50, opacity: 0 }, { x: -6, opacity: 1, duration: 0.3 }, j * 0.16).to(
          w,
          { x: 30, opacity: 0.3, duration: 0.4 },
          j * 0.16 + 0.3,
        )
      })

      // 2 Measure: the gauge fills
      tl.to(state, { db: DB_END, duration: 1, onUpdate: () => renderGauge(state.db) }, 1)
      tl.to(waves, { opacity: 0.55, duration: 0.5, stagger: 0.05 }, 1)

      // 3 Send: a pulse travels along the cable
      tl.fromTo(pulse, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 2)
      tl.to(state, { pulse: 1, duration: 1, onUpdate: () => renderPulse(state.pulse) }, 2)
      tl.to(pulse, { opacity: 0, duration: 0.08 }, 2.92)

      // 4 React: attention moves to the unit
      tl.to(laptopAnim, { opacity: 0.45, duration: 0.5 }, 3)
      tl.fromTo(deviceAnim, { scale: 1 }, { scale: 1.04, svgOrigin: '220 160', duration: 0.5 }, 3)
      tl.to({}, { duration: 1 }, 3) // pad the timeline to exactly 4 units

      // Step copy cross-fades; the side progress line fills.
      steps.forEach((li, i) => {
        if (i > 0) tl.fromTo(li, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.2 }, i + 0.05)
        if (i < steps.length - 1) tl.to(li, { opacity: 0, y: -24, duration: 0.16 }, i + 0.82)
      })
      tl.to(trackFill, { scaleY: 1, duration: 3 }, 0)

      return () => {
        section.classList.remove('is-scrub')
        pulse.setAttribute('opacity', '0')
        dv.setLCD(thr, 'OK')
        dv.setState('ok')
        mic.style.fill = ''
      }
    },
  )
}
