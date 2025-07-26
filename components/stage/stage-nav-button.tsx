import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export function StageNavButton({ className }: { className?: string }) {
  const { backDistance, backDirection, backItem, path } = useNavigation();

  const buttonText =
    backDirection === "forward" && backDistance === 1
      ? "View next stage"
      : "Back to current stage";

  return (
    <Button
      className={cn("w-fit font-bold hover:bg-primary rounded-sm", className)}
      asChild
    >
      <Link href={backItem ? path(backItem) : "#"}>
        {backDirection === "backward" ? (
          <>
            <ArrowLeft /> {buttonText}
          </>
        ) : (
          <>
            {buttonText} <ArrowRight />
          </>
        )}
      </Link>
    </Button>
  );
}
