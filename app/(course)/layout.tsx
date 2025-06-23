"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { CourseDetail } from "@/types/course";
import type { Stage } from "@/types/stage";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { ErrorMessage } from "@/components/common/error-message";

interface CourseContextValue {
  course: CourseDetail;
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
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch course details
        const courseResponse = await fetch(`/api/courses/${slug}`);
        if (!courseResponse.ok)
          throw new Error(
            `Failed to fetch course: ${courseResponse.statusText}`,
          );
        const courseData: CourseDetail = await courseResponse.json();
        setCourse(courseData);

        // 2. Fetch all stages (base + extensions)
        const stagesResponse = await fetch(`/api/courses/${slug}/stages`);
        if (!stagesResponse.ok)
          throw new Error(
            `Failed to fetch stages: ${stagesResponse.statusText}`,
          );
        const stagesData: Stage[] = await stagesResponse.json();
        setStages(stagesData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <Loading message="Loading course details..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!course) return <NotFound message="Course not found." />;

  return (
    <CourseContext.Provider value={{ course, stages }}>
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
