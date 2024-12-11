"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { NeubrutalismButton } from "@/components/syntax/button/neubrutalism";
import { getUpdateProjectSchema, TUpdateProjectSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { TProject } from "@/interface/project";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

interface IUpdateProjectFormProps {
  handleCancel?: () => void;
  initialValues: TProject;
}

export const EditProjectForm: React.FC<IUpdateProjectFormProps> = ({
  initialValues,
  handleCancel,
}) => {
  const validT = useTranslations("validation");
  const t = useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProject, isPending } = useUpdateProject();

  const form = useForm<TUpdateProjectSchema>({
    resolver: zodResolver(getUpdateProjectSchema(validT)),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file?.size > 1024 * 1024) {
        form.setError("image", {
          type: "custom",
          message: validT("image_size_exceeded", { max: 1 }),
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }
      form.setValue("image", file);
    }
  };
  const onSumbit = (values: TUpdateProjectSchema) => {
    updateProject({
      form: {
        ...values,
        image: values.image instanceof File ? values.image : "",
      },
      param: { projectId: initialValues.$id },
    });
  };
  return (
    <Card className="border-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl text-primary">
          <Link href="#general" className="underline-link" id="general">
            {t("pages.projects.setting.title")}
          </Link>
        </CardTitle>
        <CardDescription>
          {t("pages.projects.setting.description")}
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pages.projects.form.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder={t("common.project_placeholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pages.projects.form.image")}</FormLabel>
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative rounded-md">
                            <Image
                              alt="Workspace image"
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px]" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col text-sm">
                          <p className="text-muted-foreground text-xs">
                            {t("pages.projects.form.image_tip", { max: "1" })}
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                            max={1024 * 1024}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isPending}
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange("");
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              {t("pages.projects.form.remove")}
                            </Button>
                          ) : (
                            <NeubrutalismButton
                              type="button"
                              disabled={isPending}
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              {t("pages.projects.form.upload")}
                            </NeubrutalismButton>
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DottedSeparator />
              <div
                className={cn(
                  "flex items-center justify-between",
                  !!!handleCancel && "justify-end"
                )}
              >
                {!!handleCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleCancel}
                    disabled={isPending}
                  >
                    {t("common.cancel")}
                  </Button>
                )}
                <Button size="lg" type="submit" disabled={isPending}>
                  {t("common.submit")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
