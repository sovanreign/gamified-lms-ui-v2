"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export default function Header({ breadcrumbs = [] }) {
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear">
      <SidebarTrigger className="-ml-1" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <>
              <BreadcrumbItem key={index} className="hidden md:block">
                {breadcrumb.href ? (
                  <BreadcrumbLink
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(breadcrumb.href);
                    }}
                  >
                    {breadcrumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
