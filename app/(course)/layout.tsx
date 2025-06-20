"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { CourseDetail } from "@/types/course";

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
        // Fetch course details
        const courseResponse = await fetch(`/api/courses/${slug}`);
        if (!courseResponse.ok) {
          throw new Error(
            `Failed to fetch course: ${courseResponse.statusText}`,
          );
        }
        const courseData: CourseDetail = await courseResponse.json();
        setCourse(courseData);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <SidebarProvider>
      <CourseSidebar course={course} />
      <SidebarInset>
        <CourseHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
