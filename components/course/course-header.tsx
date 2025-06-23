"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { useCourse } from "@/app/(course)/layout";

export default function CourseHeader() {
  const { stages } = useCourse();
  const { slug } = useParams<{ slug: string }>();
  const pathname = usePathname();

  const fullNavigationItems = [
    { slug: "introduction", name: "Introduction", type: "bootstrap" as const },
    { slug: "setup", name: "Repository Setup", type: "bootstrap" as const },
    ...stages.map((stage) => ({ ...stage, type: "stage" as const })),
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

  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex flex-1 items-center gap-0">
          {/* Back Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-r-0 rounded-tr-none rounded-br-none"
            disabled={!prevItem}
            asChild={!!prevItem}
          >
            {prevItem ? (
              <Link href={getNavigationPath(prevItem)}>
                <ChevronLeft /> Back
              </Link>
            ) : (
              <>
                <ChevronLeft /> Back
              </>
            )}
          </Button>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            className="rounded-tl-none rounded-bl-none"
            disabled={!nextItem}
            asChild={!!nextItem}
          >
            {nextItem ? (
              <Link href={getNavigationPath(nextItem)}>
                Next <ChevronRight />
              </Link>
            ) : (
              <>
                Next <ChevronRight />
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="ml-auto px-3">
        <Button variant="outline" size="sm" asChild>
          <Link href="/catalog">
            <X />
          </Link>
        </Button>
      </div>
    </header>
  );
}
