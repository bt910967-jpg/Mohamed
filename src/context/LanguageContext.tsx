import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Lang, translations, type T } from '../translations'

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: T }

const LanguageContext = createContext<LangCtx>({
  lang: 'fr',
  setLang: () => {},
  t: translations.fr,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
