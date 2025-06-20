import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { StageStatus } from "@/types/stage-status";

interface StatusBadgeProps {
  status: StageStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case StageStatus.Pending:
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 border-gray-500 text-gray-700 rounded-2xl font-bold"
        >
          {status}
        </Badge>
      );
    case StageStatus.InProgress:
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 border-yellow-500 text-yellow-700 rounded-2xl font-bold"
        >
          {status}
        </Badge>
      );
    case StageStatus.Completed:
      return (
        <Badge
          variant="outline"
          className="bg-green-100 border-green-500 text-green-700 rounded-2xl font-bold"
        >
          <CircleCheck className="mr-1" /> {status}
        </Badge>
      );
    default:
      return null;
  }
}
