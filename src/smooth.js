import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { REDUCE } from './utils.js'

let lenis = null
let tick = null

function start() {
  if (lenis) return
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
}

function stop() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
  tick = null
}

// Lenis is only active when the visitor has not asked for reduced motion.
export function initSmooth() {
  const mq = window.matchMedia(REDUCE)
  if (!mq.matches) start()
  mq.addEventListener('change', (e) => (e.matches ? stop() : start()))
}

export function scrollToTarget(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { duration: 1.6, ...opts })
  else if (typeof target === 'number') window.scrollTo(0, target)
  else target.scrollIntoView()
}
