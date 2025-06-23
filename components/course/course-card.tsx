import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap } from "lucide-react";

interface CourseCardProps {
  name: string;
  summary: string;
  stages_count: number;
  slug: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  name,
  summary,
  stages_count,
  slug,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${slug}/overview`);
  };

  return (
    <div
      className="group border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{name}</h2>
      </div>
      <div className="text-gray-600 mt-2 line-clamp-2 min-h-[2.5rem] mb-4">
        {summary}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <GraduationCap className="w-4 mr-1 text-gray-400 dark:text-gray-600" />
            <span className="text-xs text-gray-500">{stages_count} stages</span>
          </div>
        </div>

        <div className="flex items-center">
          <span
            className="font-bold text-teal-500 text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
            data-test-action-text=""
          >
            Start
          </span>

          <ArrowRight className="w-4 text-gray-300 group-hover:text-teal-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
