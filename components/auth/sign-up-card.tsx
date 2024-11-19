import { Link } from "next-view-transitions";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { TDictionary } from "@/lib/dictionary";
import { cn } from "@/lib/utils";
import { AUTH_PROVIDERS } from "@/constant/auth-providers";
import { useLocale } from "@/hooks/use-locale";

interface ISignInCard {
  dictionary: TDictionary;
}

const formSchema = z.object({
  username: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const SignUpCard = (props: Readonly<ISignInCard>) => {
  const { dictionary } = props;
  const {
    pages: { sign_up },
    common: commonDictionary,
  } = dictionary;
  const locale = useLocale();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {};
  return (
    <Card className="w-full h-full md:w-[550px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">{sign_up.title}</CardTitle>
        <CardDescription>
          {sign_up.description}{" "}
          <Link
            href="/privacy"
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
          >
            <span>{commonDictionary.privacy_policy}</span>
          </Link>{" "}
          {commonDictionary.and}{" "}
          <Link
            href="/terms"
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
          >
            <span>{commonDictionary.terms}</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={commonDictionary.username_placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={commonDictionary.email_placeholder}
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
                      placeholder={commonDictionary.password_placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" className="w-full" type="submit">
              {commonDictionary.sign_up}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7 flex flex-col gap-y-4">
          {AUTH_PROVIDERS.map(({ id, icon }) => {
            return (
              <ShineButton className={buttonVariants({ size: "lg" })} key={id}>
                {icon({ className: "mr-2 size-5" })}
                {sign_up.providers[id]}
              </ShineButton>
            );
          })}
        </CardContent>
      </div>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center text-sm">
        <p>{sign_up.got_account}</p>
        <Link
          href={`/${locale}/sign-in`}
          className={cn(buttonVariants({ variant: "link" }), "px-0")}
        >
          {commonDictionary.login}
        </Link>
      </CardContent>
    </Card>
  );
};
