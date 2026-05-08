import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, CalendarDays } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.22, 1, 0.36, 1] as const

type ExperienceItem = {
  title: string
  company: string
  period: string
  duration: string
  description: string
  tags: string[]
  accent: string
  current?: boolean
}

export default function Experience() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isAR = lang === 'ar'

  const EXPERIENCES: ExperienceItem[] = [
    {
      title: t.exp.e1.title,
      company: 'Société BIFA',
      period: '2025 — 2026',
      duration: '1 an',
      description: t.exp.e1.desc,
      tags: [t.exp.e1.tag1, t.exp.e1.tag2, t.exp.e1.tag3],
      accent: '#64CEFB',
      current: true,
    },
    {
      title: t.exp.e2.title,
      company: 'Société NITA',
      period: '2024 — 2025',
      duration: '1 an',
      description: t.exp.e2.desc,
      tags: [t.exp.e2.tag1, t.exp.e2.tag2, t.exp.e2.tag3],
      accent: '#a78bfa',
    },
    {
      title: t.exp.e3.title,
      company: 'SARL INFINI HOUSE',
      period: '2023 — 2024',
      duration: '14 mois',
      description: t.exp.e3.desc,
      tags: [t.exp.e3.tag1, t.exp.e3.tag2, t.exp.e3.tag3],
      accent: '#34d399',
    },
    {
      title: t.exp.e4.title,
      company: 'SARL INFINI HOUSE',
      period: '2022',
      duration: '6 mois',
      description: t.exp.e4.desc,
      tags: [t.exp.e4.tag1, t.exp.e4.tag2, t.exp.e4.tag3],
      accent: '#fb923c',
    },
  ]

  return (
    <section
      id="experience"
      className={`py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden ${isDark ? 'bg-[#03030a]' : 'bg-gray-50'}`}
      ref={ref}
    >
      <div
        className="glow-orb absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#64CEFB]/[0.025] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-2.5 mb-4"
        >
          <div className="w-[3px] h-5 bg-[#64CEFB] rounded-full" />
          <span className="text-[#64CEFB] text-[11px] font-semibold tracking-[0.2em] uppercase">
            {t.exp.label}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className={`
            text-[2rem] sm:text-5xl ${isAR ? 'lg:text-5xl' : 'lg:text-6xl'}
            font-black tracking-tight mb-4 leading-[1.05]
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}
        >
          {isAR ? (
            <>{t.exp.heading1} <span className="text-[#64CEFB]">{t.exp.heading2}</span></>
          ) : (
            <>{t.exp.heading1}<br /><span className="text-[#64CEFB]">{t.exp.heading2}</span></>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className={`text-[15px] sm:text-[16px] leading-relaxed mb-12 sm:mb-16 max-w-xl ${isDark ? 'text-white/38' : 'text-slate-700'}`}
        >
          {t.exp.subtitle}
        </motion.p>

        <div className="relative">
          {/* Timeline vertical line — adapts to RTL */}
          <div
            className={`
              absolute top-3 bottom-3 w-px
              bg-gradient-to-b from-[#64CEFB]/50 via-[#64CEFB]/20 to-transparent
              ${isAR ? 'right-[19px] left-auto' : 'left-[19px]'}
            `}
            aria-hidden="true"
          />

          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: isAR ? 18 : -18 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1 + 0.2, ease: EASE }}
                className={`flex gap-5 sm:gap-7 ${isAR ? 'flex-row-reverse' : ''}`}
              >
                <div className="relative flex-shrink-0 mt-1" aria-hidden="true">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      border-2 transition-all duration-300
                      ${isDark ? 'bg-[#03030a]' : 'bg-gray-50'}
                    `}
                    style={{
                      borderColor: `${exp.accent}50`,
                      boxShadow: exp.current ? `0 0 16px ${exp.accent}30` : 'none',
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: exp.accent }}
                    />
                  </div>
                </div>

                <motion.article
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={`
                    flex-1 p-5 sm:p-6 rounded-2xl mb-2
                    border transition-[border-color,box-shadow] duration-[280ms]
                    hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                    ${exp.current
                      ? 'border-[#64CEFB]/18 bg-[#64CEFB]/[0.032] hover:border-[#64CEFB]/30'
                      : isDark
                        ? 'border-white/[0.055] bg-white/[0.018] hover:border-white/[0.10]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-[15px] sm:text-[16px] leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <span className="
                            px-2 py-[2px] rounded-full text-[9px] font-bold tracking-[0.14em] uppercase
                            bg-[#64CEFB]/12 border border-[#64CEFB]/22 text-[#64CEFB]
                            flex-shrink-0
                          ">
                            {t.exp.current}
                          </span>
                        )}
                      </div>
                      <p className={`flex items-center gap-1.5 text-[12.5px] ${isDark ? 'text-white/38' : 'text-slate-600'}`}>
                        <Building2 className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        {exp.company}
                      </p>
                    </div>

                    <div className={`
                      flex items-center gap-1.5
                      px-3 py-1.5 rounded-full flex-shrink-0 w-fit
                      text-[11.5px] font-medium
                      ${isDark
                        ? 'border border-white/[0.07] bg-white/[0.025] text-white/35'
                        : 'border border-gray-200 bg-gray-100 text-gray-500'
                      }
                    `}>
                      <CalendarDays className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                      {exp.period}
                      <span className={isDark ? 'text-white/20' : 'text-slate-400'}>·</span>
                      {exp.duration}
                    </div>
                  </div>

                  <p className={`text-[13px] leading-[1.7] mb-4 ${isDark ? 'text-white/36' : 'text-slate-700'}`}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`
                          px-2.5 py-[4px] rounded-full
                          text-[10.5px] font-medium
                          ${isDark
                            ? 'border border-white/[0.07] bg-white/[0.025] text-white/40'
                            : 'border border-gray-200 bg-gray-100 text-gray-500'
                          }
                        `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
