"use client";
import { SignInCard } from "@/components/auth/sign-in-card";
import { useDictionary } from "@/hooks/use-dictionary";

const SignInPage = () => {
  const dictionary = useDictionary();
  return <SignInCard dictionary={dictionary} />;
};

export default SignInPage;
