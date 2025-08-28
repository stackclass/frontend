import { Course } from "@/types/course";
import { ArrowRight, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${course.slug}/overview`);
  };

  return (
    <div
      className="group border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between gap-x-4">
        <div className="mb-4">
          <h2 className="font-bold text-lg">{course.name}</h2>
          <div className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 min-h-[2.5rem]">
            {course.summary}
          </div>
        </div>
        <div className="w-10 h-10 transform scale-100 group-hover:scale-105 flex-shrink-0 transition-transform">
          {course.logo ? (
            <Image src={course.logo} alt={`${course.name} logo`} />
          ) : (
            <GraduationCap className="w-full h-full text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <GraduationCap className="w-4 mr-1 text-gray-400 dark:text-gray-600" />
            <span className="text-xs text-gray-500">
              {course.stage_count} stages
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <span
            className="font-bold text-primary text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
            data-test-action-text=""
          >
            Start
          </span>

          <ArrowRight className="w-4 text-gray-300 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
