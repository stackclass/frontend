import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StageStatus } from "@/types/stage-status";
import { Check, CircleCheck, Ellipsis, Hash } from "lucide-react";

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

interface StatusIconProps extends StatusProps {
  icon?: React.ReactNode;
  className?: string;
}

export function StatusIcon({ status, icon, className }: StatusIconProps) {
  const statusMap = {
    [StageStatus.Pending]: {
      className: className ?? "rounded-[3px] border-gray-300 text-gray-500",
      icon: icon || <Hash size={16} />,
    },
    [StageStatus.InProgress]: {
      className: "rounded-full border-primary text-primary",
      icon: <Ellipsis size={16} />,
    },
    [StageStatus.Completed]: {
      className: "rounded-full text-white bg-primary",
      icon: <Check size={16} />,
    },
  };

  const config = statusMap[status];
  if (!config) return null;

  return (
    <div className={cn("border px-0.5 py-0.5", config.className)}>
      {config.icon}
    </div>
  );
}
