import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.22, 1, 0.36, 1] as const

type FormState = { name: string; email: string; message: string }

export default function Contact() {
  const { t, lang } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isAR = lang === 'ar'
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const INPUT = [
    'w-full px-4 py-3.5 rounded-xl text-[14px]',
    'transition-[border-color,background-color,box-shadow] duration-200',
    'focus:outline-none focus:shadow-[0_0_0_3px_rgba(100,206,251,0.08)]',
    isDark
      ? 'text-white placeholder:text-white/22 bg-white/[0.038] border border-white/[0.08] focus:border-[#64CEFB]/35 focus:bg-[#64CEFB]/[0.022] hover:border-white/[0.13]'
      : 'text-gray-900 placeholder:text-slate-500 bg-white border border-gray-200 focus:border-[#64CEFB]/60 hover:border-gray-300',
  ].join(' ')

  const CONTACT_ITEMS = [
    {
      icon: Mail,
      label: t.contact.item1,
      value: 'mohammedhouari862@gmail.com',
      href: 'mailto:mohammedhouari862@gmail.com',
    },
    {
      icon: Phone,
      label: t.contact.item2,
      value: '+213 699 293 901',
      href: 'tel:+213699293901',
    },
    {
      icon: MapPin,
      label: t.contact.item3,
      value: t.contact.location,
      href: undefined,
    },
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const FORMSPREE_ID = 'rgodkvob'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (!res.ok) throw new Error('submission failed')
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4500)
    } catch {
      setLoading(false)
      return
    }
    setLoading(false)
  }

  return (
    <section
      id="contact"
      className={`py-20 md:py-28 px-5 sm:px-8 lg:px-10 relative overflow-hidden ${isDark ? 'bg-[#03030a]' : 'bg-gray-50'}`}
      ref={ref}
    >
      <div
        className="glow-orb absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] h-48 bg-[#64CEFB]/[0.04] rounded-full blur-[90px] pointer-events-none"
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
            {t.contact.label}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className={`
                text-[2rem] sm:text-5xl font-black tracking-tight mb-4 leading-[1.05]
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}
            >
              {isAR ? (
                <>{t.contact.heading1} <span className="text-[#64CEFB]">{t.contact.heading2}</span></>
              ) : (
                <>{t.contact.heading1}<br /><span className="text-[#64CEFB]">{t.contact.heading2}</span></>
              )}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className={`text-[15px] sm:text-[16px] leading-relaxed mb-8 sm:mb-10 ${isDark ? 'text-white/38' : 'text-slate-700'}`}
            >
              {t.contact.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
              className="space-y-3.5"
            >
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="
                    w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center
                    bg-[#64CEFB]/[0.07] border border-[#64CEFB]/[0.14]
                    group-hover:bg-[#64CEFB]/[0.12] transition-colors duration-200
                  ">
                    <Icon className="w-[15px] h-[15px] text-[#64CEFB]" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className={`hover:text-[#64CEFB] transition-colors duration-200 text-[13.5px] sm:text-[14px] ${isDark ? 'text-white/42' : 'text-gray-600'}`}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className={`text-[13.5px] sm:text-[14px] ${isDark ? 'text-white/42' : 'text-gray-600'}`}>{value}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
            onSubmit={handleSubmit}
            className="space-y-2.5"
            noValidate
          >
            <input
              type="text"
              name="name"
              placeholder={t.contact.ph1}
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={INPUT}
            />
            <input
              type="email"
              name="email"
              placeholder={t.contact.ph2}
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={INPUT}
            />
            <textarea
              name="message"
              placeholder={t.contact.ph3}
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className={`${INPUT} resize-none`}
            />

            <button
              type="submit"
              disabled={loading || sent}
              className={`
                w-full flex items-center justify-center gap-2.5
                px-6 py-3.5 rounded-xl mt-0.5
                font-semibold text-[14px]
                transition-all duration-[250ms]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB] focus-visible:ring-offset-1
                disabled:cursor-not-allowed disabled:opacity-65
                active:scale-[0.98]
                ${isDark
                  ? 'focus-visible:ring-offset-[#03030a]'
                  : 'focus-visible:ring-offset-gray-50'
                }
                ${sent
                  ? 'bg-emerald-500/80 text-white border border-emerald-500/40'
                  : 'bg-[#64CEFB] text-black hover:bg-white hover:shadow-[0_0_40px_rgba(100,206,251,0.28)]'
                }
              `}
            >
              {sent ? (
                <>
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  {t.contact.sentBtn}
                </>
              ) : loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  {t.contact.sendingBtn}
                </>
              ) : (
                <>
                  {t.contact.submitBtn}
                  <Send className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>

            <p className={`text-[11px] text-center pt-0.5 ${isDark ? 'text-white/18' : 'text-slate-600'}`}>
              {t.contact.note}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
