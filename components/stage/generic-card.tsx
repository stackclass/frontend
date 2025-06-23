"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StageStatus } from "@/types/stage-status";
import { StatusBadge } from "./stage-status";

interface GenericCardProps {
  title: string;
  status?: StageStatus;
  children?: React.ReactNode;
}

export const GenericCard = ({ title, status, children }: GenericCardProps) => {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <div className="border-b flex justify-between pb-4">
          <CardTitle>
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl">{title}</h2>
              {status && <StatusBadge status={status} />}
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">{children}</CardContent>
    </Card>
  );
};
