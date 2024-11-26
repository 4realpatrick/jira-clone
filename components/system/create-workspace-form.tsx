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
import { DottedSeparator } from "@/components/common/dotted-separator";
import { NeubrutalismButton } from "@/components/syntax/button/neubrutalism";
import { getCreateWorkspaceSchema, TCreateWorkspaceSchema } from "@/lib/schema";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";

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
  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<TCreateWorkspaceSchema>({
    resolver: zodResolver(getCreateWorkspaceSchema(validT)),
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
        onSuccess() {
          // TODO Redirect to new workspace
          form.reset();
        },
      }
    );
  };
  return (
    <Card className="w-full h-full">
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
                        placeholder={ct("workspace_placeholder")}
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
                        <p>{t("form.image")}</p>
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
                        <NeubrutalismButton
                          type="button"
                          disabled={isPending}
                          className="w-fit mt-2"
                          onClick={() => inputRef.current?.click()}
                        >
                          {t("form.upload")}
                        </NeubrutalismButton>
                      </div>
                    </div>
                  </div>
                )}
              />
              <DottedSeparator />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleCancel}
                  disabled={isPending}
                >
                  {ct("cancel")}
                </Button>
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