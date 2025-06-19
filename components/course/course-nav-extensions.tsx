"use client";

import { CircleCheck, SquareCode } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function CourseNavExtensions() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="border-b mb-2 uppercase">
        Parsing Expressions
      </SidebarGroupLabel>
      <SidebarGroupAction title="Click here to configure extensions">
        <CircleCheck />
      </SidebarGroupAction>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <SquareCode />
            <span>Booleans & Nil</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <SquareCode />
            <span>Number literals</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <SquareCode />
            <span>String literals</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <SquareCode />
            <span>Parentheses</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
