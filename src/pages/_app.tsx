import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@config/query-client";
import { I18nextProvider } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import i18n from "@/lib/i18n";
import Header from "@shared/components/Header";
import { MainLayout } from "@shared/components/MainLayout";

const googleClientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "764359469080-2dfsv4fsddgmjd1g27r9kp0ql2pkhpo7.apps.googleusercontent.com";

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
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          {/* <LanguageSwitcher /> */}
          <Header />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </I18nextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
