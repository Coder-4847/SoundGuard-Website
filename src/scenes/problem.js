import gsap from 'gsap'
import { $, $$, MOTION, REDUCE } from '../utils.js'

export function initProblem(mm) {
  mm.add({ motion: MOTION, reduce: REDUCE, small: '(max-width: 759px)' }, (ctx) => {
    const { reduce, small } = ctx.conditions
    const stage = $('[data-problem]')
    const lines = $$('[data-problem-line]', stage)

    if (reduce) {
      lines.forEach((line) =>
        gsap.fromTo(
          line,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, scrollTrigger: { trigger: line, start: 'top 85%', once: true } },
        ),
      )
      return
    }

    gsap.set(lines, { opacity: 0, y: 48 })
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: small ? '+=210%' : '+=300%',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        refreshPriority: 100,
      },
    })
    lines.forEach((line, i) => {
      tl.to(line, { opacity: 1, y: 0, duration: 0.6 }, i)
      if (i > 0) tl.to(lines[i - 1], { opacity: 0.2, duration: 0.6 }, i)
    })
    tl.to({}, { duration: 0.5 }) // hold on the last line before releasing
  })
}
