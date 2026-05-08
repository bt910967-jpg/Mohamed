import { Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

function Logo() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <a
      href="#hero"
      className="flex items-center gap-2.5 group w-fit"
      aria-label="Herouala Mohamed — retour en haut"
    >
      <div className={`
        w-9 h-9 rounded-full border-2 border-[#64CEFB]/40 flex items-center justify-center
        group-hover:border-[#64CEFB]/80 transition-colors duration-200
      `}>
        <span className="text-[#64CEFB]/60 group-hover:text-[#64CEFB]/90 font-black text-[11px] tracking-tight transition-colors duration-200">
          HM
        </span>
      </div>
      <div>
        <p className={`font-semibold text-[13.5px] tracking-wide transition-colors duration-200 leading-tight ${isDark ? 'text-white/50 group-hover:text-white/80' : 'text-gray-700 group-hover:text-gray-900'}`}>
          Herouala Mohamed
        </p>
        <p className={`text-[10.5px] leading-tight ${isDark ? 'text-white/22' : 'text-slate-600'}`}>
          {t.footer.brandSub}
        </p>
      </div>
    </a>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const QUICK_LINKS = [
    { label: t.footer.navAbout,   href: '#about'      },
    { label: t.footer.navExp,     href: '#experience' },
    { label: t.footer.navEdu,     href: '#education'  },
    { label: t.footer.navSkills,  href: '#skills'     },
    { label: t.footer.navContact, href: '#contact'    },
  ]

  return (
    <footer className={`relative overflow-hidden border-t ${isDark ? 'bg-black border-white/[0.055]' : 'bg-white border-gray-200'}`}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#64CEFB]/25 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-10 sm:mb-12">

          <div className="sm:col-span-1">
            <Logo />
            <p className={`text-[12.5px] leading-relaxed mt-5 max-w-[240px] ${isDark ? 'text-white/24' : 'text-slate-600'}`}>
              {t.footer.desc}
            </p>
          </div>

          <div>
            <h4 className={`text-[10px] font-semibold tracking-[0.18em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-slate-600'}`}>
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-[13px] transition-colors duration-150 ${isDark ? 'text-white/38 hover:text-white/80' : 'text-slate-600 hover:text-gray-900'}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-[10px] font-semibold tracking-[0.18em] uppercase mb-4 ${isDark ? 'text-white/25' : 'text-slate-600'}`}>
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:mohammedhouari862@gmail.com"
                  className={`flex items-center gap-2 hover:text-[#64CEFB] transition-colors duration-150 text-[12.5px] ${isDark ? 'text-white/38' : 'text-slate-600'}`}
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  mohammedhouari862@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+213699293901"
                  className={`flex items-center gap-2 hover:text-[#64CEFB] transition-colors duration-150 text-[12.5px] ${isDark ? 'text-white/38' : 'text-slate-600'}`}
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                  +213 699 293 901
                </a>
              </li>
              <li className={`flex items-center gap-2 text-[12.5px] ${isDark ? 'text-white/28' : 'text-slate-600'}`}>
                <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-white/28' : 'text-slate-500'}`} aria-hidden="true" />
                Oran, Algérie
              </li>
            </ul>
          </div>
        </div>

        <div className={`
          pt-6 border-t
          flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5
          ${isDark ? 'border-white/[0.05]' : 'border-gray-100'}
        `}>
          <p className={`text-[11px] ${isDark ? 'text-white/16' : 'text-slate-500'}`}>
            {t.footer.copyright}
          </p>

          <div className="flex flex-col items-center gap-1">
            <p className={`text-[11px] flex items-center gap-1.5 ${isDark ? 'text-white/14' : 'text-slate-500'}`}>
              {t.footer.devBy}{' '}
              <span className={`font-medium ${isDark ? 'text-white/28' : 'text-slate-600'}`}>Youcef Keche</span>
            </p>
            <a
              href="mailto:kecheyoucef0559@gmail.com"
              className={`flex items-center gap-1.5 hover:text-[#64CEFB] transition-colors duration-200 text-[10.5px] ${isDark ? 'text-white/[0.70]' : 'text-slate-600'}`}
            >
              <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              kecheyoucef0559@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
