import { i18n } from "./config";
export type TTranslation = typeof import("@/translations/zh.json");
export type Locale = (typeof i18n)["locales"][number];
