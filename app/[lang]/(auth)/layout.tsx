"use client";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { TransitionLink } from "@/components/common/link";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Readonly<IAuthLayoutProps>) => {
  const t = useTranslations("common");
  const pathname = usePathname();

  const isSignUp = useMemo(() => pathname.includes("sign-up"), [pathname]);

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-screen-2xl">
        <nav className="flex justify-between items-center shadow-sm py-2 px-4">
          <Image src="/logo.svg" width={152} height={56} alt="Logo" />
          <div className="flex items-center gap-2">
            <TransitionLink
              href={`/${isSignUp ? "sign-in" : "sign-up"}`}
              className={buttonVariants({})}
              replace
            >
              {isSignUp ? t("login") : t("sign_up")}
            </TransitionLink>
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
