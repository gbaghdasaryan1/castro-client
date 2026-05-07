// lib/i18n.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Initialize once at module load so useTranslation() works before pageProps arrive.
// Resources are empty here; _app.tsx populates them from getServerSideProps pageProps.
i18next.use(initReactI18next).init({
  lng: 'hy',
  fallbackLng: 'en',
  resources: {},
  interpolation: { escapeValue: false },
  react: { useSuspense: false, nsMode: 'fallback' },
});

export default i18next;

export async function loadTranslations(lang: string, namespace = 'common') {
  const res = await fetch(`${API_URL}/translations/lang/${lang}/namespace/${namespace}`);
  return res.json();
}