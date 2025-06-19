"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareChevronLeft,
  SquareTerminal,
} from "lucide-react";

import { CourseSwitcher } from "@/components/course/course-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CourseNavBootstrap } from "./course-nav-bootstrap";
import { CourseNavExtensions } from "./course-nav-extensions";
import { CourseNavStages } from "./course-nav-stages";

export function CourseSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <CourseSwitcher />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <CourseNavBootstrap />
          <CourseNavStages />
        </SidebarGroup>
        <CourseNavExtensions />
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
              <SquareChevronLeft />
              <span className="font-bold">Collapse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
