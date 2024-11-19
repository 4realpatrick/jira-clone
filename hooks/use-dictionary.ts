import { DictionaryContext } from "@/components/locale/dictionary-provider";
import { useContext } from "react";

export const useDictionary = () => useContext(DictionaryContext);
