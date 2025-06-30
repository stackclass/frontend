import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function StageCompleted() {
  return (
    <div
      className="py-3.5 border-b border-green-200 bg-gradient-to-b from-0% to-100%
      from-green-50 to-green-100 flex items-center justify-between gap-4
      flex-wrap px-3 md:px-6 lg:px-10 w-full scroll-mt-20"
    >
      <div className="flex items-center flex-wrap gap-4">
        <div className="text-2xl pl-1">🎉</div>
        <div className="text-green-700">
          <p>You've completed this step.</p>
        </div>

        <Button
          className="w-fit font-bold bg-teal-500 hover:bg-teal-600 rounded-sm"
          asChild
        >
          <Link href="#">
            Back to current stage <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
