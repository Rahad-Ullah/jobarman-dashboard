"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="gap-4 p-0 bg-secondary-foreground">
      {/* <SidebarGroupLabel className="flex items-center gap-2 text-white">
        <span>Menu</span> <span className="flex-1 bg-gray-200 h-0.5"></span>
      </SidebarGroupLabel> */}
      <SidebarMenu className="gap-0">
        {items.map((item, idx: number) => {
          const isActive = item.url === pathname;

          // Find the index of the active item
          const activeIndex = items.findIndex((i) => i.url === pathname);

          // Neighbors
          const isPrev = idx === activeIndex - 1;
          const isNext = idx !== 0 && idx === activeIndex + 1;

          let styles = "";
          let wrapperStyles = "";

          if (isActive) {
            styles =
              "bg-secondary-foreground hover:bg-secondary-foreground active:bg-secondary-foreground text-primary-foreground hover:text-primary-foreground active:text-primary-foreground font-semibold rounded-lg";
            wrapperStyles = "bg-primary-foreground";
          } else if (isPrev) {
            // prev neighbor gets bottom curve
            styles = "bg-primary-foreground";
          } else if (isNext) {
            // next neighbor gets top curve
            styles = "bg-primary-foreground";
          }

          return (
            <Link href={item.url} key={idx}>
              <SidebarMenuItem className={wrapperStyles}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`text-white hover:text-white bg-primary-foreground hover:bg-primary-foreground active:bg-primary-foreground active:text-white rounded-none overflow-hidden ${styles}`}
                >
                  {item.icon && (
                    <span className="icon">
                      <item.icon />
                    </span>
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
