import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { LANG_OPTIONS, type Lang } from '../translations'

const EASE = [0.22, 1, 0.36, 1] as const

/* ── Language Switcher ── */
function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANG_OPTIONS.find(l => l.code === lang)!

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const select = useCallback((code: Lang) => { setLang(code); setOpen(false) }, [setLang])

  const isDark = theme === 'dark'

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        className={`
          flex items-center gap-1.5 px-3 py-[7px] rounded-full
          border text-[12.5px] font-medium
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]/50
          ${isDark
            ? 'border-white/[0.10] bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:text-white'
            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-[14px] leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE }}
            className={`
              absolute top-full mt-2 left-0 z-50
              w-44 rounded-2xl border p-1.5
              shadow-[0_16px_48px_rgba(0,0,0,0.55)]
              ${isDark
                ? 'bg-[#0d0d18] border-white/[0.09]'
                : 'bg-white border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
              }
            `}
          >
            {LANG_OPTIONS.map(({ code, label, flag }) => (
              <motion.li
                key={code}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.14 }}
                role="option"
                aria-selected={lang === code}
                onClick={() => select(code)}
                className={`
                  flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer
                  text-[13px] font-medium
                  transition-colors duration-100
                  ${lang === code
                    ? 'bg-[#64CEFB]/10 text-[#64CEFB]'
                    : isDark
                      ? 'text-white/55 hover:bg-white/[0.05] hover:text-white/90'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-[15px] leading-none">{flag}</span>
                {label}
                {lang === code && (
                  <span className="ms-auto w-1.5 h-1.5 rounded-full bg-[#64CEFB]" aria-hidden="true" />
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Theme Toggle ── */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0
        border transition-colors duration-200 z-50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB]/50
        ${isDark
          ? 'bg-white/[0.05] border-white/[0.10] text-white hover:bg-white/[0.12]'
          : 'bg-white border-slate-300 text-slate-800 shadow-sm hover:bg-slate-50 hover:text-slate-900'
        }
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 30, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Moon className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -30, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Sun className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

/* ── Main Navbar ── */
export default function Navbar() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { label: t.nav.home,       href: '#hero'       },
    { label: t.nav.about,      href: '#about'      },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.education,  href: '#education'  },
    { label: t.nav.skills,     href: '#skills'     },
    { label: t.nav.contact,    href: '#contact'    },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen(v => !v), [])

  const pillClass = scrolled
    ? isDark
      ? 'bg-black/88 backdrop-blur-2xl border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.65)]'
      : 'bg-white/95 backdrop-blur-2xl border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.10)]'
    : isDark
      ? 'bg-black/35 backdrop-blur-lg border-white/[0.07]'
      : 'bg-white/70 backdrop-blur-lg border-gray-200'

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: EASE }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Force LTR so the navbar layout is always stable regardless of page dir */}
        <div
          style={{ direction: 'ltr' }}
          className={`flex items-center justify-between px-3 py-2.5 rounded-full border transition-[background-color,border-color,box-shadow] duration-300 ${pillClass}`}
        >

          {/* Left: Language Switcher + Theme Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Center: desktop nav links */}
          <div className="hidden lg:flex items-center gap-0">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-0.5 px-3 py-1.5 rounded-full
                  text-[13px] font-medium
                  hover:bg-white/[0.06] transition-all duration-150 whitespace-nowrap
                  ${isDark ? 'text-white/50 hover:text-white/90' : 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.04]'}
                `}
              >
                {link.label}
                <ChevronRight
                  className={`w-3 h-3 opacity-25 flex-shrink-0 ${lang === 'ar' ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          {/* Right: CV + Hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="/cv.pdf"
              download="Herouala_Mohamed_CV.pdf"
              className="
                hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full
                bg-[#64CEFB] text-black text-[13px] font-semibold
                hover:bg-white active:scale-95
                transition-all duration-200 whitespace-nowrap
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB] focus-visible:ring-offset-1 focus-visible:ring-offset-black
              "
            >
              {t.nav.downloadCV}
            </a>

            <button
              onClick={toggleMenu}
              className={`
                lg:hidden w-9 h-9 flex items-center justify-center rounded-full
                border transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                ${isDark
                  ? 'border-white/[0.12] text-white hover:bg-white/[0.08]'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                }
              `}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={handleNavClick}
              aria-hidden="true"
            />
            <motion.div
              key="menu"
              id="mobile-nav"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              className={`
                fixed top-[72px] left-3 right-3 z-50 lg:hidden
                border rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                ${isDark ? 'bg-[#0d0d18] border-white/[0.09]' : 'bg-white border-gray-200'}
              `}
            >
              <div className="py-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.18 }}
                    onClick={handleNavClick}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl
                      text-[14px] font-medium transition-all duration-150
                      ${isDark
                        ? 'text-white/55 hover:text-white hover:bg-white/[0.05]'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    {link.label}
                    <ChevronRight className="w-3.5 h-3.5 opacity-25 flex-shrink-0 rtl:rotate-180" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>

              <div className={`px-2 pb-2 pt-1 border-t mt-1 ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
                <a
                  href="/cv.pdf"
                  download="Herouala_Mohamed_CV.pdf"
                  onClick={handleNavClick}
                  className="
                    flex items-center justify-center w-full px-4 py-3 rounded-xl
                    bg-[#64CEFB] text-black font-semibold text-[14px]
                    hover:bg-white active:scale-[0.98] transition-all duration-200
                  "
                >
                  {t.nav.downloadCV}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
