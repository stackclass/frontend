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
  const prevInitialStatusRef = useRef<UserStageStatus | null>(initialStatus);

  useEffect(() => {
    if (prevInitialStatusRef.current !== initialStatus) {
      prevInitialStatusRef.current = initialStatus;
      setStatus(initialStatus);
    }
  }, [initialStatus]);

  useEffect(() => {
    if (initialStatus?.status !== "in_progress") {
      return;
    }

    const handleUpdate = (event: UserStageStatus) => setStatus(event);
    const handleError = (err: Error) => setError(err);

    UserStageStatusService.subscribe(
      courseSlug,
      stageSlug,
      handleUpdate,
      handleError,
    );

    return () => {
      UserStageStatusService.unsubscribe(handleUpdate);
    };
  }, [courseSlug, stageSlug, initialStatus]);

  return { status, error };
};
