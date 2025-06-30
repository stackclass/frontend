"use client";

import { redirect, useParams } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { useSession } from "@/components/provider/auth-provider";
import { useGetCourse } from "@/hooks/use-course";
import { useStages } from "@/hooks/use-stage";
import { useUserCourse } from "@/hooks/use-user-course";
import { useUserStages } from "@/hooks/use-user-stage";
import type { CourseDetail, UserCourse } from "@/types/course";
import type { StageWithState } from "@/types/stage";

interface CourseContextValue {
  course: CourseDetail;
  userCourse: UserCourse;
  stages: StageWithState[];
  isNew: boolean;
}

const CourseContext = createContext<CourseContextValue | null>(null);

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseLayout");
  }
  return context;
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams<{ slug: string }>();

  // Checking if the session is valid. If it's not,
  // we are redirecting the user to the home page.
  const session = useSession();
  if (!session) redirect("/");

  // Fetch course details
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useGetCourse(slug);

  // Fetch user course details
  const {
    data: rawUserCourse,
    isLoading: userCourseLoading,
    error: _userCourseError,
  } = useUserCourse(slug, { retry: false });

  // Fetch all stages
  const {
    data: stages,
    isLoading: stagesLoading,
    error: stagesError,
  } = useStages(slug);

  // Fetching all user stages for a course
  const { data: userStages } = useUserStages(slug, { retry: false });

  const { userCourse, isNew } = useMemo(() => {
    if (rawUserCourse) return { userCourse: rawUserCourse, isNew: false };

    return {
      userCourse: {
        course_slug: slug,
        proficiency: null,
        cadence: null,
        accountability: null,
        started_at: new Date().toISOString(),
        completed_stage_count: 0,
        activated: false,
      },
      isNew: true,
    };
  }, [rawUserCourse, slug]);

  const stagesWithState = useMemo(() => {
    if (!stages) return [];

    return stages.map((stage) => {
      const userStage =
        userStages?.find((us) => us.stage_slug === stage.slug) || null;
      return { stage, userStage };
    });
  }, [stages, userStages]);

  const isLoading = courseLoading || stagesLoading || userCourseLoading;

  if (isLoading) return <Loading message="Loading course details..." />;

  if (courseError)
    return <ErrorMessage message="Failed to load course details." />;
  if (stagesError) return <ErrorMessage message="Failed to load stages." />;

  if (!course) return <NotFound message="Course not found." />;
  if (!stages) return <NotFound message="Stages not found." />;

  const contextValue: CourseContextValue = {
    course,
    userCourse,
    stages: stagesWithState,
    isNew,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      <SidebarProvider>
        <CourseSidebar />
        <SidebarInset>
          <CourseHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </CourseContext.Provider>
  );
}
