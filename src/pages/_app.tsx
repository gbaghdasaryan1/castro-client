import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@config/query-client";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import LanguageSwitcher from "@shared/ui/language-switcher";

export default function App({ Component, pageProps }: AppProps) {
  const { translations, lang } = pageProps;

  useEffect(() => {
    if (translations && lang) {
      Object.entries(translations).forEach(([ns, bundle]) => {
        i18n.addResourceBundle(lang, ns, bundle, true, true);
      });
      i18n.changeLanguage(lang);
    }
  }, [lang, translations]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>

        <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 100 }}>
          <LanguageSwitcher />
        </div>

        <Component {...pageProps} />
      </I18nextProvider>
    </QueryClientProvider>
  );
}
