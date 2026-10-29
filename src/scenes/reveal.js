import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { $$, MOTION, REDUCE } from '../utils.js'

// Generic reveal-on-enter for headlines (line by line through a mask),
// single elements and staggered groups. Everything is created last so the
// pinned scenes above have already inserted their spacers.
export function initReveals(mm) {
  mm.add({ motion: MOTION, reduce: REDUCE }, (ctx) => {
    const { reduce } = ctx.conditions
    const trigger = (el, start = 'top 88%') => ({ trigger: el, start, once: true })

    // Headlines are split just before they approach the viewport, which keeps
    // start-up work small.
    const splitNow = (el) =>
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'sl',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' })
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: trigger(el),
          })
        },
      })

    const headings = $$('[data-lines]').filter((el) => !el.closest('.hero'))
    let io
    if (reduce) {
      headings.forEach((el) => {
        gsap.set(el, { visibility: 'visible', opacity: 0 })
        gsap.to(el, { opacity: 1, duration: 0.6, scrollTrigger: trigger(el) })
      })
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            io.unobserve(e.target)
            splitNow(e.target)
          }),
        { rootMargin: '0px 0px 150% 0px' },
      )
      headings.forEach((el) => io.observe(el))
    }

    $$('[data-reveal]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: reduce ? 0 : 28 },
        { opacity: 1, y: 0, duration: reduce ? 0.6 : 1.1, ease: 'power3.out', scrollTrigger: trigger(el, 'top 90%') },
      )
    })

    $$('[data-stagger]').forEach((group) => {
      const items = $$('[data-stagger-item]', group)
      gsap.fromTo(
        items,
        { opacity: 0, y: reduce ? 0 : 44 },
        {
          opacity: 1,
          y: 0,
          duration: reduce ? 0.6 : 1.1,
          ease: 'power3.out',
          stagger: reduce ? 0 : 0.09,
          scrollTrigger: trigger(group, 'top 84%'),
        },
      )
    })

    const footer = document.querySelector('.footer-inner')
    if (footer) {
      gsap.to(footer, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 98%', once: true },
      })
    }

    return () => io && io.disconnect()
  })
}
