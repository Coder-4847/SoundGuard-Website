import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { $, $$ } from '../utils.js'

export function initFaq() {
  const root = $('[data-accordion]')
  if (!root) return
  const items = $$('.acc-item', root)
  const buttons = items.map((i) => $('.acc-btn', i))
  let timer

  items.forEach((item, i) => {
    const btn = buttons[i]
    btn.addEventListener('click', () => {
      const open = !item.classList.contains('is-open')
      item.classList.toggle('is-open', open)
      btn.setAttribute('aria-expanded', String(open))
    })
    $('.acc-panel', item).addEventListener('transitionend', (e) => {
      if (e.propertyName !== 'grid-template-rows') return
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 50)
    })
    btn.addEventListener('keydown', (e) => {
      const move = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: buttons.length - 1 }[e.key]
      if (move === undefined) return
      e.preventDefault()
      buttons[(move + buttons.length) % buttons.length].focus()
    })
  })
}
