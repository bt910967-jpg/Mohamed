import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Globe, Award } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.22, 1, 0.36, 1] as const

export default function About() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const HIGHLIGHTS = [
    { icon: Briefcase,      value: '3+',    label: t.about.h1label, desc: t.about.h1desc },
    { icon: Award,          value: '4',     label: t.about.h2label, desc: t.about.h2desc },
    { icon: GraduationCap, value: 'BAC+5', label: t.about.h3label, desc: t.about.h3desc },
    { icon: Globe,          value: '2',     label: t.about.h4label, desc: t.about.h4desc },
  ]

  return (
    <section
      id="about"
      className={`py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="
          glow-orb
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[280px] rounded-full
          bg-[#64CEFB]/[0.04] blur-[80px]
        " />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-2.5 mb-5"
        >
          <div className="w-[3px] h-5 bg-[#64CEFB] rounded-full" />
          <span className="text-[#64CEFB] text-[11px] font-semibold tracking-[0.2em] uppercase">
            {t.about.label}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className={`
                text-[2rem] sm:text-5xl ${lang === 'ar' ? 'lg:text-5xl' : 'lg:text-6xl'}
                font-black tracking-tight mb-6 leading-[1.05]
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}
            >
              {lang === 'ar' ? (
                <>{t.about.heading1} <span className="text-[#64CEFB]">{t.about.heading2}</span></>
              ) : (
                <>{t.about.heading1}<br /><span className="text-[#64CEFB]">{t.about.heading2}</span></>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className={`text-[15px] sm:text-[16px] leading-[1.8] mb-5 ${isDark ? 'text-white/42' : 'text-gray-600'}`}
            >
              {t.about.bio1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
              className={`text-[14px] sm:text-[15px] leading-[1.8] ${isDark ? 'text-white/32' : 'text-slate-600'}`}
            >
              {t.about.bio2}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.2, ease: EASE }}
                className={`
                  group p-4 sm:p-5 rounded-2xl cursor-default
                  hover:border-[#64CEFB]/22 hover:bg-[#64CEFB]/[0.025]
                  transition-[border-color,background-color,box-shadow] duration-[280ms]
                  hover:shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_0_1px_rgba(100,206,251,0.06)]
                  ${isDark
                    ? 'border border-white/[0.06] bg-white/[0.018]'
                    : 'border border-gray-200 bg-gray-50'
                  }
                `}
              >
                <div className="
                  w-9 h-9 rounded-xl mb-4
                  bg-[#64CEFB]/[0.1] border border-[#64CEFB]/[0.18]
                  flex items-center justify-center
                  group-hover:bg-[#64CEFB]/[0.16]
                  transition-colors duration-[280ms]
                ">
                  <h.icon className="w-[17px] h-[17px] text-[#64CEFB]" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <div className={`text-[1.6rem] font-black tracking-tight tabular-nums mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {h.value}
                </div>
                <div className={`font-semibold text-[12.5px] mb-1 ${isDark ? 'text-white/65' : 'text-gray-700'}`}>{h.label}</div>
                <div className={`text-[11.5px] leading-snug ${isDark ? 'text-white/28' : 'text-slate-600'}`}>{h.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
