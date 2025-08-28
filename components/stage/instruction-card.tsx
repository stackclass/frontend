"use client";

import { DifficultyIndicator } from "@/components/stage/difficulty";
import { StatusBadge } from "@/components/stage/stage-status";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Difficulty } from "@/types/stage";
import { StageStatus } from "@/types/stage-status";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "../ui/button";

interface InstructionCardProps {
  title: string;
  status?: StageStatus;
  difficulty?: Difficulty;
  instruction: string;
  expandable?: boolean;
}

export const InstructionCard = ({
  title,
  status,
  difficulty,
  instruction,
  expandable = false,
}: InstructionCardProps) => {
  const [expanded, setExpanded] = useState(!expandable);

  return (
    <Card className="rounded-sm py-4 gap-4">
      <CardHeader className="gap-0">
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
      </CardHeader>
      <CardContent className="space-y-4">
        <hr />
        <div
          className={`relative ${!expanded ? "max-h-[200px] overflow-hidden" : ""}`}
        >
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-100 bg-gradient-to-t from-card to-transparent" />
          )}
          <div className="max-w-5xl">
            <div className="markdown">
              <ReactMarkdown>{instruction}</ReactMarkdown>
            </div>
          </div>
        </div>
      </CardContent>

      {!expanded && (
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => setExpanded(true)}
            className="w-full h-16 text-lg font-bold cursor-pointer"
          >
            Expand <ChevronDown />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
