"use client";

import Link from "next/link";

import { StatusIcon } from "@/components/stage/stage-status";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StageStatus } from "@/types/stage-status";

interface Props {
  slug: string;
  stages: Array<{ slug: string; name: string }>;
}

export function CourseNavStages({ slug, stages }: Props) {
  return (
    <SidebarMenu>
      {stages.map((stage) => (
        <SidebarMenuItem key={stage.slug}>
          <SidebarMenuButton asChild>
            <Link href={`/courses/${slug}/stages/${stage.slug}`}>
              <StatusIcon status={StageStatus.Pending} />
              <span>{stage.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
