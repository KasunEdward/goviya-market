import { useState, useEffect } from 'react'
import translations from '@/data/translations'
import type { Lang, Translations } from '@/types'

interface UseLangReturn {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

export function useLang(): UseLangReturn {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (next: Lang): void => {
    setLangState(next)
  }

  useEffect(() => {
    document.body.className =
      lang === 'si' ? 'lang-si' : lang === 'ta' ? 'lang-ta' : ''
  }, [lang])

  return { lang, setLang, t: translations[lang] }
}
