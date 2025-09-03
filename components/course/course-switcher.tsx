"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { CourseDetail } from "@/types/course";
import { Command } from "lucide-react";

interface CourseSwitcherProps {
  course: CourseDetail;
}

export function CourseSwitcher({ course }: CourseSwitcherProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex gap-2 items-center">
          <div className="bg-sidebar-primary text-white flex aspect-square size-8 items-center justify-center rounded-lg">
            <Command className="size-4" />
          </div>
          <div className="flex-1 text-left font-bold text-lg leading-tight">
            {course.name}
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
