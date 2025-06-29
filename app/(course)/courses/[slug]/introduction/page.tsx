"use client";

import ReactMarkdown from "react-markdown";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { StageStatus } from "@/types/stage-status";

import { useCourse } from "@/app/(course)/layout";
import { CourseAssessment } from "@/components/course/course-assessment";
import { Button } from "@/components/ui/button";
import { useCreateUserCourse } from "@/hooks/use-user-course";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CourseIntroductionPage() {
  const { course, userCourse } = useCourse();
  const router = useRouter();

  const [initialProficiency] = useState<string | null>(
    userCourse?.proficiency || null,
  );
  const [initialCadence] = useState<string | null>(userCourse?.cadence || null);
  const [initialAccountability] = useState<boolean | null>(
    userCourse?.accountability ?? null,
  );

  const [proficiency, setProficiency] = useState<string | null>(
    initialProficiency,
  );
  const [cadence, setCadence] = useState<string | null>(initialCadence);
  const [accountability, setAccountability] = useState<boolean | null>(
    initialAccountability,
  );

  // Determine the status based on userCourse fields
  const status = useMemo(() => {
    const hasProficiency = proficiency !== null && proficiency !== undefined;
    const hasCadence = cadence !== null && cadence !== undefined;
    const hasAccountability = accountability !== null;

    if (hasProficiency && hasCadence && hasAccountability) {
      return StageStatus.Completed;
    } else if (!hasProficiency && !hasCadence && !hasAccountability) {
      return StageStatus.Pending;
    } else {
      return StageStatus.InProgress;
    }
  }, [proficiency, userCourse, accountability]);

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
    if (userCourse) {
      const hasChanges =
        proficiency !== initialProficiency ||
        cadence !== initialCadence ||
        accountability !== initialAccountability;

      if (hasChanges) {
        // Call update API here
        console.log("Updating user course", {
          proficiency,
          cadence,
          accountability,
        });
      }
      // Navigate to current stage
      if (userCourse.current_stage_slug) {
        router.push(`/courses/${course.slug}/${userCourse.current_stage_slug}`);
      } else {
        router.push(`/courses/${course.slug}/setup`);
      }
    } else {
      createUserCourse({
        course_slug: course.slug,
        proficiency: proficiency || "beginner",
        cadence: cadence || "once_week",
        accountability: accountability || false,
      });
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
          proficiency={proficiency}
          cadence={cadence}
          accountability={accountability}
          onProficiencyChange={setProficiency}
          onCadenceChange={setCadence}
          onAccountabilityChange={setAccountability}
        />

        {status === StageStatus.Completed && (
          <div className="mt-6 flex justify-start">
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        )}
      </main>
    </>
  );
}
