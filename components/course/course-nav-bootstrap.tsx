"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StageStatus } from "@/types/stage-status";
import { ArrowRight, Settings2 } from "lucide-react";
import Link from "next/link";
import { StatusIcon } from "../stage/stage-status";

export function CourseNavBootstrap({ slug }: { slug: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/introduction`}>
            <StatusIcon
              status={StageStatus.Pending}
              icon={<ArrowRight size={16} />}
              className="rounded-full border-green-700 text-green-700"
            />
            <span>Introduction</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/setup`}>
            <StatusIcon
              status={StageStatus.Completed}
              icon={<Settings2 size={16} />}
            />
            <span>Repository Setup</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
