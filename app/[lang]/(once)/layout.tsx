import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/routing";
import { UserButton } from "@/components/system/user-button";

export default async function OnceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen w-full">
      <div className="mx-auto max-w-screen-lg p-4">
        <nav className="flex justify-between items-center h-[76px]">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={56} width={128} />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4 max-w-screen-md">
          {children}
        </div>
      </div>
    </main>
  );
}
