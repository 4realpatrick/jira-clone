"use client";
import Image from "next/image";
import { headers } from "next/headers";
import { buttonVariants } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useLocale } from "@/hooks/use-locale";
import { useDictionary } from "@/hooks/use-dictionary";

interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Readonly<IAuthLayoutProps>) => {
  const lang = useLocale();
  const { common } = useDictionary();
  const pathname = usePathname();
  const isSignUp = pathname?.split("/")[2] === "sign-up";

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
              {isSignUp ? common.login : common.sign_up}
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
