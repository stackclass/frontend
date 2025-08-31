import { useEffect } from "react";

import { useAttempts, useGetCourse } from "@/hooks/use-course";
import { useStages } from "@/hooks/use-stage";
import { useUserCourse } from "@/hooks/use-user-course";
import { useUserStages } from "@/hooks/use-user-stage";
import { useCourseStore } from "@/stores/course-store";
import { StageWithState } from "@/types/stage";

/**
 * Hook to sync React Query results directly into zustand store
 */
export const useCourseData = (slug: string) => {
  const {
    setCourse,
    setUserCourse,
    setStages,
    setAttempts,
    setLoading,
    setError,
  } = useCourseStore();

  const courseQuery = useGetCourse(slug);
  useEffect(() => {
    if (
      courseQuery.data &&
      courseQuery.data !== useCourseStore.getState().course
    ) {
      setCourse(courseQuery.data);
    }
  }, [courseQuery.data, setCourse]);

  const userCourseQuery = useUserCourse(slug, { retry: false });
  useEffect(() => {
    if (
      userCourseQuery.data &&
      userCourseQuery.data !== useCourseStore.getState().userCourse
    ) {
      setUserCourse(userCourseQuery.data);
    }
  }, [userCourseQuery.data, setUserCourse]);

  const stagesQuery = useStages(slug);
  const userStagesQuery = useUserStages(slug, { retry: false });
  useEffect(() => {
    if (stagesQuery.data && userStagesQuery.data) {
      const stagesWithState: StageWithState[] = stagesQuery.data.map(
        (stage) => {
          const userStage =
            userStagesQuery.data.find((us) => us.stage_slug === stage.slug) ||
            null;
          return { stage, userStage };
        },
      );

      if (stagesWithState !== useCourseStore.getState().stages) {
        setStages(stagesWithState);
      }
    }
  }, [stagesQuery.data, userStagesQuery.data, setStages]);

  const attemptsQuery = useAttempts(slug);
  useEffect(() => {
    if (
      attemptsQuery.data &&
      attemptsQuery.data !== useCourseStore.getState().attempts
    ) {
      setAttempts(attemptsQuery.data);
    }
  }, [attemptsQuery.data, setAttempts]);

  useEffect(() => {
    const loading =
      courseQuery.isLoading ||
      userCourseQuery.isLoading ||
      stagesQuery.isLoading ||
      attemptsQuery.isLoading;
    setLoading(loading);
  }, [
    courseQuery.isLoading,
    userCourseQuery.isLoading,
    stagesQuery.isLoading,
    attemptsQuery.isLoading,
    setLoading,
  ]);

  useEffect(() => {
    const error = courseQuery.error || stagesQuery.error || attemptsQuery.error;
    if (error) {
      setError(error.message || "Failed to load course data");
    }
  }, [courseQuery.error, stagesQuery.error, attemptsQuery.error, setError]);

  return {
    isLoading:
      courseQuery.isLoading ||
      userCourseQuery.isLoading ||
      stagesQuery.isLoading ||
      attemptsQuery.isLoading,
  };
};
