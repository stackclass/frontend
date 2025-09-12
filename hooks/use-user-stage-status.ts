import UserStageStatusService from "@/services/user-stage-status";
import { UserStageStatus } from "@/types/stage-status";
import { useEffect, useRef, useState } from "react";

export const useUserStageStatus = (
  courseSlug: string,
  stageSlug: string,
  initialStatus: UserStageStatus | null,
) => {
  const [status, setStatus] = useState<UserStageStatus | null>(initialStatus);
  const [error, setError] = useState<Error | null>(null);

  // Use ref to track the initial status state
  const initialStatusState = useRef(initialStatus?.status);

  useEffect(() => {
    // Only subscribe if the stage is initially in progress
    if (initialStatus?.status !== "in_progress") {
      return;
    }

    console.log(`Subscribing to stage status for: ${courseSlug}/${stageSlug}`);

    const handleUpdate = (event: UserStageStatus) => {
      console.log("Received stage status update:", event);
      setStatus(event);
    };

    const handleError = (err: Error) => {
      console.error("Stage status SSE error:", err);
      setError(err);
    };

    UserStageStatusService.subscribe(
      courseSlug,
      stageSlug,
      handleUpdate,
      handleError,
    );

    return () => {
      console.log(
        `Unsubscribing from stage status for: ${courseSlug}/${stageSlug}`,
      );
      UserStageStatusService.unsubscribe(handleUpdate);
    };
  }, [courseSlug, stageSlug]); // Only depend on slugs, not initialStatus

  return { status, error };
};
