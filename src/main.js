import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import { initSmooth } from './smooth.js'
import { initNav } from './nav.js'
import { initHero } from './scenes/hero.js'
import { initProblem } from './scenes/problem.js'
import { initHow } from './scenes/how.js'
import { initControl } from './scenes/control.js'
import { initPrice } from './scenes/price.js'
import { initFaq } from './scenes/faq.js'
import { initReveals } from './scenes/reveal.js'
import { initDemo } from './demo.js'

gsap.registerPlugin(ScrollTrigger, SplitText)
// Phone address bars resize the viewport while scrolling; do not refresh pins for that.
ScrollTrigger.config({ ignoreMobileResize: true })

initSmooth()
initNav()

gsap.to('[data-progress-bar]', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: { start: 0, end: 'max', scrub: true },
})

// Pinned scenes first, in page order; generic reveals last. Phases yield to the
// browser in between so start-up never produces one long task.
const mm = gsap.matchMedia()
const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0))
const phases = [
  () => initHero(mm),
  () => {
    initProblem(mm)
    initHow(mm)
  },
  () => {
    initControl(mm)
    initPrice(mm)
  },
  () => initReveals(mm),
  () => {
    initDemo()
    initFaq()
  },
]

async function boot() {
  for (const run of phases) {
    run()
    await nextTask()
  }
  window.__sgReady = true
  if (import.meta.env.DEV) window.__ST = ScrollTrigger
  // Layout shifts once the font arrives: re-measure every trigger once.
  if (document.fonts && document.fonts.ready) await document.fonts.ready
  ScrollTrigger.refresh()
}
boot()
