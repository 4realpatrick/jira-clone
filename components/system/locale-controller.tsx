"use client";
// Cmp
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Constant
import { i18n } from "@/i18n/config";
// Hooks
import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Locale } from "@/i18n/interface";

export const LanguageController = () => {
  const t = useTranslations("components.language_controller");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (value: string) => {
    if (!pathname) return "/";
    router.replace(pathname, {
      locale: value,
    });
  };
  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder={t("language_placeholder")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-primary">{t("language")}</SelectLabel>
          {i18n.locales.map((lang) => (
            <SelectItem value={lang} key={lang}>
              {t(`languages.${lang}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
