"use client";

import { useParams } from "next/navigation";
import * as React from "react";

import { SquareChevronLeft } from "lucide-react";

import { Separator } from "@/components/ui/separator";
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

import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { CourseNavBootstrap } from "@/components/course/course-nav-bootstrap";
import { CourseNavExtensions } from "@/components/course/course-nav-extensions";
import { CourseNavStages } from "@/components/course/course-nav-stages";
import { CourseSwitcher } from "@/components/course/course-switcher";
import { useExtensions } from "@/hooks/use-extension";
import { useCourseStore } from "@/stores/course-store";
import type { StageWithState } from "@/types/stage";

interface ExtensionGroup {
  title: string;
  slug: string;
  stages: StageWithState[];
}

export function CourseSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const { course, stages } = useCourseStore();
  const { slug } = useParams<{ slug: string }>();

  const [extensionGroups, setExtensionGroups] = React.useState<
    ExtensionGroup[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { data: extensions = [], isLoading: extensionsLoading } =
    useExtensions(slug);

  React.useEffect(() => {
    if (!extensionsLoading) {
      try {
        const grouped = stages.reduce<ExtensionGroup[]>((groups, stage) => {
          if (stage.stage.extension_slug) {
            const extension = extensions.find(
              (ext) => ext.slug === stage.stage.extension_slug,
            );
            const existingGroup = groups.find(
              (g) => g.slug === stage.stage.extension_slug,
            );

            if (existingGroup) {
              existingGroup.stages.push(stage);
            } else {
              groups.push({
                title: extension?.name || "Extension",
                slug: stage.stage.extension_slug,
                stages: [stage],
              });
            }
          }
          return groups;
        }, []);

        setExtensionGroups(grouped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  }, [extensionsLoading, extensions, stages]);

  const baseStages = stages.filter((stage) => !stage.stage.extension_slug);

  if (loading) return <Loading message="Loading extensions..." />;
  if (!course) return <NotFound message="Course not found." />;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <CourseSwitcher course={course} />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-1">
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
