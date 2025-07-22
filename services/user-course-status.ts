import SSEClient from "@/lib/sse";
import { UserCourse } from "@/types/course";

class UserCourseStatusService {
  private static clientKey = "user-course-status";
  private static client = SSEClient.getInstance(this.clientKey);

  /**
   * Subscribe to course status updates
   */
  public static subscribe(
    slug: string,
    onUpdate: (event: UserCourse) => void,
    onError?: (error: Error) => void,
  ): void {
    const relativeUrl = `/v1/user/courses/${slug}/status`;
    this.client.subscribe<UserCourse>(relativeUrl, onUpdate, onError);
  }

  /**
   * Unsubscribe from course status updates
   */
  public static unsubscribe(onUpdate: (event: UserCourse) => void): void {
    this.client.unsubscribe(onUpdate);
  }
}

export default UserCourseStatusService;
