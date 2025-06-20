import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function CourseHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex flex-1 items-center gap-0">
          <Button
            variant="outline"
            size="sm"
            className="border-r-0 rounded-tr-none rounded-br-none"
          >
            <ChevronLeft /> Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-tl-none rounded-bl-none"
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="ml-auto px-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <X />
          </Button>
        </div>
      </div>
    </header>
  );
}
