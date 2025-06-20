"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function CourseNavBootstrap({ slug }: { slug: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/introduction`}>
            <CircleCheck />
            <span>Introduction</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/setup`}>
            <CircleCheck />
            <span>Repository Setup</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
