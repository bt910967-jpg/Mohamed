import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Stats() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const STATS = [
    { num: '3+',    label: t.stats.s1label },
    { num: '4',     label: t.stats.s2label },
    { num: 'BAC+5', label: t.stats.s3label },
    { num: '2',     label: t.stats.s4label },
  ]

  const borderColor = isDark ? 'border-white/[0.05]' : 'border-gray-200'

  return (
    <section
      className={`relative overflow-hidden ${isDark ? 'bg-[#03030a]' : 'bg-gray-50'}`}
      ref={ref}
      aria-label="Platform statistics"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#64CEFB]/18 to-transparent"
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? 'via-white/[0.04]' : 'via-gray-200'} to-transparent`}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              className={`
                py-9 sm:py-11 px-6 text-center relative
                ${i % 2 !== 0 ? `border-l ${borderColor}` : ''}
                ${i >= 2 ? `border-t ${borderColor} lg:border-t-0` : ''}
                ${i !== 0 ? `lg:border-l ${borderColor}` : ''}
              `}
            >
              <div className="text-[1.75rem] sm:text-[2.25rem] font-black text-[#64CEFB] mb-1 tracking-tight tabular-nums">
                {s.num}
              </div>
              <div className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] ${isDark ? 'text-white/28' : 'text-slate-600'}`}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
