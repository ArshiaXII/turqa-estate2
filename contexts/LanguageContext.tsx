"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import en from "@/translations/en"
import ru from "@/translations/ru"
import tr from "@/translations/tr"

type Language = "en" | "ru" | "tr"

type TranslationsType = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof TranslationsType) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en"
    }
    return "en"
  })

  const translations: Record<Language, TranslationsType> = {
    en,
    ru,
    tr,
  }

  const t = useCallback(
    (key: keyof TranslationsType) => {
      return translations[language][key] || key
    },
    [language, translations], // Added translations to dependencies
  )

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

