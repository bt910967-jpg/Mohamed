import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, BookOpen, Monitor } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.22, 1, 0.36, 1] as const

type Diploma = {
  icon: LucideIcon
  level: string
  degree: string
  field: string
  description: string
  accent: string
  featured?: boolean
}

export default function Education() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isAR = lang === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const DIPLOMAS: Diploma[] = [
    {
      icon: GraduationCap,
      level: 'BAC+5',
      degree: t.edu.d1.degree,
      field: t.edu.d1.field,
      description: t.edu.d1.desc,
      accent: '#64CEFB',
      featured: true,
    },
    {
      icon: BookOpen,
      level: 'BAC+3',
      degree: t.edu.d2.degree,
      field: t.edu.d2.field,
      description: t.edu.d2.desc,
      accent: '#a78bfa',
    },
    {
      icon: Monitor,
      level: 'Diplôme',
      degree: t.edu.d3.degree,
      field: t.edu.d3.field,
      description: t.edu.d3.desc,
      accent: '#34d399',
    },
  ]

  return (
    <section
      id="education"
      className={`py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}
      ref={ref}
    >
      <div
        className="glow-orb absolute bottom-0 right-0 w-80 h-80 bg-purple-500/[0.025] rounded-full blur-[100px] pointer-events-none"
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
            {t.edu.label}
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
            <>{t.edu.heading1} <span className="text-[#64CEFB]">{t.edu.heading2}</span></>
          ) : (
            <>{t.edu.heading1}<br /><span className="text-[#64CEFB]">{t.edu.heading2}</span></>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className={`text-[15px] sm:text-[16px] leading-relaxed mb-10 sm:mb-14 max-w-xl ${isDark ? 'text-white/38' : 'text-slate-700'}`}
        >
          {t.edu.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DIPLOMAS.map((d, i) => (
            <motion.article
              key={d.degree}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.18, ease: EASE }}
              className={`
                group relative p-6 rounded-2xl flex flex-col
                border transition-[border-color,box-shadow] duration-[280ms]
                hover:shadow-[0_8px_36px_rgba(0,0,0,0.6)]
                ${d.featured
                  ? 'border-[#64CEFB]/18 bg-[#64CEFB]/[0.035] hover:border-[#64CEFB]/30 hover:shadow-[0_8px_36px_rgba(0,0,0,0.6),0_0_0_1px_rgba(100,206,251,0.07)]'
                  : isDark
                    ? 'border-white/[0.055] bg-white/[0.018] hover:border-white/[0.11]'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }
              `}
            >
              <div className="
                absolute top-4 right-4
                px-2.5 py-0.5 rounded-full
                border text-[9.5px] font-bold tracking-[0.14em] uppercase
              "
                style={{
                  backgroundColor: `${d.accent}12`,
                  borderColor: `${d.accent}25`,
                  color: d.accent,
                }}
              >
                {d.level}
              </div>

              <div
                className="
                  w-11 h-11 rounded-xl flex items-center justify-center mb-5
                  flex-shrink-0
                  transition-transform duration-[280ms] group-hover:scale-110
                "
                style={{
                  backgroundColor: `${d.accent}12`,
                  border: `1px solid ${d.accent}22`,
                }}
              >
                <d.icon
                  className="w-[19px] h-[19px]"
                  strokeWidth={1.7}
                  style={{ color: d.accent }}
                  aria-hidden="true"
                />
              </div>

              <span className={`text-[9.5px] font-semibold tracking-[0.18em] uppercase mb-1.5 block ${isDark ? 'text-white/22' : 'text-slate-600'}`}>
                {d.field}
              </span>

              <h3 className={`font-bold text-[14.5px] sm:text-[15px] leading-snug mb-3 flex-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {d.degree}
              </h3>

              <p className={`text-[12.5px] leading-[1.7] ${isDark ? 'text-white/32' : 'text-slate-600'}`}>
                {d.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
