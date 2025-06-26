import { StatusBadge } from "@/components/stage/stage-status";
import { StageStatus } from "@/types/stage-status";

interface StageHeaderProps {
  title: string;
  slug?: string;
  status?: StageStatus;
  description?: string;
}

export function StageHeader({
  title,
  slug,
  status,
  description,
}: StageHeaderProps) {
  return (
    <div className="p-4 bg-gray-100">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {slug && (
          <span className="text-2xl font-bold text-gray-500">#{slug}</span>
        )}
        {status && <StatusBadge status={status} />}
      </div>

      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
