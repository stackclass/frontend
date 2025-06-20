import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import StageHeader from "@/components/stage/stage-header";
import { StageStatus } from "@/types/stage-status";
import { StatusBadge } from "@/components/stage/stage-status";
import { ArrowRight, CircleCheck, Copy, LucideArrowRight } from "lucide-react";
import { Code } from "@/components/ui/code";
import { Button } from "@/components/ui/button";
import { GenericCard } from "@/components/stage/generic-card";

export default function CourseSetupPage() {
  return (
    <>
      <StageHeader title="Repository Setup" status={StageStatus.InProgress} />

      <Tabs defaultValue="instructions" className="p-4">
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="instructions">
          <GenericCard title="Repository Setup" status={StageStatus.InProgress}>
            <div className="max-w-5xl flex flex-col space-y-4">
              <p>We've prepared a starter repository with some code for you.</p>
              <div className="flex items-center space-x-2">
                <CircleCheck color="green" />
                <span>Accept terms and conditions</span>
              </div>
              <Code title="command line">
                <div>
                  git clone https://git.codecrafters.io/5859dab1ca7ee5c7
                  codecrafters-interpreter-rust
                </div>
                <div>cd codecrafters-interpreter-rust</div>
              </Code>
              <div className="flex items-center space-x-2">
                <CircleCheck color="green" />
                <span>Push an empty commit</span>
              </div>
              <Code title="command line">
                <div>git commit --allow-empty -m 'test'</div>
                <div>git push origin master</div>
              </Code>
              <p className="line-through">
                When you run the above command, the "Listening for a git push"
                message below will change, and the first stage will be
                activated.
              </p>
              <p>🎉 Git push received! The first stage is now activated.</p>

              <Button size="lg" className="w-fit font-bold">
                Continue <ArrowRight />
              </Button>
            </div>
          </GenericCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
