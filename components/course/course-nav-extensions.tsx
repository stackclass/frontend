"use client";

import Link from "next/link";

import { SquareCode } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Props {
  slug: string;
  title: string;
  stages: Array<{ slug: string; name: string }>;
}

export function CourseNavExtensions({ slug, title, stages }: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="border-b mb-2 uppercase">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu>
        {stages.map((stage) => (
          <SidebarMenuItem key={stage.slug}>
            <SidebarMenuButton asChild>
              <Link href={`/courses/${slug}/stages/${stage.slug}`}>
                <SquareCode />
                <span>{stage.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
