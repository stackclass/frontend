import http from "@/lib/http";
import { CreateUserCourseRequest, UserCourse } from "@/types/course";
import { UserStage } from "@/types/stage";
import { AxiosResponse } from "axios";

export default class UserStageService {
  /**
   * Find all stages for the current user.
   * @param slug - The slug of course.
   */
  static async findUserStages(
    slug: string,
  ): Promise<AxiosResponse<UserStage[]>> {
    return http.get(`/v1/user/courses/${slug}/stages`);
  }

  /**
   * Get the details of the stage for the current user.
   * @param slug - The slug of course
   * @param stageSlug - The slug of the stage.
   */
  static async getUserStage(
    slug: string,
    stageSlug: string,
  ): Promise<AxiosResponse<UserStage>> {
    return http.get(`/v1/user/courses/${slug}/stages/${stageSlug}`);
  }

  /**
   * Mark a stage as completed for the current user.
   * @param slug - The slug of course.
   * @param stageSlug - The slug of the stage to associate.
   * @returns A promise resolving to the associated user stage.
   */
  static async completeStage(
    slug: string,
    stageSlug: string,
  ): Promise<AxiosResponse<UserStage>> {
    return http.post(`/v1/user/courses/${slug}/stages`, {
      slug: stageSlug,
    });
  }
}
