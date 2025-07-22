import SSEClient from "@/lib/sse";
import { UserStageStatus } from "@/types/stage-status";

class UserStageStatusService {
  private static clientKey = "user-stage-status";
  private static client = SSEClient.getInstance(this.clientKey);

  /**
   * Subscribe to stage status updates
   */
  public static subscribe(
    courseSlug: string,
    stageSlug: string,
    onUpdate: (event: UserStageStatus) => void,
    onError?: (error: Error) => void,
  ): void {
    const relativeUrl = `/v1/user/courses/${courseSlug}/stages/${stageSlug}/status`;
    this.client.subscribe<UserStageStatus>(relativeUrl, onUpdate, onError);
  }

  /**
   * Unsubscribe from stage status updates
   */
  public static unsubscribe(onUpdate: (event: UserStageStatus) => void): void {
    this.client.unsubscribe(onUpdate);
  }
}

export default UserStageStatusService;
