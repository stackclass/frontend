import http from "@/lib/http";
import { Solution, Stage, StageDetail } from "@/types/stage";
import { AxiosResponse } from "axios";

/**
 * Service for managing stages and their solutions.
 */
export class StageService {
  /**
   * Find all stages for a course (including extensions)
   * @param slug - The slug of the course.
   * @returns A promise resolving to an array of Stage objects.
   */
  static async findAllStages(slug: string): Promise<AxiosResponse<Stage[]>> {
    return http.get(`/v1/courses/${slug}/stages`);
  }

  /**
   * Find only base stages for a course (excluding extensions).
   * @param slug - The slug of the course.
   * @returns A promise resolving to an array of Stage objects.
   */
  static async findBaseStages(slug: string): Promise<AxiosResponse<Stage[]>> {
    return http.get(`/v1/courses/${slug}/stages/base`);
  }

  /**
   * Find only extended stages for a course.
   * @param slug - The slug of the course.
   * @returns A promise resolving to an array of Stage objects.
   */
  static async findExtendedStages(
    slug: string,
  ): Promise<AxiosResponse<Stage[]>> {
    return http.get(`/v1/courses/${slug}/stages/extended`);
  }

  /**
   * Fetches details for a specific stage.
   * @param courseSlug - The slug of the course.
   * @param stageSlug - The slug of the stage.
   * @returns A promise resolving to a StageDetail object.
   */
  static async get(
    courseSlug: string,
    stageSlug: string,
  ): Promise<AxiosResponse<StageDetail>> {
    return http.get(`/v1/courses/${courseSlug}/stages/${stageSlug}`);
  }
}
