import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4'

const EASE = [0.22, 1, 0.36, 1] as const

function ProfileCard() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.65, ease: EASE }}
      className="relative flex-shrink-0 flex justify-center"
    >
      <div
        className="absolute -inset-8 bg-[#64CEFB]/[0.12] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative"
      >
        {/* Ring — smaller on mobile, grows at sm and lg */}
        <div
          className="
            w-[190px] h-[190px]
            sm:w-[256px] sm:h-[256px]
            lg:w-[320px] lg:h-[320px]
            rounded-full p-[3px]
            shadow-[0_0_60px_rgba(100,206,251,0.22),0_24px_60px_rgba(0,0,0,0.65)]
          "
          style={{
            background: 'linear-gradient(160deg, rgba(100,206,251,0.45) 0%, rgba(100,206,251,0.08) 60%, rgba(100,206,251,0.18) 100%)',
          }}
        >
          <div className={`w-full h-full rounded-full overflow-hidden ${isDark ? 'bg-[#08080f]' : 'bg-slate-100'}`}>
            {imgError ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#64CEFB]/[0.12] to-transparent">
                <span className="text-[#64CEFB] font-black text-4xl sm:text-5xl tracking-tight">HM</span>
              </div>
            ) : (
              <img
                src="/profile.jpg"
                alt="Herouala Mohamed"
                className="w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>

        {/* Available badge */}
        <div className={`
          absolute bottom-2 right-2
          sm:bottom-4 sm:right-4
          flex items-center gap-1.5
          px-2 sm:px-2.5 py-[5px] sm:py-[6px] rounded-full backdrop-blur-md
          ${isDark
            ? 'bg-black/80 border border-white/[0.10]'
            : 'bg-white/90 border border-slate-200 shadow-sm'
          }
        `}>
          <span
            className="w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] rounded-full bg-emerald-400 flex-shrink-0"
            style={{ animation: 'pulseDot 2.5s ease infinite' }}
            aria-hidden="true"
          />
          <span className={`text-[9px] sm:text-[10px] font-medium ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
            {t.hero.available}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section
      id="hero"
      className={`relative min-h-[100svh] min-h-screen flex flex-col ${isDark ? 'bg-black' : 'bg-slate-50'}`}
      aria-label="Hero"
    >
      {/* ── Background layer ── */}
      <div
        className={`absolute inset-0 z-0 overflow-hidden ${isDark ? 'bg-black' : 'bg-slate-50'}`}
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: isDark ? 0.32 : 0.50 }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/82 via-black/28 to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/45" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/72 via-slate-50/18 to-slate-50/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/42 via-transparent to-slate-50/28" />
          </>
        )}

        {/* Blue ambient glow at bottom — always visible */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#64CEFB]/[0.07] to-transparent" />

        {/*
          Blue orb — NOT using glow-orb class so it stays visible on mobile.
          Sized smaller on mobile, grows at sm/lg.
          Lives inside overflow-hidden so it never causes horizontal scroll.
        */}
        <div
          className="
            absolute top-1/4 sm:top-1/3
            right-[-60px] sm:right-0 lg:right-[6%]
            w-[280px] h-[280px]
            sm:w-[480px] sm:h-[360px]
            lg:w-[700px] lg:h-[420px]
            bg-[#64CEFB]/[0.06] sm:bg-[#64CEFB]/[0.05] lg:bg-[#64CEFB]/[0.045]
            rounded-full
            blur-[80px] sm:blur-[100px] lg:blur-[130px]
            pointer-events-none
          "
          aria-hidden="true"
        />
      </div>

      {/* ── Content ── */}
      <div
        className="
          relative z-10 flex flex-col min-h-[100svh] min-h-screen
          max-w-7xl mx-auto w-full
          px-5 sm:px-8 lg:px-10
          pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14
        "
      >
        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
          className="flex items-center gap-2"
        >
          <MapPin className="w-3.5 h-3.5 text-[#64CEFB] flex-shrink-0" aria-hidden="true" />
          <span className={`text-[12px] sm:text-[12.5px] tracking-wide ${isDark ? 'text-white/35' : 'text-slate-700'}`}>
            {t.hero.location}
          </span>
        </motion.div>

        {/* Main row: text + profile card */}
        <div className="
          flex flex-col lg:flex-row
          items-center lg:items-center
          lg:justify-between
          gap-8 sm:gap-10 lg:gap-8
          flex-1 py-6 sm:py-8 lg:py-10
        ">
          <div className="flex flex-col items-start w-full lg:max-w-[520px]">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: EASE }}
              className="
                inline-flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6
                px-3 sm:px-3.5 py-[6px] sm:py-[7px] rounded-full
                border border-[#64CEFB]/20 bg-[#64CEFB]/[0.07]
                backdrop-blur-sm
              "
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#64CEFB] flex-shrink-0"
                style={{ animation: 'pulseDot 2.5s ease infinite' }}
                aria-hidden="true"
              />
              <span className="text-[#64CEFB] font-semibold text-[12px] sm:text-[13px]">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Name heading — responsive: text-5xl → sm:text-6xl → lg:text-7xl → xl:7.5rem */}
            <div className="mb-4 sm:mb-6">
              <motion.h1
                className="
                  font-black leading-[0.92] tracking-tighter
                  text-5xl sm:text-6xl lg:text-7xl xl:text-[7.5rem]
                "
              >
                <motion.span
                  className={`block ${isDark ? 'text-white' : 'text-slate-900'}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.5, ease: EASE }}
                >
                  Herouala
                </motion.span>
                <motion.span
                  className="block text-shine"
                  initial={{ opacity: 0, y: 38 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.63, ease: EASE }}
                  aria-label="Mohamed"
                >
                  Mohamed
                </motion.span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.8, ease: EASE }}
              className={`
                text-[13.5px] sm:text-[15.5px] leading-relaxed mb-6 sm:mb-8
                max-w-[340px] sm:max-w-[400px]
                ${isDark ? 'text-white/38' : 'text-slate-700'}
              `}
            >
              {t.hero.tagline}
            </motion.p>

            {/* CTA buttons — stack on mobile, inline on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.94, ease: EASE }}
              className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className={`
                  group inline-flex items-center justify-center gap-2.5
                  w-full sm:w-auto
                  px-6 sm:px-7 py-3 sm:py-3.5 rounded-full
                  bg-[#64CEFB] text-black font-semibold text-[14px] sm:text-[15px]
                  hover:bg-white active:scale-[0.97]
                  transition-all duration-[250ms]
                  hover:shadow-[0_0_48px_rgba(100,206,251,0.38)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64CEFB] focus-visible:ring-offset-2
                  ${isDark ? 'focus-visible:ring-offset-black' : 'focus-visible:ring-offset-slate-50'}
                `}
              >
                {t.hero.contactBtn}
                <ArrowRight
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-[250ms] group-hover:translate-x-1 rtl:rotate-180"
                  aria-hidden="true"
                />
              </a>

              <a
                href="/cv.pdf"
                download="Herouala_Mohamed_CV.pdf"
                className={`
                  group inline-flex items-center justify-center gap-2.5
                  w-full sm:w-auto
                  px-6 sm:px-7 py-3 sm:py-3.5 rounded-full
                  font-semibold text-[14px] sm:text-[15px]
                  active:scale-[0.97] transition-all duration-[250ms] backdrop-blur-sm
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                  ${isDark
                    ? 'border border-white/[0.14] bg-white/[0.04] text-white/75 hover:border-white/26 hover:bg-white/[0.09] hover:text-white focus-visible:ring-white/30 focus-visible:ring-offset-black'
                    : 'border border-slate-300 bg-white/70 text-slate-700 hover:border-[#64CEFB]/50 hover:bg-white hover:text-slate-900 focus-visible:ring-[#64CEFB]/40 focus-visible:ring-offset-slate-50'
                  }
                `}
              >
                <Download className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {t.hero.downloadBtn}
              </a>
            </motion.div>
          </div>

          <ProfileCard />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="hidden sm:flex flex-col items-center gap-2 mx-auto"
          aria-hidden="true"
        >
          <span className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium ${isDark ? 'text-white/18' : 'text-slate-500'}`}>
            {t.hero.scroll}
          </span>
          <div className={`w-px h-10 sm:h-12 bg-gradient-to-b ${isDark ? 'from-white/18' : 'from-slate-400/35'} to-transparent`} />
        </motion.div>
      </div>
    </section>
  )
}
