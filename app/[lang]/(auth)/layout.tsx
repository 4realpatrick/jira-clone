"use client";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Locale } from "@/i18n/interface";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Readonly<IAuthLayoutProps>) => {
  const lang = useLocale() as Locale;
  const t = useTranslations("common");
  const pathname = usePathname();
  const isSignUp = useMemo(
    () => pathname?.split("/")[2] === "sign-up",
    [pathname]
  );

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" width={152} height={56} alt="Logo" />
          <div className="flex items-center gap-2">
            <Link
              href={`/${lang}/${isSignUp ? "sign-in" : "sign-up"}`}
              className={buttonVariants({})}
              replace
            >
              {isSignUp ? t("login") : t("sign_up")}
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
