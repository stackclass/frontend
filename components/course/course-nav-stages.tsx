"use client";

import Link from "next/link";

import { StatusIcon } from "@/components/stage/stage-status";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { StageWithState } from "@/types/stage";
import { getStageStatus } from "@/types/stage-status";

interface Props {
  slug: string;
  stages: Array<StageWithState>;
}

export function CourseNavStages({ slug, stages }: Props) {
  const { currentSlug } = useNavigation();

  return (
    <SidebarMenu>
      {stages.map((stage) => (
        <SidebarMenuItem key={stage.stage.slug}>
          <SidebarMenuButton
            isActive={currentSlug === stage.stage.slug}
            asChild
          >
            <Link href={`/courses/${slug}/stages/${stage.stage.slug}`}>
              <StatusIcon status={getStageStatus(stage.userStage)} />
              <span>{stage.stage.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
