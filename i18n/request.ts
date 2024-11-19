import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { Locale, TTranslation } from "./interface";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) as Locale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`))
      .default as TTranslation,
  };
});
