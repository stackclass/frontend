"use client";

import ReactMarkdown from "react-markdown";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { StageStatus } from "@/types/stage-status";

import { useCourse } from "@/app/(course)/layout";
import { CourseAssessment } from "@/components/course/course-assessment";

export default function CourseIntroductionPage() {
  const { course } = useCourse();
  const status = StageStatus.Pending;

  return (
    <>
      {status != StageStatus.Pending ? (
        <StageHeader title="Introduction" status={status} />
      ) : (
        <StageHeader
          title="Introduction"
          description="Complete the pre-challenge assessment to begin this course."
        />
      )}

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <main className="p-4 flex flex-col gap-y-4">
        <GenericCard title="Introduction">
          <div className="max-w-5xl">
            <div className="markdown">
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
          </div>
        </GenericCard>

        <CourseAssessment status={status} />
      </main>
    </>
  );
}
