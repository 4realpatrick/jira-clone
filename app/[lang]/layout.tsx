// Cmp
import DictionaryProvider from "@/components/locale/dictionary-provider";
// import Navbar from "@/components/exclusive/navbar";
// import { Tools } from "./_components/tools";
// import { Footer } from "@/components/exclusive/footer";
// Types
import { Locale } from "@/i18n.config";
// Utils
import { getDictionary } from "@/lib/dictionary";
// Font
import { uiFont } from "@/lib/font";

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
      <div className={uiFont.className}>{children}</div>
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
