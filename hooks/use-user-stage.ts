import UserStageService from "@/services/user-stage";
import { UserStage } from "@/types/stage";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * Hook for fetching all user stages for a course.
 * @param courseSlug - The slug of the course.
 */
export const useUserStages = (courseSlug: string) => {
  return useQuery<UserStage[]>({
    queryKey: ["userStages", courseSlug],
    queryFn: () =>
      UserStageService.findUserStages(courseSlug).then((res) => res.data),
  });
};

/**
 * Hook for fetching a specific user stage.
 * @param courseSlug - The slug of the course.
 * @param stageSlug - The slug of the stage.
 */
export const useUserStage = (courseSlug: string, stageSlug: string) => {
  return useQuery<UserStage>({
    queryKey: ["userStage", courseSlug, stageSlug],
    queryFn: () =>
      UserStageService.getUserStage(courseSlug, stageSlug).then(
        (res) => res.data,
      ),
  });
};

/**
 * Hook for marking a stage as completed.
 */
export const useCompleteStage = () => {
  return useMutation<
    UserStage,
    Error,
    { courseSlug: string; stageSlug: string }
  >({
    mutationFn: ({ courseSlug, stageSlug }) =>
      UserStageService.completeStage(courseSlug, stageSlug).then(
        (res) => res.data,
      ),
  });
};
