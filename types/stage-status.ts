import { UserCourse } from "@/types/course";
import { StageWithState, UserStage } from "@/types/stage";

export enum StageStatus {
  Pending = "Pending",
  InProgress = "In-Progress",
  Completed = "Completed",
}

export function getIntroductionStatus(
  userCourse: UserCourse | null,
): StageStatus {
  if (!userCourse) return StageStatus.Pending;

  const hasProficiency =
    userCourse.proficiency !== null && userCourse.proficiency !== undefined;
  const hasCadence =
    userCourse.cadence !== null && userCourse.cadence !== undefined;
  const hasAccountability = userCourse.accountability !== null;

  if (hasProficiency && hasCadence && hasAccountability) {
    return StageStatus.Completed;
  } else if (!hasProficiency && !hasCadence && !hasAccountability) {
    return StageStatus.Pending;
  } else {
    return StageStatus.InProgress;
  }
}

export function getSetupStatus(userCourse: UserCourse | null): StageStatus {
  const introStatus = getIntroductionStatus(userCourse);
  const status =
    introStatus !== StageStatus.Completed
      ? StageStatus.Pending
      : userCourse?.activated
        ? StageStatus.Completed
        : StageStatus.InProgress;
  return status;
}

export function getStageStatus(userStage: UserStage | null): StageStatus {
  if (!userStage) {
    return StageStatus.Pending;
  }
  switch (userStage.status) {
    case "in_progress":
      return StageStatus.InProgress;
    case "completed":
      return StageStatus.Completed;
    default:
      return StageStatus.Pending;
  }
}

export interface UserStageStatus {
  /// Current progress status (in_progress, completed)
  status: "in_progress" | "completed";

  /// Test result status (passed, failed)
  test: "passed" | "failed";
}
