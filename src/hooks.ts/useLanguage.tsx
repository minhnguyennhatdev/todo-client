import { useRouter } from 'next/router'

export const LANGUAGE = {
  VI: 'vi',
  EN: 'en',
}

export const useLanguage = () => {
  const router = useRouter()
  const { locale } = router
  const changeLocale = (l?: string) => {
    const nextLang = l ??
      (locale === LANGUAGE.VI
        ? LANGUAGE.EN
        : LANGUAGE.VI)
    localStorage.setItem('locale', nextLang)
    router.push(router.asPath, router.asPath, { locale: nextLang })
  }
  return { locale, changeLocale }
}