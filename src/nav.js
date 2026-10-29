import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { $, $$ } from './utils.js'
import { scrollToTarget } from './smooth.js'

export function initNav() {
  const nav = $('[data-nav]')
  const toggle = $('[data-nav-toggle]')
  const menu = $('[data-nav-menu]')
  let open = false

  const setOpen = (next, { restoreFocus = false } = {}) => {
    open = next
    nav.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    if (open) nav.classList.remove('is-hidden')
    if (!open && restoreFocus) toggle.focus()
  }

  toggle.addEventListener('click', () => setOpen(!open))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false, { restoreFocus: true })
  })
  document.addEventListener('click', (e) => {
    if (open && !nav.contains(e.target)) setOpen(false)
  })
  window.matchMedia('(min-width: 760px)').addEventListener('change', (e) => e.matches && setOpen(false))

  // Hide on scroll down, return on scroll up.
  let lastY = 0
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const y = self.scroll()
      const dy = y - lastY
      if (open) {
        lastY = y
        return
      }
      if (y < 80 || dy < -6) nav.classList.remove('is-hidden')
      else if (dy > 6) nav.classList.add('is-hidden')
      if (Math.abs(dy) > 6) lastY = y
    },
  })
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'))

  // In-page anchors go through Lenis when it is running.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    if (id.length < 2) return
    const target = $(id)
    if (!target) return
    e.preventDefault()
    setOpen(false)
    scrollToTarget(id === '#top' ? 0 : target)
    history.replaceState(null, '', id)
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  })

  $$('[data-to-top]').forEach((el) =>
    el.addEventListener('click', () => nav.classList.remove('is-hidden')),
  )
  return menu
}
