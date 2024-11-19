"use client";
import { SignUpCard } from "@/components/auth/sign-up-card";
import { useDictionary } from "@/hooks/use-dictionary";

const SignInPage = () => {
  const dictionary = useDictionary();
  return <SignUpCard dictionary={dictionary} />;
};

export default SignInPage;
