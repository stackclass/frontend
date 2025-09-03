"use client";

import ReactMarkdown from "react-markdown";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { getIntroductionStatus, StageStatus } from "@/types/stage-status";

import { NotFound } from "@/components/common/not-found";
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
import { useCourseStore, useIsNewUserCourse } from "@/stores/course-store";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CourseIntroductionPage() {
  const router = useRouter();
  const { session } = useSession();

  const { course, userCourse, attempts, setUserCourse } = useCourseStore();
  const isNew = useIsNewUserCourse();

  const [localUserCourse, setLocalUserCourse] = useState(
    userCourse || {
      course_slug: course?.slug || "",
      proficiency: null,
      cadence: null,
      accountability: null,
      started_at: new Date().toISOString(),
      completed_stage_count: 0,
      activated: false,
      repository: "",
    },
  );

  const status = useMemo(
    () => getIntroductionStatus(localUserCourse),
    [localUserCourse],
  );

  const callbacks: Callbacks = {
    onProficiencyChange: (proficiency) => {
      setLocalUserCourse((prev) => ({ ...prev, proficiency }));
    },
    onCadenceChange: (cadence) => {
      setLocalUserCourse((prev) => ({ ...prev, cadence }));
    },
    onAccountabilityChange: (accountability) => {
      setLocalUserCourse((prev) => ({ ...prev, accountability }));
    },
  };

  const navigateToNextStage = (currentStageSlug?: string) => {
    if (!course) return;
    const targetPath = currentStageSlug
      ? `/courses/${course.slug}/stages/${currentStageSlug}`
      : `/courses/${course.slug}/setup`;
    router.push(targetPath);
  };

  const hasChanges =
    localUserCourse.proficiency !== userCourse?.proficiency ||
    localUserCourse.cadence !== userCourse?.cadence ||
    localUserCourse.accountability !== userCourse?.accountability;

  const { mutate: createUserCourse } = useCreateUserCourse({
    onSuccess: (data) => {
      console.log("User course created successfully:", data);
      setUserCourse(data);
      navigateToNextStage(data.current_stage_slug);
    },
    onError: (error) => {
      console.error("Failed to create user course:", error);
    },
  });

  const { mutate: updateUserCourse } = useUpdateUserCourse(course?.slug || "", {
    onSuccess: () => {
      console.log("User course updated successfully");
      setUserCourse(localUserCourse);
      navigateToNextStage(localUserCourse.current_stage_slug);
    },
    onError: (error) => {
      console.error("Failed to update user course:", error);
    },
  });

  const handleContinue = () => {
    if (!course) return;

    if (isNew) {
      createUserCourse({
        course_slug: course.slug,
        proficiency: localUserCourse.proficiency || "beginner",
        cadence: localUserCourse.cadence || "once_week",
        accountability: localUserCourse.accountability || false,
      });
    } else if (hasChanges) {
      updateUserCourse({
        proficiency: localUserCourse.proficiency || "beginner",
        cadence: localUserCourse.cadence || "once_week",
        accountability: localUserCourse.accountability || false,
      });
    } else {
      navigateToNextStage(localUserCourse.current_stage_slug);
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
                    <ReactMarkdown>{course?.description}</ReactMarkdown>
                  </div>
                </div>
              </GenericCard>

              <CourseAssessment
                status={status}
                userCourse={localUserCourse}
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
