import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/interface";

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
  );
};

export default LangLayout;
