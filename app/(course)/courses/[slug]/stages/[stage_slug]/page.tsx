"use client";

import { useParams } from "next/navigation";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { InstructionCard } from "@/components/stage/instruction-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";

import { GenericCard } from "@/components/stage/generic-card";
import Overlay from "@/components/stage/overlay";
import { StageCompleted } from "@/components/stage/stage-completed";
import TestRunner from "@/components/stage/test-runner";
import { useStage } from "@/hooks/use-stage";
import { useUserStage } from "@/hooks/use-user-stage";
import { getStageStatus, StageStatus } from "@/types/stage-status";
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

  const isLoading = stageLoading || userStageLoading;
  if (isLoading) return <Loading message="Loading stage details..." />;
  if (stageError) return <ErrorMessage message={stageError.message} />;
  if (!stage) return <NotFound message="Stage not found." />;

  const status = getStageStatus({ stage, userStage: userStage ?? null });

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

      <Overlay>
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
          <TestRunner />
          <InstructionCard
            title="Your Task"
            status={status}
            difficulty={stage.difficulty}
            instruction={stage.instruction}
            expandable={stage.solution != undefined}
          />
        </main>
      </Overlay>
    </>
  );
}
