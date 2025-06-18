import React from "react";
import { useRouter } from "next/navigation";

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
      className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{name}</h2>
      </div>
      <p className="text-gray-600 mt-2 line-clamp-2 min-h-[2.5rem]">
        {summary}
      </p>
      <p className="text-sm text-gray-500 mt-4">{stages_count} stages</p>
    </div>
  );
};

export default CourseCard;
