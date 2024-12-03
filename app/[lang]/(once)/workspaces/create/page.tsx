import { CreateWorkspaceForm } from "@/components/system/create-workspace-form";
import { getCurrent } from "@/features/auth/queries";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

const CreateWorkspacePage = async () => {
  const currentUser = await getCurrent();
  const locale = (await getLocale()) as Locale;

  if (!currentUser) {
    redirect({ href: "/sign-in", locale });
  }

  return <CreateWorkspaceForm />;
};
export default CreateWorkspacePage;
