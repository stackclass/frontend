import UserCourseStatusService from "@/services/user-course-status";
import { UserCourse } from "@/types/course";
import { useEffect, useState } from "react";

export const useUserCourseStatus = (
  slug: string,
  initialStatus: UserCourse | null,
) => {
  const [status, setStatus] = useState<UserCourse | null>(initialStatus);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialStatus === null || initialStatus.activated) return;

    const handleUpdate = (event: UserCourse) => setStatus(event);
    const handleError = (err: Error) => setError(err);

    UserCourseStatusService.subscribe(slug, handleUpdate, handleError);

    return () => {
      UserCourseStatusService.unsubscribe(handleUpdate);
    };
  }, [slug, initialStatus]);

  return { status, error };
};
