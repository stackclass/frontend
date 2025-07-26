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

const SignalBars = ({ levels }: { levels: number }) => {
  return (
    <div className="flex items-end">
      {[0.7, 0.9, 1.1].map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-[4px] mr-[2px] rounded-[1px]",
            index < levels ? "bg-primary" : "bg-gray-300 dark:bg-gray-700/80",
          )}
          style={{ height: `${height}em` }}
        />
      ))}
    </div>
  );
};

export function DifficultyIndicator({ difficulty }: DifficultyIndicatorProps) {
  const difficultyConfig = {
    very_easy: {
      color: "text-primary",
      text: "VERY EASY",
      icon: <SignalBars levels={0} />,
      tip: "We'd expect a proficient developer to take < 5 minutes to complete this stage.",
    },
    easy: {
      color: "text-primary",
      text: "EASY",
      icon: <SignalBars levels={1} />,
      tip: "We'd expect a proficient developer to take 5-10 minutes to complete this stage.",
    },
    medium: {
      color: "text-primary",
      text: "MEDIUM",
      icon: <SignalBars levels={2} />,
      tip: "We'd expect a proficient developer to take 30 minutes to 1 hour to complete this stage.",
    },
    hard: {
      color: "text-primary",
      text: "HARD",
      icon: <SignalBars levels={3} />,
      tip: "We'd expect a proficient developer to take more than 1 hour to complete this stage.",
    },
  };

  const config = difficultyConfig[difficulty];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex text-xs items-baseline", config.color)}>
            <span className="text-xs font-extrabold mr-2">{config.text}</span>
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
