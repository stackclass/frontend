"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { CourseDetail } from "@/types/course";

const CourseContext = createContext<CourseDetail | null>(null);

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${slug}`);
        if (!response.ok)
          throw new Error(`Failed to fetch course: ${response.statusText}`);
        const data: CourseDetail = await response.json();
        setCourse(data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <CourseContext.Provider value={course}>
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
