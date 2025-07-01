import http from "@/lib/http";
import {
  CreateUserCourseRequest,
  UpdateUserCourseRequest,
  UserCourse,
} from "@/types/course";
import { AxiosResponse } from "axios";

export default class UserCourseService {
  /**
   * Find all stages for the current user.
   */
  static async findUserCourses(): Promise<AxiosResponse<UserCourse[]>> {
    return http.get("/v1/user/courses");
  }

  /**
   * Enroll the current user in a course.
   * @param data - The data for creating a user course.
   */
  static async createUserCourse(
    data: CreateUserCourseRequest,
  ): Promise<AxiosResponse<UserCourse>> {
    return http.post("/v1/user/courses", data);
  }

  /**
   * Get the details of the stage for the current user.
   * @param slug - The slug of course.
   */
  static async getUserCourse(slug: string): Promise<AxiosResponse<UserCourse>> {
    return http.get(`/v1/user/courses/${slug}`);
  }

  /**
   * Update this course for the current user.
   * @param data - The data for updating a user course.
   */
  static async updateUserCourse(
    slug: string,
    data: UpdateUserCourseRequest,
  ): Promise<AxiosResponse<void>> {
    return http.patch(`/v1/user/courses/${slug}`, data);
  }
}
