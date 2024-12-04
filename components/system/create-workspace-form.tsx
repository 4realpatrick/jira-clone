"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { DottedSeparator } from "@/components/common/dotted-separator";
import { NeubrutalismButton } from "@/components/syntax/button/neubrutalism";
import { getCreateWorkspaceSchema, TCreateWorkspaceSchema } from "@/lib/schema";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface ICreateWorkspaceFormProps {
  handleCancel?: () => void;
}

export const CreateWorkspaceForm: React.FC<ICreateWorkspaceFormProps> = ({
  handleCancel,
}) => {
  const validT = useTranslations("validation");
  const t = useTranslations("pages.workspace");
  const ct = useTranslations("common");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<TCreateWorkspaceSchema>({
    resolver: zodResolver(getCreateWorkspaceSchema(validT)),
    defaultValues: {
      name: "",
      description: "",
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
  const onSumbit = (values: TCreateWorkspaceSchema) => {
    createWorkspace(
      {
        form: {
          ...values,
          image: values.image instanceof File ? values.image : "",
        },
      },
      {
        onSuccess({ data }) {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };
  return (
    <Card className="w-full h-full border-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">{t("form.title")}</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder={ct("workspace_placeholder")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.description")}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isPending}
                        placeholder={ct("workspace_description_placeholder")}
                        maxLength={50}
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
                    <FormLabel>{t("form.image")}</FormLabel>
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
                            {t("form.image_tip", { max: "1" })}
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              variant="destructive"
                              disabled={isPending}
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange("");
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              {t("form.remove")}
                            </Button>
                          ) : (
                            <NeubrutalismButton
                              type="button"
                              disabled={isPending}
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              {t("form.upload")}
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
                    {ct("cancel")}
                  </Button>
                )}
                <Button size="lg" type="submit" disabled={isPending}>
                  {ct("submit")}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
