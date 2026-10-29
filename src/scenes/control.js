import gsap from 'gsap'
import { $, $$, MOTION, REDUCE, dbAngle } from '../utils.js'

export function initControl(mm) {
  mm.add({ motion: MOTION, reduce: REDUCE, small: '(max-width: 759px)' }, (ctx) => {
    const { reduce, small } = ctx.conditions
    const stage = $('[data-control]')
    const turn = $('[data-dial-turn]', stage)
    const readout = $('[data-control-value]', stage)
    const knob = $('.dial-wrap', stage)
    const remote = $('[data-remote]', stage)
    const remoteSvg = $('[data-remote]', stage)
    const keys = $$('[data-rm]', stage)

    const render = (db) => {
      turn.style.transform = `rotate(${dbAngle(db)}deg)`
      readout.textContent = Math.round(db)
    }
    const light = (i) => {
      keys.forEach((k) => k.classList.toggle('is-on', Number(k.dataset.rm) === i))
      remoteSvg.classList.toggle('is-sending', i > 0)
    }

    render(70)
    if (reduce) return

    const state = { db: 30 }
    render(30)
    gsap.set(remote, { opacity: 0.3 })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: small ? '+=240%' : '+=320%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        refreshPriority: 98,
        onUpdate(self) {
          // 3 to 4.5: remote keys 1, 2, 3 light up one after another.
          const t = self.progress * tl.duration()
          light(t < 3.2 ? 0 : Math.min(3, Math.floor((t - 3.2) / 0.5) + 1))
        },
      },
    })
    tl.to(state, { db: 110, duration: 2.4, onUpdate: () => render(state.db) }, 0)
    tl.to(state, { db: 70, duration: 0.6, onUpdate: () => render(state.db) }, 2.4)
    tl.to(knob, { opacity: 0.3, duration: 0.3 }, 3)
    tl.to(remote, { opacity: 1, duration: 0.3 }, 3)
    tl.to({}, { duration: 1.6 }, 3.2)

    return () => {
      render(70)
      light(0)
    }
  })
}
