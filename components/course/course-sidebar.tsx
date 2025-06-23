"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { SquareChevronLeft } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import { CourseSwitcher } from "@/components/course/course-switcher";
import { CourseNavBootstrap } from "@/components/course/course-nav-bootstrap";
import { CourseNavExtensions } from "@/components/course/course-nav-extensions";
import { CourseNavStages } from "@/components/course/course-nav-stages";
import { Loading } from "@/components/common/loading";

import type { Stage } from "@/types/stage";
import type { Extension } from "@/types/extension";

import { useCourse } from "@/app/(course)/layout";

interface ExtensionGroup {
  title: string;
  slug: string;
  stages: Stage[];
}

export function CourseSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const { course, stages } = useCourse();
  const { slug } = useParams<{ slug: string }>();
  const [extensionGroups, setExtensionGroups] = React.useState<
    ExtensionGroup[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchExtensions = async () => {
      try {
        // 1. Fetch all extensions
        const response = await fetch(`/api/courses/${slug}/extensions`);
        if (!response.ok) throw new Error("Failed to fetch extensions");
        const extensions: Extension[] = await response.json();

        // 2.Group stages
        const grouped = stages.reduce<ExtensionGroup[]>((groups, stage) => {
          if (stage.extension_slug) {
            const extension = extensions.find(
              (ext) => ext.slug === stage.extension_slug,
            );
            const existingGroup = groups.find(
              (g) => g.slug === stage.extension_slug,
            );

            if (existingGroup) {
              existingGroup.stages.push(stage);
            } else {
              groups.push({
                title: extension?.name || "Extension", // 使用 extension.name
                slug: stage.extension_slug,
                stages: [stage],
              });
            }
          }
          return groups;
        }, []);

        setExtensionGroups(grouped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExtensions();
  }, [slug, stages]);

  const baseStages = stages.filter((stage) => !stage.extension_slug);

  if (loading) return <Loading message="Loading extensions..." />;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <CourseSwitcher course={course} />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <CourseNavBootstrap slug={course.slug} />
          <CourseNavStages slug={course.slug} stages={baseStages} />
        </SidebarGroup>

        {/* Extension Stages */}
        {extensionGroups.map((group) => (
          <CourseNavExtensions
            key={group.slug}
            slug={course.slug}
            title={group.title}
            stages={group.stages}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
              <SquareChevronLeft />
              <span className="font-bold">Collapse</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
