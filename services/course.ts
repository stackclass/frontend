import http from "@/lib/http";
import { Course, CourseDetail, CreateCourseRequest } from "@/types/course";
import { AxiosResponse } from "axios";

/**
 * Service for managing course.
 */
export default class CourseService {
  /**
   * Find all courses.
   */
  static async find(): Promise<AxiosResponse<Course[]>> {
    return http.get("/v1/courses");
  }

  /**
   * Create a new course.
   * @param data - The course creation data.
   */
  static async create(
    data: CreateCourseRequest,
  ): Promise<AxiosResponse<Course>> {
    return http.post("/v1/courses", data);
  }

  /**
   * Get a course by slug.
   * @param slug - The course slug.
   */
  static async get(slug: string): Promise<AxiosResponse<CourseDetail>> {
    return http.get(`/v1/courses/${slug}`);
  }

  /**
   * Delete a course by slug.
   * @param slug - The course slug.
   */
  static async delete(slug: string): Promise<AxiosResponse<void>> {
    return http.delete(`/v1/courses/${slug}`);
  }

  /**
   * Update course from git repository
   * @param slug - The course slug.
   * @param data - The partial course data to update.
   */
  static async update(slug: string): Promise<AxiosResponse<Course>> {
    return http.patch(`/v1/courses/${slug}`);
  }
}
