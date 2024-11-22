import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n/interface";
import { ThemeProvider } from "@/components/system/theme/theme-provider";
import { ThemeColorProvider } from "@/components/system/theme/theme-color-provider";

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
    <html lang={lang} suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeColorProvider />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default LangLayout;
