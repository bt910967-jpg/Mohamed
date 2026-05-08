import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, TrendingUp, Monitor, Sparkles } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.22, 1, 0.36, 1] as const

type SkillGroup = {
  category: string
  icon: LucideIcon
  accent: string
  skills: string[]
}

type Language = {
  name: string
  level: string
  pct: number
  accent: string
}

export default function Skills() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isAR = lang === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const SKILL_GROUPS: SkillGroup[] = [
    { category: t.skills.cat1, icon: Users,      accent: '#64CEFB', skills: t.skills.c1 },
    { category: t.skills.cat2, icon: TrendingUp, accent: '#a78bfa', skills: t.skills.c2 },
    { category: t.skills.cat3, icon: Monitor,    accent: '#34d399', skills: t.skills.c3 },
    { category: t.skills.cat4, icon: Sparkles,   accent: '#fb923c', skills: t.skills.c4 },
  ]

  const LANGUAGES: Language[] = [
    { name: t.skills.l1name, level: t.skills.l1level, pct: 100, accent: '#64CEFB' },
    { name: t.skills.l2name, level: t.skills.l2level, pct: 88,  accent: '#a78bfa' },
    { name: t.skills.l3name, level: t.skills.l3level, pct: 62,  accent: '#34d399' },
  ]

  return (
    <section
      id="skills"
      className={`py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden ${isDark ? 'bg-[#03030a]' : 'bg-gray-50'}`}
      ref={ref}
    >
      <div
        className="glow-orb absolute top-0 left-1/2 -translate-x-1/2 w-[440px] h-52 bg-[#64CEFB]/[0.03] rounded-full blur-[90px] pointer-events-none"
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
            {t.skills.label}
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
            <>{t.skills.heading1} <span className="text-[#64CEFB]">{t.skills.heading2}</span></>
          ) : (
            <>{t.skills.heading1}<br /><span className="text-[#64CEFB]">{t.skills.heading2}</span></>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className={`text-[15px] sm:text-[16px] leading-relaxed mb-10 sm:mb-14 max-w-xl ${isDark ? 'text-white/38' : 'text-slate-700'}`}
        >
          {t.skills.subtitle}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 + 0.2, ease: EASE }}
              className={`
                group p-5 sm:p-6 rounded-2xl
                transition-[border-color,box-shadow] duration-[280ms]
                hover:shadow-[0_6px_28px_rgba(0,0,0,0.55)]
                ${isDark
                  ? 'border border-white/[0.055] bg-white/[0.018] hover:border-white/[0.09]'
                  : 'border border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="
                    w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-transform duration-[280ms] group-hover:scale-110
                  "
                  style={{
                    backgroundColor: `${group.accent}12`,
                    border: `1px solid ${group.accent}22`,
                  }}
                >
                  <group.icon
                    className="w-[17px] h-[17px]"
                    strokeWidth={1.75}
                    style={{ color: group.accent }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className={`font-semibold text-[14px] tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`
                      px-2.5 py-[5px] rounded-full
                      text-[11px] font-medium
                      transition-colors duration-150 cursor-default
                      ${isDark
                        ? 'text-white/40 border border-white/[0.07] bg-white/[0.025] hover:text-white/65 hover:border-white/12'
                        : 'text-gray-500 border border-gray-200 bg-gray-100 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className={`
            p-5 sm:p-7 rounded-2xl
            ${isDark
              ? 'border border-white/[0.055] bg-white/[0.018]'
              : 'border border-gray-200 bg-white'
            }
          `}
        >
          <h3 className={`font-bold text-[14.5px] mb-5 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="w-1 h-4 bg-[#64CEFB] rounded-full" aria-hidden="true" />
            {t.skills.langTitle}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {LANGUAGES.map((l, i) => (
              <div key={l.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold text-[13.5px] ${isDark ? 'text-white' : 'text-gray-900'}`}>{l.name}</span>
                  <span className={`text-[11.5px] ${isDark ? 'text-white/35' : 'text-slate-600'}`}>{l.level}</span>
                </div>

                <div className={`h-[3px] rounded-full overflow-hidden ${isDark ? 'bg-white/[0.07]' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: l.accent }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${l.pct}%` } : {}}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.12 + 0.55,
                      ease: EASE,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
