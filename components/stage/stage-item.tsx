import { useRouter } from "next/navigation";
import { Wifi, SquareTerminal, Bold } from "lucide-react";

import { Stage } from "@/types/stage";
import { Course } from "@/types/course";

import { cn } from "@/lib/utils";

interface StageItemProps {
  course: Course;
  stage: Stage;
}

export function StageItem({ course, stage }: StageItemProps) {
  const router = useRouter();
  const difficultyConfig = {
    very_easy: {
      color: "text-green-500",
      text: "VERY EASY",
    },
    easy: {
      color: "text-teal-500",
      text: "EASY",
    },
    medium: {
      color: "text-blue-500",
      text: "MEDIUM",
    },
    hard: {
      color: "text-amber-500",
      text: "HARD",
    },
  };

  const config = difficultyConfig[stage.difficulty];

  const handleClick = () => {
    router.push(`/courses/${course.slug}/stages/${stage.slug}`);
  };

  return (
    <li
      className="flex items-center justify-between py-1 px-2 mb-0 hover:bg-gray-50 rounded cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
        <SquareTerminal className="w-5 h-5 text-gray-600 mr-2" />
        <span className="text-gray-800">{stage.name}</span>
      </div>

      <div className={cn("flex items-center", config.color)}>
        <span className="text-sm font-bold mr-2">{config.text}</span>
        <Wifi size="14" />
      </div>
    </li>
  );
}
