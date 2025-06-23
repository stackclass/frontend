import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Code } from "@/components/ui/code";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleCheck } from "lucide-react";

import StageHeader from "@/components/stage/stage-header";
import { StageTabs } from "@/components/stage/stage-tabs";
import { GenericCard } from "@/components/stage/generic-card";

import { StageStatus } from "@/types/stage-status";

export default function CourseSetupPage() {
  return (
    <>
      <StageHeader title="Repository Setup" status={StageStatus.InProgress} />

      <StageTabs tabs={[{ value: "instructions", label: "Instructions" }]} />

      <main className="p-4">
        <GenericCard title="Repository Setup" status={StageStatus.InProgress}>
          <div className="max-w-5xl flex flex-col space-y-4">
            <p>We've prepared a starter repository with some code for you.</p>
            <div className="flex items-center space-x-2">
              <CircleCheck color="green" />
              <span>Accept terms and conditions</span>
            </div>
            <Code title="command line">
              <div>
                git clone {process.env.BACKEND_URL}/git/5859dab1ca7ee5c7
                codecraft-interpreter
              </div>
              <div>cd codecraft-interpreter</div>
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
              message below will change, and the first stage will be activated.
            </p>
            <p>🎉 Git push received! The first stage is now activated.</p>

            <Button size="lg" className="w-fit font-bold">
              Continue <ArrowRight />
            </Button>
          </div>
        </GenericCard>
      </main>
    </>
  );
}
