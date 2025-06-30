"use client";

import Link from "next/link";

import { StatusIcon } from "@/components/stage/stage-status";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StageWithState } from "@/types/stage";
import { getStageStatus } from "@/types/stage-status";

interface Props {
  slug: string;
  title: string;
  stages: Array<StageWithState>;
}

export function CourseNavExtensions({ slug, title, stages }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="border-b mb-2 uppercase">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {stages.map((stage) => (
          <SidebarMenuItem key={stage.stage.slug}>
            <SidebarMenuButton asChild>
              <Link href={`/courses/${slug}/stages/${stage.stage.slug}`}>
                <StatusIcon status={getStageStatus(stage)} />
                <span>{stage.stage.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
