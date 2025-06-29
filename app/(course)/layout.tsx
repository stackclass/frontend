"use client";

import { redirect, useParams } from "next/navigation";
import { createContext, useContext } from "react";

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
import type { CourseDetail, UserCourse } from "@/types/course";
import type { Stage } from "@/types/stage";

interface CourseContextValue {
  course: CourseDetail;
  userCourse: UserCourse | null;
  stages: Stage[];
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
  if (!session) {
    redirect("/");
  }

  // Fetch course details
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useGetCourse(slug);

  // Fetch all stages
  const {
    data: stages,
    isLoading: stagesLoading,
    error: stagesError,
  } = useStages(slug);

  // Fetch user course details
  const {
    data: userCourse,
    isLoading: userCourseLoading,
    error: _userCourseError,
  } = useUserCourse(slug, { retry: false });

  const isLoading = courseLoading || stagesLoading || userCourseLoading;

  if (isLoading) return <Loading message="Loading course details..." />;

  if (courseError)
    return <ErrorMessage message="Failed to load course details." />;
  if (stagesError) return <ErrorMessage message="Failed to load stages." />;

  if (!course) return <NotFound message="Course not found." />;

  return (
    <CourseContext.Provider
      value={{
        course: course,
        userCourse: userCourse || null,
        stages: stages || [],
      }}
    >
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
