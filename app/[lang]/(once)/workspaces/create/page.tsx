import { getLocale, getTranslations } from "next-intl/server";
import { CreateWorkspaceForm } from "@/components/system/create-workspace-form";
import CompositeAlert from "@/components/common/composite-alert";
import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";

export default async function CreateWorkspacePage() {
  const currentUser = await getCurrent();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.workspace.create");

  if (!currentUser) {
    redirect({ href: "/sign-in", locale });
  }

  return (
    <>
      <CompositeAlert
        title={t("alert_title")}
        description={t("alert_description")}
      />
      <CreateWorkspaceForm />
    </>
  );
}
