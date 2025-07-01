"use client";

import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { ArrowRight, CircleCheck } from "lucide-react";

import { GenericCard } from "@/components/stage/generic-card";
import { StageHeader } from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";

import { useCourse } from "@/app/(course)/layout";
import Overlay from "@/components/stage/overlay";
import { StageCompleted } from "@/components/stage/stage-completed";
import { getSetupStatus, StageStatus } from "@/types/stage-status";
import Link from "next/link";

export default function CourseSetupPage() {
  const { course, userCourse } = useCourse();

  const status = getSetupStatus(userCourse);
  const projectName = `codecraft-${course.slug}`;

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

      <Overlay>
        {status === StageStatus.Completed && <StageCompleted />}

        <main className="p-4 flex flex-col gap-y-4">
          <GenericCard title="Repository Setup" status={status}>
            <div className="max-w-5xl flex flex-col space-y-4">
              <p>We've prepared a starter repository with some code for you.</p>

              <div className="flex items-center space-x-2">
                {status == StageStatus.Completed ? (
                  <CircleCheck color="green" />
                ) : (
                  <span className="font-bold text-teal-700">Step 1:</span>
                )}
                <span>Clone the repository</span>
              </div>

              <Code title="command line">
                <div>
                  git clone {userCourse.repository} {projectName}
                </div>
                <div>cd {projectName}</div>
              </Code>

              <div className="flex items-center space-x-2">
                {status == StageStatus.Completed ? (
                  <CircleCheck color="green" />
                ) : (
                  <span className="font-bold text-teal-700">Step 2:</span>
                )}
                <span>Push an empty commit</span>
              </div>

              <Code title="command line">
                <div>git commit --allow-empty -m 'test'</div>
                <div>git push origin master</div>
              </Code>

              <p className={userCourse.activated ? "line-through" : ""}>
                When you run the above command, the "Listening for a git push"
                message below will change, and the first stage will be
                activated.
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

              {status == StageStatus.Completed && (
                <>
                  <p>🎉 Git push received! The first stage is now activated.</p>
                  <Button size="lg" className="w-fit font-bold" asChild>
                    <Link
                      href={`/courses/${course.slug}/stages/${userCourse.current_stage_slug}`}
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
    </>
  );
}
