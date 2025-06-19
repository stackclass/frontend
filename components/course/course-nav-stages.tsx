"use client";

import { CircleCheck, CircleEllipsis, SquareCode } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function CourseNavStages() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <CircleCheck />
          <span>Scanning: Empty file</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <CircleCheck />
          <span>Scanning: Parenttheses</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <CircleEllipsis />
          <span>Scanning: Braces</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <SquareCode />
          <span>Scanning: Other single-character tokens</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <SquareCode />
          <span>Scanning: Lexical errors</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <SquareCode />
          <span>Scanning: Assignment & equality Operators</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <SquareCode />
          <span>Scanning: Negation & inequality operators</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
