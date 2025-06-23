"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

import StageHeader from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { GenericCard } from "@/components/stage/generic-card";
import { StageStatus } from "@/types/stage-status";

import { useCourse } from "@/app/(course)/layout";

export default function CourseIntroductionPage() {
  const { course } = useCourse();

  return (
    <>
      <StageHeader title="Introduction" status={StageStatus.Completed} />

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <main className="p-4">
        <GenericCard title="Introduction">
          <div className="max-w-5xl">
            <div className="markdown">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>
        </GenericCard>
      </main>
    </>
  );
}
