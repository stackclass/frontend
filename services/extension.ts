import http from "@/lib/http";
import { Extension } from "@/types/extension";
import { AxiosResponse } from "axios";

/**
 * Service for managing course extensions.
 */
export default class ExtensionService {
  /**
   * Find all extensions for a course.
   * @param slug - The course slug.
   * @returns A promise resolving to an array of extensions.
   */
  static async findAllExtensions(
    slug: string,
  ): Promise<AxiosResponse<Extension[]>> {
    return http.get(`/v1/courses/${slug}/extensions`);
  }
}
