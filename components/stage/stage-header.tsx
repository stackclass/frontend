import { StatusBadge } from "@/components/stage/stage-status";
import { StageStatus } from "@/types/stage-status";

interface StageHeaderProps {
  title: string;
  slug?: string;
  status?: StageStatus | boolean;
  description?: string | boolean;
}

export function StageHeader({
  title,
  slug,
  status,
  description,
}: StageHeaderProps) {
  return (
    <div className="p-4 bg-accent">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {slug && (
          <span className="text-2xl font-bold text-gray-500 uppercase">
            #{slug}
          </span>
        )}
        {status && typeof status !== "boolean" && (
          <StatusBadge status={status} />
        )}
      </div>

      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
