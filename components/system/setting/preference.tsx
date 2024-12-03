"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useMedia } from "react-use";
import { MdLanguage, MdOutlineDarkMode } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { LanguageController } from "@/components/system/locale-controller";
import { ThemeColorController } from "@/components/system/theme/theme-color-controller";
import { ThemeController } from "@/components/system/theme/theme-controller";
import { DottedSeparator } from "@/components/common/dotted-separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CompositeAlert from "@/components/common/composite-alert";
import { Link } from "@/i18n/routing";

export const PreferenceSetting = () => {
  const t = useTranslations("pages.setting");
  const isPC = useMedia("(min-width: 1024px)", true);

  const settings = useMemo(() => {
    return [
      {
        title: t("preference.theme"),
        description: t("preference.theme_description"),
        id: "mode",
        icon: MdOutlineDarkMode,
        cmp: <ThemeController type={isPC ? "expand" : "dropdown"} />,
      },
      {
        title: t("preference.theme_color"),
        description: t("preference.theme_color_description"),
        id: "theme",
        icon: IoIosColorPalette,
        cmp: <ThemeColorController type={isPC ? "expand" : "dropdown"} />,
      },
      {
        title: t("preference.language"),
        description: t("preference.language_description"),
        id: "language",
        icon: MdLanguage,
        cmp: <LanguageController />,
      },
    ];
  }, [isPC]);

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          <Link href="#preference" className="underline-link" id="preference">
            {t("preference.title")}
          </Link>
        </CardTitle>
        <CardDescription>{t("preference.description")}</CardDescription>
        <DottedSeparator className="!mt-3" />
      </CardHeader>
      <CardContent className="space-y-8">
        <CompositeAlert
          title={t("preference.alert_title")}
          description={t("preference.alert_description")}
        />
        {settings.map((setting) => (
          <div className="space-y-2" key={setting.id}>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {setting.title}
            </label>
            <p className="text-[0.8rem] text-muted-foreground">
              {setting.description}
            </p>
            {setting.cmp}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
