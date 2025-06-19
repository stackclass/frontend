"use client";

import { CircleCheck } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function CourseNavBootstrap() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <CircleCheck />
          <span>Introduction</span>
        </SidebarMenuButton>
        <SidebarMenuButton>
          <CircleCheck />
          <span>Repository Setup</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
