import Image from "next/image";
import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { UserButton } from "@/components/system/user-button";
import CompositeAlert from "@/components/common/composite-alert";

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
          <CompositeAlert
            title={t("alert_title")}
            description={t("alert_description")}
          />
          {children}
        </div>
      </div>
    </main>
  );
}
