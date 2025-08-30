"use client";

import { redirect, useParams } from "next/navigation";
import { useCourseContext } from "@/app/(course)/layout";
import {
  getIntroductionStatus,
  getSetupStatus,
  StageStatus,
} from "@/types/stage-status";

export default function CourseEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { userCourse } = useCourseContext();

  let targetPath = `/courses/${slug}/introduction`;

  if (userCourse?.current_stage_slug) {
    targetPath = `/courses/${slug}/stages/${userCourse.current_stage_slug}`;
  } else if (getSetupStatus(userCourse) === StageStatus.InProgress) {
    targetPath = `/courses/${slug}/setup`;
  } else if (getIntroductionStatus(userCourse) !== StageStatus.Completed) {
    targetPath = `/courses/${slug}/introduction`;
  }

  redirect(targetPath);
}
