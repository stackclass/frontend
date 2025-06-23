"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/stage/stage-status";
import { DifficultyIndicator } from "@/components/stage/difficulty";
import ReactMarkdown from "react-markdown";
import { StageStatus } from "@/types/stage-status";
import { Difficulty } from "@/types/stage";

interface InstructionCardProps {
  title: string;
  status?: StageStatus;
  difficulty?: Difficulty;
  instruction: string;
}

export const InstructionCard = ({
  title,
  status,
  difficulty,
  instruction,
}: InstructionCardProps) => {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="border-b flex justify-between pb-4">
          <CardTitle>
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl">{title}</h2>
              {status && <StatusBadge status={status} />}
            </div>
          </CardTitle>

          {difficulty && (
            <CardAction>
              <DifficultyIndicator difficulty={difficulty} />
            </CardAction>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="max-w-5xl">
          <div className="markdown">
            <ReactMarkdown>{instruction}</ReactMarkdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
