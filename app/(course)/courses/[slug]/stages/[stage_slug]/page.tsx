"use client";

import { useParams } from "next/navigation";

import { ErrorMessage } from "@/components/common/error-message";
import { Loading } from "@/components/common/loading";
import { NotFound } from "@/components/common/not-found";
import { InstructionCard } from "@/components/stage/instruction-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";

import { GenericCard } from "@/components/stage/generic-card";
import { useStage } from "@/hooks/use-stage";
import { StageStatus } from "@/types/stage-status";
import ReactMarkdown from "react-markdown";

export default function StagePage() {
  const { slug, stage_slug } = useParams<{
    slug: string;
    stage_slug: string;
  }>();
  const { data: stage, isLoading, error } = useStage(slug, stage_slug);

  if (isLoading) return <Loading message="Loading stage details..." />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!stage) return <NotFound message="Stage not found." />;

  return (
    <>
      <StageHeader
        title={stage.name}
        slug={stage.slug}
        status={StageStatus.Pending}
      />

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <main className="p-4 flex flex-col gap-y-4">
        {stage.solution && (
          <GenericCard title="How to pass this stage">
            <div className="max-w-5xl">
              <div className="markdown">
                <ReactMarkdown>{stage.solution.explanation}</ReactMarkdown>
              </div>
            </div>
          </GenericCard>
        )}
        <InstructionCard
          title="Your Task"
          status={StageStatus.Pending}
          difficulty={stage.difficulty}
          instruction={stage.instruction}
        />
      </main>
    </>
  );
}
