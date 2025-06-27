"use client";

import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import CourseHeader from "@/components/course/course-header";
import { CourseSidebar } from "@/components/course/course-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import authClient from "@/lib/auth-client";
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
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch course details
        const courseResponse = await fetch(`/api/v1/courses/${slug}`);
        if (!courseResponse.ok)
          throw new Error(
            `Failed to fetch course: ${courseResponse.statusText}`,
          );
        const courseData: CourseDetail = await courseResponse.json();
        setCourse(courseData);

        // 2. Fetch all stages (base + extensions)
        const stagesResponse = await fetch(`/api/v1/courses/${slug}/stages`);
        if (!stagesResponse.ok)
          throw new Error(
            `Failed to fetch stages: ${stagesResponse.statusText}`,
          );
        const stagesData: Stage[] = await stagesResponse.json();
        setStages(stagesData);

        await authClient.getSession({
          fetchOptions: {
            onSuccess: (ctx) => {
              const jwt = ctx.response.headers.get("set-auth-jwt") || "";
              localStorage.setItem("jwt", jwt);
            },
          },
        });

        // 3. Fetch user course details
        const token = localStorage.getItem("jwt") || "";
        const userCourseResponse = await fetch(`/api/v1/user/courses/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userCourseResponse.ok) {
          if (userCourseResponse.status == 404) {
            setUserCourse(null);
          }
        }
        const userCourseData: UserCourse = await userCourseResponse.json();
        setUserCourse(userCourseData);
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
    <CourseContext.Provider value={{ course, userCourse, stages }}>
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
