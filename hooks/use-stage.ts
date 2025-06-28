import StageService from "@/services/stage";
import { Stage, StageDetail } from "@/types/stage";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * Hook for fetching all stages for a course (including extensions).
 * @param slug - The slug of the course.
 * @param options - Optional react-query options.
 */
export const useStages = (
  slug: string,
  options?: UseQueryOptions<AxiosResponse<Stage[]>, Error>,
) => {
  return useQuery<AxiosResponse<Stage[]>, Error>({
    queryKey: ["stages", slug],
    queryFn: () => StageService.findAllStages(slug),
    ...options,
  });
};

/**
 * Hook for fetching only base stages for a course (excluding extensions).
 * @param slug - The slug of the course.
 * @param options - Optional react-query options.
 */
export const useBaseStages = (
  slug: string,
  options?: UseQueryOptions<AxiosResponse<Stage[]>, Error>,
) => {
  return useQuery<AxiosResponse<Stage[]>, Error>({
    queryKey: ["baseStages", slug],
    queryFn: () => StageService.findBaseStages(slug),
    ...options,
  });
};

/**
 * Hook for fetching only extended stages for a course.
 * @param slug - The slug of the course.
 * @param options - Optional react-query options.
 */
export const useExtendedStages = (
  slug: string,
  options?: UseQueryOptions<AxiosResponse<Stage[]>, Error>,
) => {
  return useQuery<AxiosResponse<Stage[]>, Error>({
    queryKey: ["extendedStages", slug],
    queryFn: () => StageService.findExtendedStages(slug),
    ...options,
  });
};

/**
 * Hook for fetching details for a specific stage.
 * @param courseSlug - The slug of the course.
 * @param stageSlug - The slug of the stage.
 * @param options - Optional react-query options.
 */
export const useStage = (
  courseSlug: string,
  stageSlug: string,
  options?: UseQueryOptions<AxiosResponse<StageDetail>, Error>,
) => {
  return useQuery<AxiosResponse<StageDetail>, Error>({
    queryKey: ["stage", courseSlug, stageSlug],
    queryFn: () => StageService.get(courseSlug, stageSlug),
    ...options,
  });
};
