"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { StageGroup } from "@/components/stage/stage-group";
import { StageItem } from "@/components/stage/stage-item";
import { Loading } from "@/components/common/loading";
import { ErrorMessage } from "@/components/common/error-message";
import { NotFound } from "@/components/common/not-found";

import type { CourseDetail } from "@/types/course";
import type { Stage } from "@/types/stage";
import type { Extension } from "@/types/extension";

interface StageGroupData {
  title: string;
  slug?: string;
  stages: Stage[];
}

export default function CourseOverviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [stageGroups, setStageGroups] = useState<StageGroupData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch(`/api/v1/courses/${slug}`);
        if (!courseResponse.ok) {
          throw new Error(
            `Failed to fetch course: ${courseResponse.statusText}`,
          );
        }
        const courseData: CourseDetail = await courseResponse.json();
        setCourse(courseData);

        // Fetch all stages (base and extended)
        const stagesResponse = await fetch(`/api/v1/courses/${slug}/stages`);
        if (!stagesResponse.ok) {
          throw new Error(
            `Failed to fetch stages: ${stagesResponse.statusText}`,
          );
        }
        const stagesData: Stage[] = await stagesResponse.json();

        // Fetch all extensions (for grouping extended stages)
        const extsResponse = await fetch(`/api/v1/courses/${slug}/extensions`);
        if (!extsResponse.ok) {
          throw new Error(
            `Failed to fetch extensions: ${extsResponse.statusText}`,
          );
        }
        const extensionsData: Extension[] = await extsResponse.json();

        // Group stages
        const groupedStages: StageGroupData[] = [];

        // 1. Add base stages (extension_slug is null or undefined)
        const baseStages = stagesData.filter((stage) => !stage.extension_slug);
        if (baseStages.length > 0) {
          groupedStages.push({
            title: "Stages",
            stages: baseStages,
          });
        }

        // 2. Add extended stages (grouped by extension_slug)
        extensionsData.forEach((extension) => {
          const extensionStages = stagesData.filter(
            (stage) => stage.extension_slug === extension.slug,
          );
          if (extensionStages.length > 0) {
            groupedStages.push({
              title: extension.name,
              slug: extension.slug,
              stages: extensionStages,
            });
          }
        });

        setStageGroups(groupedStages);
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

  if (loading) return <Loading message="Loading course detail..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!course) return <NotFound message="Course not found." />;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <p className="text-gray-600 mt-2">{course.summary}</p>
        </div>
      </div>

      <Button size="lg" className="w-fit font-bold" asChild>
        <Link href={`/courses/${slug}`}>
          Start Building <ArrowRight />
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6 prose max-w-none">
            <div className="markdown">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>

            {/* Render all stage groups */}
            <div className="stages">
              {stageGroups.map((group) => (
                <StageGroup key={group.slug || "base"} title={group.title}>
                  {group.stages.map((stage) => (
                    <StageItem key={stage.slug} course={course} stage={stage} />
                  ))}
                </StageGroup>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg sticky top-24">
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
