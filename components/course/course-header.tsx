"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigation } from "@/hooks/use-navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";

export default function CourseHeader() {
  const { prevItem, nextItem, path } = useNavigation();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 bg-accent">
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
              <Link href={path(prevItem)}>
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
              <Link href={path(nextItem)}>
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
      <div className="flex ml-auto px-3 gap-2">
        <ModeToggle />
        <Button variant="outline" size="icon" asChild>
          <Link href="/catalog">
            <X />
          </Link>
        </Button>
      </div>
    </header>
  );
}
