"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import StageHeader from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { InstructionCard } from "@/components/stage/instruction-card";
import { Loading } from "@/components/common/loading";
import { ErrorMessage } from "@/components/common/error-message";
import { NotFound } from "@/components/common/not-found";

import { StageStatus } from "@/types/stage-status";
import { StageDetail } from "@/types/stage";
import { GenericCard } from "@/components/stage/generic-card";
import ReactMarkdown from "react-markdown";

export default function StagePage() {
  const { slug, stage_slug } = useParams<{
    slug: string;
    stage_slug: string;
  }>();
  const [stage, setStage] = useState<StageDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stage details
        const courseResponse = await fetch(
          `/api/courses/${slug}/stages/${stage_slug}`,
        );
        if (!courseResponse.ok) {
          throw new Error(
            `Failed to fetch stage: ${courseResponse.statusText}`,
          );
        }
        const StageData: StageDetail = await courseResponse.json();
        setStage(StageData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, stage_slug]);

  if (loading) return <Loading message="Loading stage details..." />;
  if (error) return <ErrorMessage message={error} />;
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
