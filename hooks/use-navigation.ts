"use client";

import { useCourse } from "@/app/(course)/layout";
import { useParams, usePathname } from "next/navigation";

export function useNavigation() {
  const { stages } = useCourse();
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

  const getNavigationPath = (item: (typeof fullNavigationItems)[number]) => {
    return item.type === "bootstrap"
      ? `/courses/${slug}/${item.slug}`
      : `/courses/${slug}/stages/${item.slug}`;
  };

  return {
    fullNavigationItems,
    currentSlug,
    currentIndex,
    prevItem,
    nextItem,
    getNavigationPath,
  };
}
