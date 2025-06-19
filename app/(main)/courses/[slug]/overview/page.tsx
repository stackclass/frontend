"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { CourseDetail } from "@/types/course";
import ReactMarkdown from "react-markdown";

import { StageGroup } from "@/components/stage/stage-group";
import { StageItem } from "@/components/stage/stage-item";

export default function CourseOverviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch course: ${response.statusText}`);
        }
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

    fetchCourse();
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
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <p className="text-gray-600 mt-2">{course.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 prose max-w-none">
            <div className="markdown">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>

            <StageGroup title="Stages">
              <StageItem title="Empty file" difficulty="VERY EASY" />
              <StageItem title="Parentheses" difficulty="MEDIUM" />
              <StageItem title="Braces" difficulty="EASY" />
            </StageGroup>

            <StageGroup title="Parsing Expressions">
              <StageItem title="Booleans & Nil" difficulty="HARD" />
              <StageItem title="Number literals" difficulty="MEDIUM" />
              <StageItem title="String literals" difficulty="MEDIUM" />
            </StageGroup>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Before starting</h4>
            <p className="text-sm">
              Make sure you've read the "Welcome" section of the book that
              contains these chapters:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Introduction (chapter 1)</li>
              <li>A Map of the Territory (chapter 2)</li>
              <li>The Lox Language (chapter 3)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
