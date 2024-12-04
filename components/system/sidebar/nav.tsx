"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Params } from "next/dist/server/request/params";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import { NAV_DATA } from "@/constant/nav-data";

const getParamFromStr = (str: string, params: Params) => {
  let result = "";
  const matcher = /\{([^}]+)\}/g;
  const matches = str.match(matcher);
  if (matches) {
    const newUrl = matches.reduce((acc, match) => {
      const key = match.replace(/[{}]/g, "");
      const value = params[key] as string;
      if (value) {
        acc = acc.replace(match, value);
      }
      return acc;
    }, str);
    result = newUrl;
  } else {
    result = str;
  }
  return result;
};

export function NavMain() {
  const params = useParams();
  const t = useTranslations("nav");
  const navData = useMemo(() => {
    return NAV_DATA.map((item) => {
      let newItem = { ...item };
      if (item.url) {
        const newUrl = getParamFromStr(item.url, params);
        newItem.url = newUrl;
      }
      if (item.items) {
        newItem.items = item.items.map((subItem) => {
          const newSubItem = { ...subItem };
          if (subItem.url) {
            const newUrl = getParamFromStr(subItem.url, params);
            newSubItem.url = newUrl;
          }
          return newSubItem;
        });
      }
      return newItem;
    });
  }, [params]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navData.map((item) => (
          <Collapsible key={item.key} asChild className="group/collapsible">
            <SidebarMenuItem>
              {!!item.items ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={t(`${item.key}`)}>
                      {item.icon && <item.icon />}
                      <span>{t(`${item.key}`)}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={t(`${subItem.key}`)}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              {subItem.icon && (
                                <subItem.icon className="!size-3" />
                              )}
                              <span>{t(`${subItem.key}`)}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <SidebarMenuButton tooltip={t(`${item.key}`)}>
                  {item.icon && <item.icon />}
                  <Link href={item.url!}>
                    <span>{t(`${item.key}`)}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
