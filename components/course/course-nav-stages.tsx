"use client";

import Link from "next/link";

import { CircleCheck } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
              <CircleCheck />
              <span>{stage.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
