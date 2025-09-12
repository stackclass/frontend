import UserCourseStatusService from "@/services/user-course-status";
import { UserCourse } from "@/types/course";
import { useEffect, useState, useRef, useCallback } from "react";

export const useUserCourseStatus = (
  slug: string,
  initialStatus: UserCourse | null,
) => {
  const [status, setStatus] = useState<UserCourse | null>(initialStatus);
  const [error, setError] = useState<Error | null>(null);

  // Use ref to track whether we should subscribe
  const shouldSubscribeRef = useRef(
    initialStatus !== null && !initialStatus.activated,
  );

  // Stable callback for updates
  const handleUpdate = useCallback((event: UserCourse) => {
    console.log("Received course status update:", event);
    setStatus(event);
  }, []);

  // Stable callback for errors
  const handleError = useCallback((err: Error) => {
    console.error("Course status SSE error:", err);
    setError(err);
  }, []);

  useEffect(() => {
    if (!shouldSubscribeRef.current) {
      return;
    }

    console.log(`Subscribing to course status for: ${slug}`);

    UserCourseStatusService.subscribe(slug, handleUpdate, handleError);

    return () => {
      console.log(`Unsubscribing from course status for: ${slug}`);
      UserCourseStatusService.unsubscribe(handleUpdate);
    };
  }, [slug, handleUpdate, handleError]);

  return { status, error };
};
