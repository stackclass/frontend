import React from "react";

interface CourseCardProps {
  name: string;
  summary: string;
  stages_count: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  name,
  summary,
  stages_count,
}) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
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
