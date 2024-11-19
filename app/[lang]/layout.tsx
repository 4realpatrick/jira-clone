// Cmp
import DictionaryProvider from "@/components/locale/dictionary-provider";
// import Navbar from "@/components/exclusive/navbar";
// import { Tools } from "./_components/tools";
// import { Footer } from "@/components/exclusive/footer";
// Types
import { Locale } from "@/i18n.config";
import { NextFont } from "next/dist/compiled/@next/font";
// Utils
import { getDictionary } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
// Font
import { chineseFont, englishFont } from "@/lib/font";

const font: {
  [key in Locale]: NextFont;
} = {
  zh: chineseFont,
  en: englishFont,
};

const LangLayout = async ({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <DictionaryProvider lang={lang} dictionary={dictionary}>
      {/* <Navbar /> */}
      <main className={cn(font[lang].className)}>{children}</main>
      {/* <Footer
        dictionary={dictionary.components.footer}
        locale={lang}
        routes={dictionary.components.navbar.routes}
      /> */}
      {/* <Tools /> */}
    </DictionaryProvider>
  );
};

export default LangLayout;
