"use client";

import { useParams } from "next/navigation";
import * as React from "react";

import { ChevronsRight, SquareChevronLeft } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useExtensions } from "@/hooks/use-extension";
import { cn } from "@/lib/utils";
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
  const { toggleSidebar, state } = useSidebar();
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
    <>
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

      {/* Only show SidebarTrigger when sidebar is collapsed */}
      {state === "collapsed" && (
        <div className="fixed bottom-2 left-0 z-50">
          <SidebarTrigger />
        </div>
      )}
    </>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="outline"
            size="icon"
            className={cn(
              "size-8 rounded-l-none rounded-tr-md rounded-br-md border-l-0 border-r-1 border-y-1",
              "bg-sidebar hover:bg-sidebar-accent dark:bg-sidebar dark:hover:bg-sidebar-accent",
              className,
            )}
            onClick={(event) => {
              onClick?.(event);
              toggleSidebar();
            }}
            {...props}
          >
            <ChevronsRight />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          <p>Expand sidebar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
