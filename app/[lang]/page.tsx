import { UserButton } from "@/components/system/user-button";
import { getCurrent } from "@/features/auth/action";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;

  const currentUser = await getCurrent();

  if (!currentUser) redirect({ href: "/sign-in", locale: lang });
  return (
    <div>
      <UserButton />
    </div>
  );
}
