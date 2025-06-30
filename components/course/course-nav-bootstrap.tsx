"use client";

import { useCourse } from "@/app/(course)/layout";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getIntroductionStatus, getSetupStatus } from "@/types/stage-status";
import { ArrowRight, Settings2 } from "lucide-react";
import Link from "next/link";
import { StatusIcon } from "../stage/stage-status";

export function CourseNavBootstrap({ slug }: { slug: string }) {
  const { userCourse } = useCourse();

  const introStatus = getIntroductionStatus(userCourse);
  const setupStatus = getSetupStatus(userCourse);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/introduction`}>
            <StatusIcon
              status={introStatus}
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
            <StatusIcon status={setupStatus} icon={<Settings2 size={16} />} />
            <span>Repository Setup</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
