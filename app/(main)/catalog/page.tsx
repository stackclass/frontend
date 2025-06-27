"use client";

import { useEffect, useState } from "react";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import CourseCard from "@/components/course/course-card";

import type { Course } from "@/types/course";

export default function CatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/v1/courses");
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }
        const data: Course[] = await response.json();
        setCourses(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Loading message="Loading courses..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!courses) return <NotFound message="Courses not found." />;

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
        {courses.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </>
  );
}
