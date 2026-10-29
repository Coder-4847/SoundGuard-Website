import gsap from 'gsap'
import { $, $$, MOTION, REDUCE } from '../utils.js'
import { content } from '../content.js'

export function initPrice(mm) {
  mm.add({ motion: MOTION, reduce: REDUCE }, (ctx) => {
    const { reduce } = ctx.conditions
    const num = $('[data-count]')
    const marks = $$('.check-mark')
    const once = (trigger, start) => ({ trigger, start, once: true })

    if (reduce) {
      gsap.set(marks, { strokeDashoffset: 0 })
      return
    }

    // Count up to the price when the section enters.
    const counter = { v: 0 }
    num.textContent = '0'
    gsap.to(counter, {
      v: content.price,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => (num.textContent = String(Math.round(counter.v))),
      scrollTrigger: once('[data-price]', 'top 75%'),
    })

    // Included items: check marks draw in one by one.
    gsap.to(marks, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.14,
      scrollTrigger: once('[data-checks]', 'top 78%'),
    })

    return () => (num.textContent = String(content.price))
  })
}
