"use client";

import * as React from "react";
import { SquareChevronLeft } from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CourseNavBootstrap } from "./course-nav-bootstrap";
import { CourseNavExtensions } from "./course-nav-extensions";
import { CourseNavStages } from "./course-nav-stages";
import { useCourse } from "@/app/(course)/layout";

export function CourseSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const course = useCourse();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <CourseSwitcher course={course} />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <CourseNavBootstrap slug={course.slug} />
          <CourseNavStages slug={course.slug} />
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
