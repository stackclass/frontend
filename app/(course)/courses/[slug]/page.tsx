"use client";

import { useUserCourse } from "@/hooks/use-user-course";
import {
  getIntroductionStatus,
  getSetupStatus,
  StageStatus,
} from "@/types/stage-status";
import { redirect, useParams } from "next/navigation";

export default function CourseEntryPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: userCourseData } = useUserCourse(slug, {
    retry: false,
  });
  const userCourse = userCourseData ?? null;

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
