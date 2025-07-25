"use client";

import { useCourseContext } from "@/app/(course)/layout";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { getIntroductionStatus, getSetupStatus } from "@/types/stage-status";
import { ArrowRight, Settings2 } from "lucide-react";
import Link from "next/link";
import { StatusIcon } from "../stage/stage-status";

export function CourseNavBootstrap({ slug }: { slug: string }) {
  const { userCourse } = useCourseContext();
  const { currentSlug } = useNavigation();

  const introStatus = getIntroductionStatus(userCourse);
  const setupStatus = getSetupStatus(userCourse);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={currentSlug === "introduction"}>
          <Link href={`/courses/${slug}/introduction`}>
            <StatusIcon
              status={introStatus}
              icon={<ArrowRight size={16} />}
              className="rounded-full border-primary text-primary"
            />
            <span>Introduction</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={currentSlug === "setup"}>
          <Link href={`/courses/${slug}/setup`}>
            <StatusIcon status={setupStatus} icon={<Settings2 size={16} />} />
            <span>Repository Setup</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
