import { StageNavButton } from "@/components/stage/stage-nav-button";

export function StageCompleted() {
  return (
    <div
      className="py-3.5 border-b border-primary/10 bg-gradient-to-b from-0% to-100%
      from-primary/5 to-primary/10 flex items-center justify-between gap-4
      flex-wrap px-3 md:px-6 lg:px-10 w-full scroll-mt-20"
    >
      <div className="flex items-center flex-wrap gap-4">
        <div className="text-2xl pl-1">🎉</div>
        <div className="text-primary">
          <p>You&apos;ve completed this step.</p>
        </div>

        <StageNavButton />
      </div>
    </div>
  );
}
