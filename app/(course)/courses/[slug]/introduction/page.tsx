"use client";

import ReactMarkdown from "react-markdown";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { getIntroductionStatus, StageStatus } from "@/types/stage-status";

import { useCourseContext } from "@/app/(course)/layout";
import {
  Callbacks,
  CourseAssessment,
} from "@/components/course/course-assessment";
import { Attempts } from "@/components/course/course-attempts";
import { useSession } from "@/components/provider/auth-provider";
import Overlay from "@/components/stage/overlay";
import { StageCompleted } from "@/components/stage/stage-completed";
import { Button } from "@/components/ui/button";
import {
  useCreateUserCourse,
  useUpdateUserCourse,
} from "@/hooks/use-user-course";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CourseIntroductionPage() {
  const router = useRouter();

  const { session } = useSession();

  const {
    course,
    userCourse: contextUserCourse,
    isNew,
    updateUserCourse: updateContextUserCourse,
    attempts,
  } = useCourseContext();
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

  const navigateToNextStage = (currentStageSlug?: string) => {
    const targetPath = currentStageSlug
      ? `/courses/${course.slug}/stages/${currentStageSlug}`
      : `/courses/${course.slug}/setup`;
    router.push(targetPath);
  };

  const hasChanges =
    userCourse.proficiency !== contextUserCourse.proficiency ||
    userCourse.cadence !== contextUserCourse.cadence ||
    userCourse.accountability !== contextUserCourse.accountability;

  const { mutate: createUserCourse } = useCreateUserCourse({
    onSuccess: (data) => {
      console.log("User course created successfully:", data);
      updateContextUserCourse(data);
      navigateToNextStage(data.current_stage_slug);
    },
    onError: (error) => {
      console.error("Failed to create user course:", error);
    },
  });

  const { mutate: updateUserCourse } = useUpdateUserCourse(course.slug, {
    onSuccess: () => {
      console.log("User course updated successfully");
      navigateToNextStage(userCourse.current_stage_slug);
    },
    onError: (error) => {
      console.error("Failed to update user course:", error);
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
    } else if (hasChanges) {
      updateUserCourse({
        proficiency: userCourse.proficiency || "beginner",
        cadence: userCourse.cadence || "once_week",
        accountability: userCourse.accountability || false,
      });
    } else {
      navigateToNextStage(userCourse.current_stage_slug);
    }
  };

  return (
    <>
      <StageHeader
        title="Introduction"
        status={status != StageStatus.Pending && status}
        description={
          status == StageStatus.Pending &&
          "Complete the pre-challenge assessment to begin this course."
        }
      />

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-8 h-full">
        <div className="lg:col-span-6">
          <Overlay visible={status !== StageStatus.InProgress}>
            {!isNew && status === StageStatus.Completed && <StageCompleted />}

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

              <div className="mt-6 flex justify-start">
                <Button
                  onClick={handleContinue}
                  disabled={status !== StageStatus.Completed}
                >
                  Continue
                </Button>
              </div>
            </main>
          </Overlay>
        </div>

        <div className="lg:col-span-2 border-l py-4 bg-accent hidden lg:block">
          <div className="sticky top-16">
            <Attempts attempts={attempts} currentUserId={session?.user.id} />
          </div>
        </div>
      </div>
    </>
  );
}
