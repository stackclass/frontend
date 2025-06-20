"use client";

import { CircleCheck, CircleEllipsis, SquareCode } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function CourseNavStages({ slug }: { slug: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/ry8`}>
            <CircleCheck />
            <span>Scanning: Empty file</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/ol4`}>
            <CircleCheck />
            <span>Scanning: Parenttheses</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/oe8`}>
            <CircleEllipsis />
            <span>Scanning: Braces</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/scanning-single-char-tokens`}>
            <SquareCode />
            <span>Scanning: Other single-character tokens</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/scanning-lexical-errors`}>
            <SquareCode />
            <span>Scanning: Lexical errors</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/scanning-assignment-equality`}>
            <SquareCode />
            <span>Scanning: Assignment & equality Operators</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/courses/${slug}/stages/scanning-negation-inequality`}>
            <SquareCode />
            <span>Scanning: Negation & inequality operators</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
