"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FiLoader } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShineButton } from "@/components/syntax/button/shine";
import { cn } from "@/lib/utils";
import { AUTH_PROVIDERS } from "@/constant/auth-providers";
import { getSignInFormSchema, TSignInForm } from "@/lib/schema";
import { useLogin } from "@/features/auth/api/use-login";
import { TransitionLink } from "@/components/common/link";

export const SignInCard = () => {
  const t = useTranslations("pages.sign_in");
  const ct = useTranslations("common");
  const validT = useTranslations("validation");
  const { mutate: login, isPending } = useLogin();
  const form = useForm<TSignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(getSignInFormSchema(validT)),
  });
  const onSubmit = (values: TSignInForm) => {
    login({ json: values });
  };
  return (
    <Card className="w-full h-full md:w-[550px]">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>
          {t("description")}{" "}
          <TransitionLink
            href="/privacy"
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
          >
            <span>{ct("privacy_policy")}</span>
          </TransitionLink>{" "}
          {ct("and")}{" "}
          <TransitionLink
            href="/terms"
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
          >
            <span>{ct("terms")}</span>
          </TransitionLink>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={ct("email_placeholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={ct("password_placeholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              {isPending && <FiLoader className="size-4 mr-2 animate-spin" />}
              {ct("login")}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7 flex flex-col gap-y-4">
          {AUTH_PROVIDERS.map(({ id, icon }) => {
            return (
              <ShineButton
                className={buttonVariants({ size: "lg" })}
                key={id}
                disabled={isPending}
              >
                {icon({ className: "mr-2 size-5" })}
                {t(`providers.${id}`)}
              </ShineButton>
            );
          })}
        </CardContent>
      </div>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center text-sm">
        <p>{t("got_account")}</p>
        <TransitionLink
          href="/sign-up"
          className={cn(buttonVariants({ variant: "link" }), "px-0")}
          replace
        >
          {ct("sign_up")}
        </TransitionLink>
      </CardContent>
    </Card>
  );
};
