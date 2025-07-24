"use client";

import { useCourseContext } from "@/app/(course)/layout";
import {
  getIntroductionStatus,
  getSetupStatus,
  StageStatus,
} from "@/types/stage-status";
import { useParams, usePathname } from "next/navigation";

export function useNavigation() {
  const { stages, userCourse } = useCourseContext();
  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();

  const fullNavigationItems = [
    { slug: "introduction", name: "Introduction", type: "bootstrap" as const },
    { slug: "setup", name: "Repository Setup", type: "bootstrap" as const },
    ...stages.map((stage) => ({ ...stage.stage, type: "stage" as const })),
  ];

  const currentSlug = pathname.startsWith(`/courses/${slug}/stages/`)
    ? pathname.split("/").pop()!
    : pathname.split("/")[3];

  const currentIndex = fullNavigationItems.findIndex(
    (item) => item.slug === currentSlug,
  );

  const prevItem =
    currentIndex > 0 ? fullNavigationItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < fullNavigationItems.length - 1
      ? fullNavigationItems[currentIndex + 1]
      : null;

  const backIndex = (() => {
    let targetSlug: string | null = null;

    if (userCourse?.current_stage_slug) {
      targetSlug = userCourse.current_stage_slug;
    } else if (getSetupStatus(userCourse) === StageStatus.InProgress) {
      targetSlug = "setup";
    } else if (getIntroductionStatus(userCourse) !== StageStatus.Completed) {
      targetSlug = "introduction";
    }

    return fullNavigationItems.findIndex((item) => item.slug === targetSlug);
  })();

  const backItem = fullNavigationItems[backIndex];
  const backDirection = currentIndex < backIndex ? "forward" : "backward";
  const backDistance = backIndex >= 0 ? Math.abs(currentIndex - backIndex) : 0;

  const path = (item: (typeof fullNavigationItems)[number]) => {
    return item.type === "bootstrap"
      ? `/courses/${slug}/${item.slug}`
      : `/courses/${slug}/stages/${item.slug}`;
  };

  return {
    currentSlug,
    currentIndex,
    prevItem,
    nextItem,
    path,
    backItem,
    backIndex,
    backDirection,
    backDistance,
  };
}
