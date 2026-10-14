import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import translations from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('pt')

  // Mantém o atributo lang do <html> coerente com o idioma escolhido (acessibilidade).
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang], // textos fixos da interface
      pick: (obj) => (obj && typeof obj === 'object' ? obj[lang] : obj), // escolhe {pt, en}
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de <LanguageProvider>')
  return ctx
}
