import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import React from "react";

export default async function WorkspaceDetailPage({
  params,
}: Readonly<{ params: { lang: Locale } }>) {
  const { lang } = await params;
  const currentUser = await getCurrent();
  if (!currentUser) {
    redirect({ href: "/sign-in", locale: lang });
  }
  return <div>workspace detail page</div>;
}
