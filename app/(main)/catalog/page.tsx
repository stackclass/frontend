"use client";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import CourseCard from "@/components/course/course-card";

import { useFindCourses } from "@/hooks/use-course";

export default function CatalogPage() {
  const { data: courses = [], isLoading, error } = useFindCourses();

  if (isLoading) return <Loading message="Loading courses..." />;
  if (error) return <ErrorMessage message={error.message} />;
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
