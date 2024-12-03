import { SignUpCard } from "@/components/system/sign-up-card";
import { Locale } from "@/i18n/interface";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "@/i18n/routing";

const SignInPage = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;

  const currentUser = await getCurrent();

  if (currentUser) redirect({ href: "/", locale: lang });
  return <SignUpCard />;
};

export default SignInPage;
