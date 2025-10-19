"use client"

import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { i18n, type Locale } from '@/i18n-config';
import translations from '@/lib/translations';

type TranslationContextType = {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
  isRtl: boolean;
  navLinks: { href: string; label: string }[];
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const getDeepValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Locale>(i18n.defaultLocale);

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Locale;
    if (storedLang && i18n.locales.includes(storedLang)) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string, params?: { [key: string]: string | number }) => {
    const langTranslations = translations[language];
    let translation = getDeepValue(langTranslations, key) || key;

    if (params) {
      Object.keys(params).forEach(pKey => {
        translation = translation.replace(`{{${pKey}}}`, String(params[pKey]));
      });
    }
    return translation;
  };
  
  const isRtl = language === 'ar';

  const navLinks = useMemo(() => [
    { href: '/campaigns', label: t('nav.campaigns') },
    { href: '/volunteer', label: t('nav.volunteer') },
    { href: '/transparency', label: t('nav.transparency') },
    { href: '/contact', label: t('nav.contact') },
  ], [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRtl, navLinks }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// A wrapper for the root layout to provide the translation context
export function TranslationWrapper({ children }: { children: React.ReactNode }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
