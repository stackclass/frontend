import { Wifi, SquareTerminal, Bold } from "lucide-react";
import { cn } from "@/lib/utils";

type Difficulty = "VERY EASY" | "EASY" | "MEDIUM" | "HARD";

interface StageItemProps {
  title: string;
  difficulty: Difficulty;
}

export function StageItem({ title, difficulty }: StageItemProps) {
  const difficultyConfig = {
    "VERY EASY": {
      color: "text-green-500",
      text: "VERY EASY",
    },
    EASY: {
      color: "text-teal-500",
      text: "EASY",
    },
    MEDIUM: {
      color: "text-blue-500",
      text: "MEDIUM",
    },
    HARD: {
      color: "text-amber-500",
      text: "HARD",
    },
  };

  const config = difficultyConfig[difficulty];

  return (
    <li className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
        <SquareTerminal className="w-5 h-5 text-gray-600 mr-2" />
        <span className="text-gray-800">{title}</span>
      </div>

      <div className={cn("flex items-center", config.color)}>
        <span className="text-sm font-bold mr-2">{config.text}</span>
        <Wifi size="14" />
      </div>
    </li>
  );
}
