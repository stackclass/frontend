"use client";

import { redirect, useParams } from "next/navigation";

import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { useSession } from "@/components/provider/auth-provider";
import { useCourseData } from "@/hooks/use-course-data";
import { useCourseStore } from "@/stores/course-store";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams<{ slug: string }>();

  // Checking if the session is valid. If it's not,
  // we are redirecting to the course overview page.
  const { session, isLoading: sessionLoading } = useSession();
  if (!sessionLoading && !session) {
    toast.error("Please sign in to access this course.");
    redirect(`/courses/${slug}/overview`);
  }

  const isLoading = useCourseStore((state) => state.isLoading);
  const error = useCourseStore((state) => state.error);
  const course = useCourseStore((state) => state.course);

  useCourseData(slug as string);

  if (isLoading || sessionLoading)
    return <Loading message="Loading course details..." />;

  if (!course) return <NotFound message="Course not found." />;
  if (error) return <ErrorMessage message="Failed to load course details." />;

  return (
    <SidebarProvider>
      <CourseSidebar />
      <SidebarInset>
        <CourseHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
