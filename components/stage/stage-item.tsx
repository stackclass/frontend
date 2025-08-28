import { useRouter } from "next/navigation";
import { SquareTerminal } from "lucide-react";

import { DifficultyIndicator } from "./difficulty";

import { Stage } from "@/types/stage";
import { Course } from "@/types/course";

interface StageItemProps {
  course: Course;
  stage: Stage;
}

export function StageItem({ course, stage }: StageItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${course.slug}/stages/${stage.slug}`);
  };

  return (
    <li
      className="flex items-center justify-between py-1 px-2 mb-0 hover:bg-gray-50 dark:hover:bg-gray-900 rounded cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
        <SquareTerminal className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-gray-800 dark:text-gray-400">{stage.name}</span>
      </div>

      <DifficultyIndicator difficulty={stage.difficulty} />
    </li>
  );
}
