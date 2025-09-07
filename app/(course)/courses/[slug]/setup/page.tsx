"use client";

import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";

import { Attempts } from "@/components/course/course-attempts";
import { useSession } from "@/components/provider/auth-provider";
import Overlay from "@/components/stage/overlay";
import { StageCompleted } from "@/components/stage/stage-completed";
import { useUserCourseStatus } from "@/hooks/use-user-course-status";
import { useCourseStore } from "@/stores/course-store";
import { getSetupStatus, StageStatus } from "@/types/stage-status";
import Link from "next/link";
import { useMemo } from "react";

export default function CourseSetupPage() {
  const { course, userCourse, attempts, setUserCourse } = useCourseStore();
  const { session } = useSession();

  const projectName = `stackclass-${course?.slug}`;

  const { status: updatedUserCourse } = useUserCourseStatus(
    course?.slug || "",
    userCourse,
  );

  useEffect(() => {
    if (updatedUserCourse && updatedUserCourse !== userCourse) {
      setUserCourse(updatedUserCourse);
    }
  }, [updatedUserCourse, userCourse, setUserCourse]);

  // Use useMemo to dynamically update status when userCourseStatus changes
  const status = useMemo(
    () => getSetupStatus(updatedUserCourse),
    [updatedUserCourse],
  );

  return (
    <>
      <StageHeader
        title="Repository Setup"
        status={status}
        description={
          status == StageStatus.Pending &&
          "Complete introduction step to proceed"
        }
      />

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-8 h-full">
        <div className="lg:col-span-6">
          <Overlay visible={status !== StageStatus.InProgress}>
            {status === StageStatus.Completed && <StageCompleted />}

            <main className="p-4 flex flex-col gap-y-4">
              <GenericCard title="Repository Setup" status={status}>
                <div className="max-w-5xl flex flex-col space-y-4">
                  <p>
                    We&apos;ve prepared a starter repository with some code for
                    you.
                  </p>

                  <div className="flex items-center space-x-2">
                    {status == StageStatus.Completed ? (
                      <div className="bg-primary text-primary-foreground rounded-full">
                        <Check size={18} />
                      </div>
                    ) : (
                      <span className="font-bold text-primary">Step 1:</span>
                    )}
                    <span>Clone the repository</span>
                  </div>

                  {status !== StageStatus.Pending ? (
                    <Code title="command line">
                      <div>
                        git clone {userCourse?.repository} {projectName}
                      </div>
                      <div>cd {projectName}</div>
                    </Code>
                  ) : (
                    <p>
                      ⚠️ Please complete the Pre-Challenge Assessment in order
                      to view the instructions for cloning your repository.
                    </p>
                  )}

                  <div className="flex items-center space-x-2">
                    {status == StageStatus.Completed ? (
                      <div className="bg-primary text-primary-foreground rounded-full">
                        <Check size={18} />
                      </div>
                    ) : (
                      <span className="font-bold text-primary">Step 2:</span>
                    )}
                    <span>Push an empty commit</span>
                  </div>

                  <Code title="command line">
                    <div>git commit --allow-empty -m &apos;test&apos;</div>
                    <div>git push origin main</div>
                  </Code>

                  <p className={userCourse?.activated ? "line-through" : ""}>
                    When you run the above command, the &quot;Listening for a
                    git push&quot; message below will change, and the first
                    stage will be activated.
                  </p>

                  {status == StageStatus.Pending && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-fit font-bold bg-accent"
                    >
                      Complete introduction step to proceed
                    </Button>
                  )}

                  {status == StageStatus.InProgress && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-fit font-bold bg-accent"
                    >
                      Listening for a git push...
                    </Button>
                  )}

                  {status == StageStatus.Completed &&
                    userCourse?.current_stage_slug && (
                      <>
                        <p>
                          🎉 Git push received! The first stage is now
                          activated.
                        </p>
                        <Button size="lg" className="w-fit font-bold" asChild>
                          <Link
                            href={`/courses/${course?.slug}/stages/${userCourse.current_stage_slug}`}
                          >
                            Continue <ArrowRight />
                          </Link>
                        </Button>
                      </>
                    )}
                </div>
              </GenericCard>
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
