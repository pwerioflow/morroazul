"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, translations } from "./translations"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "pt",
  setLocale: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if there's a saved language preference in localStorage
    const savedLocale = localStorage.getItem("locale") as Locale | null
    if (savedLocale && ["pt", "en", "es"].includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      if (["pt", "en", "es"].includes(browserLang as Locale)) {
        setLocale(browserLang as Locale)
      }
    }
  }, [])

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  const t = (key: string): string => {
    if (!mounted) return key

    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    return value
  }

  return <LanguageContext.Provider value={{ locale, setLocale: changeLocale, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}

