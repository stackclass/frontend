import { ReactNode } from "react";

interface StageGroupProps {
  title: string;
  children: ReactNode;
}

export function StageGroup({ title, children }: StageGroupProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-600 dark:text-gray-400 text-center relative my-3">
          <span className="block h-px w-full bg-gray-200 dark:bg-white/5 absolute top-1/2 -mt-px"></span>
          <span className="relative px-6 bg-white dark:bg-gray-850">
            {title}
          </span>
        </h2>
      </div>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}
