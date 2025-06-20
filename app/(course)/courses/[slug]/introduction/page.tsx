"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";

import StageHeader from "@/components/stage/stage-header";
import { GenericCard } from "@/components/stage/generic-card";
import { StageStatus } from "@/types/stage-status";

import { useCourse } from "@/app/(course)/layout";

export default function CourseIntroductionPage() {
  const course = useCourse();

  return (
    <>
      <StageHeader title="Introduction" status={StageStatus.Completed} />

      <Tabs defaultValue="instructions" className="p-4">
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="instructions">
          <GenericCard title="Introduction">
            <div className="max-w-5xl">
              <div className="markdown">
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
            </div>
          </GenericCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
