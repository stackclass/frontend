import { StatusBadge } from "@/components/stage/stage-status";
import { StageStatus } from "@/types/stage-status";

interface StageHeaderProps {
  title: string;
  status: StageStatus;
}

export default function StageHeader({ title, status }: StageHeaderProps) {
  return (
    <div className="flex items-center p-4">
      <h1 className="text-2xl font-bold mr-4">{title}</h1>
      <StatusBadge status={status} />
    </div>
  );
}
