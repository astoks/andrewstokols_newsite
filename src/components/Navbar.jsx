import { useEffect, useState } from 'react'
import site from '../data/site.json'

const links = [
  ['About', '#about'],
  ['Projects', '#projects'],
  ['Research', '#research'],
  ['Media', '#media'],
  ['Writing', '#writing'],
  ['Data', '#data'],
  ['Graphics', '#graphics'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? 'border-b border-slate-200 bg-white/90 backdrop-blur' : 'border-b border-transparent bg-transparent backdrop-blur-0'}`}>
      <div className="container-page wrap-safe flex h-16 items-center justify-between gap-4">
        <a
          href="#hero"
          className={`text-sm font-semibold tracking-wide transition ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-sm transition ${scrolled ? 'text-slate-500 hover:text-slate-900' : 'text-slate-600/90 hover:text-slate-900'}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`rounded-lg p-2 lg:hidden ${scrolled ? 'border border-slate-200 bg-white/80' : 'border border-slate-300/50 bg-white/45 backdrop-blur-sm'}`}
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-page grid gap-4 py-4">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm text-slate-600">
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
