import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { $, $$, MOTION, REDUCE } from '../utils.js'
import { createDevice } from '../device.js'
import { content } from '../content.js'

export function initHero(mm) {
  mm.add({ motion: MOTION, reduce: REDUCE }, (ctx) => {
    const hero = $('.hero')
    const h1 = $('[data-lines]', hero)
    const subs = $$('[data-hero-sub]', hero)
    const copy = $('.hero-copy', hero)
    const deviceWrap = $('[data-hero-device]', hero)
    const deviceInner = $('[data-hero-device-inner]', hero)
    const glow = $('.hero-glow', hero)
    const cue = $('[data-scroll-cue]', hero)
    const dv = createDevice($('[data-device]', hero))
    const [line1, line2] = content.hero.lcd

    if (ctx.conditions.reduce) {
      gsap.set(h1, { visibility: 'visible' })
      gsap.fromTo([subs, deviceInner, cue], { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.1 })
      dv.setLCD(line1, line2)
      return
    }

    dv.setLCD('', '')
    SplitText.create(h1, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'sl',
      autoSplit: true,
      onSplit(self) {
        gsap.set(h1, { visibility: 'visible' })
        return gsap.from(self.lines, { yPercent: 115, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: 0.1 })
      },
    })

    const typing = { n: 0 }
    const total = line1.length + line2.length
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.fromTo(glow, { opacity: 0 }, { opacity: 1, duration: 2.4, ease: 'power2.out' }, 0.2)
      .fromTo(subs, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 }, 0.5)
      .fromTo(deviceInner, { opacity: 0, y: 110, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.8 }, 0.45)
      .fromTo(cue, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 1.8)
      .to(
        typing,
        {
          n: total,
          duration: total * 0.045,
          ease: 'none',
          onUpdate() {
            const n = Math.round(typing.n)
            dv.setLCD(line1.slice(0, n), line2.slice(0, Math.max(0, n - line1.length)))
          },
        },
        1.5,
      )

    // Subtle parallax as the hero scrolls away.
    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(deviceWrap, { y: -50, ease: 'none', scrollTrigger: scrub })
    gsap.to(copy, { y: -80, ease: 'none', scrollTrigger: scrub })
    gsap.to(glow, { y: 120, ease: 'none', scrollTrigger: scrub })
    gsap.to(cue, {
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: '+=160', scrub: true },
    })

    return () => dv.setLCD(line1, line2)
  })
}
