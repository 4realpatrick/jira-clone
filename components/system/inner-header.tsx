import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaHome } from "react-icons/fa";
import { TransitionLink } from "../common/link";
import { Fragment } from "react";
interface IBreadcrumb {
  breadcrumbs: {
    name: string;
    href?: string;
  }[];
  showMenuTrigger?: boolean;
}

export type TBreadcrumbItem = IBreadcrumb["breadcrumbs"][number];

export const InnerHeader: React.FC<IBreadcrumb> = ({
  breadcrumbs,
  showMenuTrigger = true,
}) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      {showMenuTrigger && (
        <>
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </>
      )}
      <Breadcrumb>
        <BreadcrumbList className="transition-colors select-none">
          <BreadcrumbItem>
            <TransitionLink href="/" className="hover:text-primary">
              <FaHome className="size-4" />
            </TransitionLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbs.map(({ name, href }, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Fragment key={name}>
                <BreadcrumbItem>
                  {href ? (
                    <TransitionLink href={href} className="hover:text-primary">
                      {name}
                    </TransitionLink>
                  ) : (
                    name
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
