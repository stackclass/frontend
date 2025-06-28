import UserStageService from "@/services/user-stage";
import { UserStage } from "@/types/stage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * Hook for fetching all user stages for a course.
 * @param courseSlug - The slug of the course.
 */
export const useUserStages = (courseSlug: string) => {
  return useQuery<AxiosResponse<UserStage[]>>({
    queryKey: ["userStages", courseSlug],
    queryFn: () => UserStageService.findUserStages(courseSlug),
  });
};

/**
 * Hook for fetching a specific user stage.
 * @param courseSlug - The slug of the course.
 * @param stageSlug - The slug of the stage.
 */
export const useUserStage = (courseSlug: string, stageSlug: string) => {
  return useQuery<AxiosResponse<UserStage>>({
    queryKey: ["userStage", courseSlug, stageSlug],
    queryFn: () => UserStageService.getUserStage(courseSlug, stageSlug),
  });
};

/**
 * Hook for marking a stage as completed.
 */
export const useCompleteStage = () => {
  return useMutation<
    AxiosResponse<UserStage>,
    Error,
    { courseSlug: string; stageSlug: string }
  >({
    mutationFn: ({ courseSlug, stageSlug }) =>
      UserStageService.completeStage(courseSlug, stageSlug),
  });
};
