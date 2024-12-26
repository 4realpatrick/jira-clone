import { Locale } from "@/i18n/interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { zhCN, enUS } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * @description Generate a random invite code
 * @param length length of the invite code
 * @returns
 */
export function generateInviteCode(length: number = 6) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getDateLocale(locale: Locale) {
  const obj = {
    zh: zhCN,
    en: enUS,
  };
  return obj[locale];
}
