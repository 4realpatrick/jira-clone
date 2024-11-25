import { z } from "zod";
import { type TranslationValues } from "next-intl";
import translations from "@/translations/en.json";

type Messages = keyof IntlMessages["validation"];

const { validation: detaultValidationMessages } = translations;

const getValidationMessage = (
  keyword: Messages,
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return t?.(keyword) ?? detaultValidationMessages[keyword];
};

// 登录表单schema
export const getSignInFormSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    email: z
      .string({
        invalid_type_error: getValidationMessage("email_invalid"),
        required_error: getValidationMessage("email_required"),
      })
      .min(1, {
        message: getValidationMessage("email_required"),
      })
      .email({
        message: getValidationMessage("email_required"),
      }),
    password: z
      .string({
        required_error: getValidationMessage("password_required"),
      })
      .min(8, {
        message: getValidationMessage("password_min"),
      })
      .max(32, {
        message: getValidationMessage("password_max"),
      }),
  });
};

export type TSignInFormSchema = z.infer<ReturnType<typeof getSignInFormSchema>>;

// 注册表单schema
export const getSignUpFormSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    username: z
      .string({
        required_error: getValidationMessage("username_required"),
      })
      .trim()
      .min(3, {
        message: getValidationMessage("username_min"),
      })
      .max(32, {
        message: getValidationMessage("username_max"),
      }),
    email: z
      .string({
        invalid_type_error: getValidationMessage("email_invalid"),
        required_error: getValidationMessage("email_required"),
      })
      .min(1, {
        message: getValidationMessage("email_required"),
      })
      .email({
        message: getValidationMessage("email_invalid"),
      }),
    password: z
      .string({
        required_error: getValidationMessage("password_required"),
      })
      .min(8, {
        message: getValidationMessage("password_min"),
      })
      .max(32, {
        message: getValidationMessage("password_max"),
      }),
  });
};

export type TSignUpFormSchema = z.infer<ReturnType<typeof getSignUpFormSchema>>;

// 创建工作区表单schema
export const getCreateWorkspaceSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: getValidationMessage("workspace_required"),
      }),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
  });
};

export type TCreateWorkspaceSchema = z.infer<
  ReturnType<typeof getCreateWorkspaceSchema>
>;
