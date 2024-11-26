import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/routing";
import { UserButton } from "@/components/system/user-button";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getTranslations } from "next-intl/server";
export default async function OnceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations("pages.workspace.create");
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto max-w-screen-lg p-4">
        <nav className="flex justify-between items-center h-[76px]">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={56} width={128} />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4 gap-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle className="text-sm">{t("alert_title")}</AlertTitle>
            <AlertDescription className="font-semibold">
              {t("alert_description")}
            </AlertDescription>
          </Alert>
          {children}
        </div>
      </div>
    </main>
  );
}
