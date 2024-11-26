import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { Locale } from "@/i18n/interface";
import { ThemeProvider } from "@/components/system/theme/theme-provider";
import { ThemeColorProvider } from "@/components/system/theme/theme-color-provider";
import { SIDEBAR_COOKIE_NAME, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
const LangLayout = async ({
  params,
  children,
}: {
  params: Promise<{ lang: Locale }>;
  children: React.ReactNode;
}) => {
  const { lang } = await params;
  const messages = await getMessages();
  setRequestLocale(lang);

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value ?? "true";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="antialiased min-h-screen w-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeColorProvider />
          <NextIntlClientProvider messages={messages}>
            <SidebarProvider defaultOpen={defaultOpen === "true"}>
              <Toaster richColors expand />
              {children}
            </SidebarProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default LangLayout;
