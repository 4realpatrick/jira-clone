import { getCurrent } from "@/features/auth/action";
import { Locale } from "@/i18n/interface";
import { redirect } from "@/i18n/routing";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;

  const currentUser = await getCurrent();

  if (!currentUser) redirect({ href: "/sign-in", locale: lang });
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
