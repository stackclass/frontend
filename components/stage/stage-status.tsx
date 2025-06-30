import { Badge } from "@/components/ui/badge";
import { CircleCheck } from "lucide-react";
import { StageStatus } from "@/types/stage-status";

interface StatusProps {
  status: StageStatus;
}

export function StatusBadge({ status }: StatusProps) {
  const statusMap = {
    [StageStatus.Pending]: {
      className: "bg-gray-100 border-gray-500 text-gray-700",
      icon: null,
    },
    [StageStatus.InProgress]: {
      className: "bg-yellow-100 border-yellow-500 text-yellow-700",
      icon: null,
    },
    [StageStatus.Completed]: {
      className: "bg-green-100 border-green-500 text-green-700",
      icon: <CircleCheck />,
    },
  };

  const config = statusMap[status];
  if (!config) return null;

  return (
    <Badge
      variant="outline"
      className={`${config.className} rounded-2xl font-bold`}
    >
      {config.icon}
      {status}
    </Badge>
  );
}
