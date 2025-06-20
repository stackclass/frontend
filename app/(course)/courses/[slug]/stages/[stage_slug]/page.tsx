"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import StageHeader from "@/components/stage/stage-header";
import { StageStatus } from "@/types/stage-status";
import { StatusBadge } from "@/components/stage/stage-status";
import { ArrowRight, CircleCheck, Copy, LucideArrowRight } from "lucide-react";
import { Code } from "@/components/ui/code";
import { Button } from "@/components/ui/button";
import { DifficultyIndicator } from "@/components/stage/difficulty";
import { InstructionCard } from "@/components/stage/instruction-card";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StageDetail } from "@/types/stage";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stage) return <div>Stage not found.</div>;

  return (
    <>
      <StageHeader
        title={stage.name}
        slug={stage.slug}
        status={StageStatus.Pending}
      />

      <Tabs defaultValue="instructions" className="p-4">
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="code-example">Code Examples</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="instructions">
          <InstructionCard
            title="Your Task"
            status={StageStatus.Pending}
            difficulty={stage.difficulty}
            instruction={stage.instruction}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
