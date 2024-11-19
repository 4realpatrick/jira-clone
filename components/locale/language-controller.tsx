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
import { i18n } from "@/i18n.config";
// Hooks
import { useDictionary } from "@/hooks/use-dictionary";
import { useLocale } from "@/hooks/use-locale";
import { usePathname, useRouter } from "next/navigation";

const LanguageController = () => {
  const {
    components: { language_controller },
  } = useDictionary();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const handleLanguageChange = (value: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = value;
    router.replace(segments.join("/"));
  };
  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder={language_controller.language_placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-primary">
            {language_controller.language}
          </SelectLabel>
          {i18n.locales.map((lang) => (
            <SelectItem value={lang} key={lang}>
              {language_controller.languages[lang]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageController;
