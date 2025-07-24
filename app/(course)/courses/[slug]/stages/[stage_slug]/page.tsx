"use client";

import { useParams } from "next/navigation";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { InstructionCard } from "@/components/stage/instruction-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";

import { Attempts } from "@/components/course/course-attempts";
import { GenericCard } from "@/components/stage/generic-card";
import Overlay from "@/components/stage/overlay";
import { StageCompleted } from "@/components/stage/stage-completed";
import TestRunner from "@/components/stage/test-runner";
import { useStage } from "@/hooks/use-stage";
import { useUserStage } from "@/hooks/use-user-stage";
import { useUserStageStatus } from "@/hooks/use-user-stage-status";
import { UserStage } from "@/types/stage";
import { getStageStatus, StageStatus } from "@/types/stage-status";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

export default function StagePage() {
  const { slug, stage_slug } = useParams<{
    slug: string;
    stage_slug: string;
  }>();

  const {
    data: stage,
    isLoading: stageLoading,
    error: stageError,
  } = useStage(slug, stage_slug);

  const { data: userStage, isLoading: userStageLoading } = useUserStage(
    slug,
    stage_slug,
    { retry: false },
  );

  // Convert UserStage to UserStageStatus if userStage is not null
  const initialStatus = useMemo(
    () =>
      userStage
        ? { status: userStage.status, test: userStage.test || "failed" }
        : null,
    [userStage],
  );

  const { status: userStageStatus } = useUserStageStatus(
    slug,
    stage_slug,
    initialStatus,
  );

  // Use useMemo to dynamically update status when userStageStatus changes
  const status = useMemo(
    () => getStageStatus(userStageStatus as UserStage),
    [userStageStatus],
  );

  const isLoading = stageLoading || userStageLoading;
  if (isLoading) return <Loading message="Loading stage details..." />;
  if (stageError) return <ErrorMessage message={stageError.message} />;
  if (!stage) return <NotFound message="Stage not found." />;

  return (
    <>
      <StageHeader
        title={stage.name}
        slug={stage.slug}
        status={status}
        description={
          status == StageStatus.Pending &&
          "Complete previous stages to gain access to this stage."
        }
      />

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-8 h-full">
        <div className="lg:col-span-6">
          <Overlay visible={status === StageStatus.Completed}>
            {status === StageStatus.Completed && <StageCompleted />}

            <main className="p-4 flex flex-col gap-y-4">
              {stage.solution && (
                <GenericCard title="How to pass this stage">
                  <div className="max-w-5xl">
                    <div className="markdown">
                      <ReactMarkdown>{stage.solution}</ReactMarkdown>
                    </div>
                  </div>
                </GenericCard>
              )}

              {userStageStatus && <TestRunner status={userStageStatus.test} />}

              <InstructionCard
                title="Your Task"
                status={status}
                difficulty={stage.difficulty}
                instruction={stage.instruction}
                expandable={stage.solution != undefined}
              />
            </main>
          </Overlay>
        </div>

        <div className="lg:col-span-2 border-l py-4 bg-gray-100 hidden lg:block">
          <div className="sticky top-16 hidden md:block">
            <Attempts attempts={[]} currentUserId="" />
          </div>
        </div>
      </div>
    </>
  );
}
