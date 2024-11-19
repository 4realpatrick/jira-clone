import { LocaleContext } from "@/components/locale/dictionary-provider";
import { useContext } from "react";

export const useLocale = () => useContext(LocaleContext);
