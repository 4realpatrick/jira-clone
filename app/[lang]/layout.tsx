import { NextIntlClientProvider } from "next-intl";
import { Locale } from "@/i18n/interface";
// Font
import { getMessages, setRequestLocale } from "next-intl/server";

const LangLayout = async ({
  params,
  children,
}: {
  params: { lang: Locale };
  children: React.ReactNode;
}) => {
  const { lang } = await params;
  const messages = await getMessages();
  setRequestLocale(lang);
  return (
    <html lang={lang}>
      <body className="antialiased min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
    // <DictionaryProvider lang={lang} dictionary={dictionary}>
    //   {/* <Navbar /> */}
    //   <div className={uiFont.className}>{children}</div>
    //   {/* <Footer
    //     dictionary={dictionary.components.footer}
    //     locale={lang}
    //     routes={dictionary.components.navbar.routes}
    //   /> */}
    //   {/* <Tools /> */}
    // </DictionaryProvider>
  );
};

export default LangLayout;
