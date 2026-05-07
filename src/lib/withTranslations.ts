/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadTranslations } from './i18n';

export function withTranslations(namespaces = ['common']) {
  return async (context: any) => {
    const lang = context.locale || context.req?.cookies?.lang || 'hy';
    const translations: Record<string, any> = {};

    for (const ns of namespaces) {
      try {
        translations[ns] = await loadTranslations(lang, ns);
      } catch (error) {
        console.error(
          `[withTranslations] Failed to load namespace "${ns}" for lang "${lang}"`,
          error,
        );
        translations[ns] = {};
      }
    }

    return {
      props: {
        translations,
        lang,
      },
    };
  };
}