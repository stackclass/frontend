"use client";

import ReactMarkdown from "react-markdown";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { getIntroductionStatus, StageStatus } from "@/types/stage-status";

import { useCourse } from "@/app/(course)/layout";
import {
  Callbacks,
  CourseAssessment,
} from "@/components/course/course-assessment";
import Overlay from "@/components/stage/overlay";
import { StageCompleted } from "@/components/stage/stage-completed";
import { Button } from "@/components/ui/button";
import { useCreateUserCourse } from "@/hooks/use-user-course";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CourseIntroductionPage() {
  const router = useRouter();

  const { course, userCourse: contextUserCourse, isNew } = useCourse();

  const [userCourse, setUserCourse] = useState(contextUserCourse);
  const status = useMemo(() => getIntroductionStatus(userCourse), [userCourse]);

  const callbacks: Callbacks = {
    onProficiencyChange: (proficiency) => {
      setUserCourse((prev) => ({ ...prev, proficiency }));
    },
    onCadenceChange: (cadence) => {
      setUserCourse((prev) => ({ ...prev, cadence }));
    },
    onAccountabilityChange: (accountability) => {
      setUserCourse((prev) => ({ ...prev, accountability }));
    },
  };

  const hasChanges =
    userCourse.proficiency !== contextUserCourse.proficiency ||
    userCourse.cadence !== contextUserCourse.cadence ||
    userCourse.accountability !== contextUserCourse.accountability;

  const { mutate: createUserCourse } = useCreateUserCourse({
    onSuccess: (data) => {
      console.log("User course created successfully:", data);
      router.push(`/courses/${course.slug}/setup`);
    },
    onError: (error) => {
      console.error("Failed to create user course:", error);
    },
  });

  const handleContinue = () => {
    if (isNew) {
      createUserCourse({
        course_slug: course.slug,
        proficiency: userCourse.proficiency || "beginner",
        cadence: userCourse.cadence || "once_week",
        accountability: userCourse.accountability || false,
      });
    } else {
      if (hasChanges) {
        console.log("Updating user course:", {
          proficiency: userCourse.proficiency,
          cadence: userCourse.cadence,
          accountability: userCourse.accountability,
        });
      }

      // Navigate to current stage
      const targetPath = userCourse.current_stage_slug
        ? `/courses/${course.slug}/stages/${userCourse.current_stage_slug}`
        : `/courses/${course.slug}/setup`;
      router.push(targetPath);
    }
  };

  return (
    <>
      {status != StageStatus.Pending ? (
        <StageHeader title="Introduction" status={status} />
      ) : (
        <StageHeader
          title="Introduction"
          description="Complete the pre-challenge assessment to begin this course."
        />
      )}

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <Overlay>
        {status === StageStatus.Completed && <StageCompleted />}

        <main className="p-4 flex flex-col gap-y-4">
          <GenericCard title="Introduction">
            <div className="max-w-5xl">
              <div className="markdown">
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
            </div>
          </GenericCard>

          <CourseAssessment
            status={status}
            userCourse={userCourse}
            callbacks={callbacks}
          />

          {status === StageStatus.Completed && (
            <div className="mt-6 flex justify-start">
              <Button onClick={handleContinue}>Continue</Button>
            </div>
          )}
        </main>
      </Overlay>
    </>
  );
}
