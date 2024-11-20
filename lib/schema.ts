import { z } from "zod";
import { type TranslationValues } from "next-intl";

type Messages = keyof IntlMessages["validation"];

// 登录表单schema
export const getSignInFormSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    email: z
      .string({
        invalid_type_error: t?.("email_invalid"),
        required_error: t?.("email_required"),
      })
      .min(1, { message: t?.("email_required") })
      .email({ message: t?.("email_required") }),
    password: z
      .string({ required_error: t?.("password_required") })
      .min(8, { message: t?.("password_min") })
      .max(32, { message: t?.("password_max") }),
  });
};

export type TSignInForm = z.infer<ReturnType<typeof getSignInFormSchema>>;

// 注册表单schema
export const getSignUpFormSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    username: z
      .string({ required_error: t?.("username_required") })
      .trim()
      .min(3, { message: t?.("username_min") })
      .max(32, { message: t?.("username_max") }),
    email: z
      .string({
        invalid_type_error: t?.("email_invalid"),
        required_error: t?.("email_required"),
      })
      .min(1, { message: t?.("email_required") })
      .email({ message: t?.("email_invalid") }),
    password: z
      .string({ required_error: t?.("password_required") })
      .min(8, { message: t?.("password_min") })
      .max(32, { message: t?.("password_max") }),
  });
};

export type TSignUpForm = z.infer<ReturnType<typeof getSignUpFormSchema>>;
