import { WifiZero, WifiLow, WifiHigh, Wifi } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Difficulty } from "@/types/stage";

import { cn } from "@/lib/utils";

interface DifficultyIndicatorProps {
  difficulty: Difficulty;
}

export function DifficultyIndicator({ difficulty }: DifficultyIndicatorProps) {
  const difficultyConfig = {
    very_easy: {
      color: "text-green-500",
      text: "VERY EASY",
      icon: <WifiZero size="14" />,
      tip: "We'd expect a proficient developer to take < 5 minutes to complete this stage.",
    },
    easy: {
      color: "text-teal-500",
      text: "EASY",
      icon: <WifiLow size="14" />,
      tip: "We'd expect a proficient developer to take 5-10 minutes to complete this stage.",
    },
    medium: {
      color: "text-blue-500",
      text: "MEDIUM",
      icon: <WifiHigh size="14" />,
      tip: "We'd expect a proficient developer to take 30 minutes to 1 hour to complete this stage.",
    },
    hard: {
      color: "text-amber-500",
      text: "HARD",
      icon: <Wifi size="14" />,
      tip: "We'd expect a proficient developer to take more than 1 hour to complete this stage.",
    },
  };

  const config = difficultyConfig[difficulty];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center", config.color)}>
            <span className="text-sm font-bold mr-2">{config.text}</span>
            {config.icon}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[210px]">
          <p>{config.tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
