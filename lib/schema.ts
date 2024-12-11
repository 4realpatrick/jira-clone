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
        invalid_type_error: getValidationMessage("email_invalid", t),
        required_error: getValidationMessage("email_required", t),
      })
      .min(1, {
        message: getValidationMessage("email_required", t),
      })
      .email({
        message: getValidationMessage("email_required", t),
      }),
    password: z
      .string({
        required_error: getValidationMessage("password_required", t),
      })
      .min(8, {
        message: getValidationMessage("password_min", t),
      })
      .max(32, {
        message: getValidationMessage("password_max", t),
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
        required_error: getValidationMessage("username_required", t),
      })
      .trim()
      .min(3, {
        message: getValidationMessage("username_min", t),
      })
      .max(32, {
        message: getValidationMessage("username_max", t),
      }),
    email: z
      .string({
        invalid_type_error: getValidationMessage("email_invalid", t),
        required_error: getValidationMessage("email_required", t),
      })
      .min(1, {
        message: getValidationMessage("email_required", t),
      })
      .email({
        message: getValidationMessage("email_invalid", t),
      }),
    password: z
      .string({
        required_error: getValidationMessage("password_required", t),
      })
      .min(8, {
        message: getValidationMessage("password_min", t),
      })
      .max(32, {
        message: getValidationMessage("password_max", t),
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
      .string({
        required_error: getValidationMessage("workspace_required", t),
      })
      .trim()
      .min(1, {
        message: getValidationMessage("workspace_required", t),
      }),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
    description: z.string().optional(),
  });
};

export type TCreateWorkspaceSchema = z.infer<
  ReturnType<typeof getCreateWorkspaceSchema>
>;

// 更新工作区表单schema
export const getUpdateWorkspaceSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: getValidationMessage("workspace_required", t),
      })
      .optional(),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
    description: z.string().optional(),
  });
};

export type TUpdateWorkspaceSchema = z.infer<
  ReturnType<typeof getUpdateWorkspaceSchema>
>;

export const getInviteMemberSchema = () => {
  return z.object({
    code: z.string(),
  });
};

// 创建项目表单schema
export const getCreateProjectSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    name: z
      .string({
        required_error: getValidationMessage("project_required", t),
      })
      .trim()
      .min(1, {
        message: getValidationMessage("project_required", t),
      }),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
    workspaceId: z.string(),
  });
};

export type TCreateProjectSchema = z.infer<
  ReturnType<typeof getCreateProjectSchema>
>;

// 更新项目表单schema
export const getUpdateProjectSchema = (
  t?: (key: Messages, object?: TranslationValues | undefined) => string
) => {
  return z.object({
    name: z
      .string({
        required_error: getValidationMessage("project_required", t),
      })
      .trim()
      .min(1, {
        message: getValidationMessage("project_required", t),
      }),
    image: z
      .union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
      ])
      .optional(),
  });
};

export type TUpdateProjectSchema = z.infer<
  ReturnType<typeof getUpdateProjectSchema>
>;
