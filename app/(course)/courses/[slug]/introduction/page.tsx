import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import StageHeader from "@/components/stage/stage-header";
import { StageStatus } from "@/types/stage-status";
import { GenericCard } from "@/components/stage/generic-card";

export default function CourseIntroductionPage() {
  return (
    <>
      <StageHeader title="Introduction" status={StageStatus.Completed} />

      <Tabs defaultValue="instructions" className="p-4">
        <TabsList>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="instructions">
          <GenericCard title="Introduction">
            <div className="max-w-[90ch]">
              <p className="mb-2">
                Welcome to the Build your own Interpreter challenge!{" "}
              </p>
              <p className="mb-2">
                This challenge follows the book Crafting Interpreters by Robert
                Nystrom.
              </p>
              <p className="mb-2">
                In this challenge you'll build an interpreter for Lox, a simple
                scripting language. Along the way, you'll learn about
                tokenization, ASTs, tree-walk interpreters and more.
              </p>
              <p className="mb-2">
                Before starting this challenge, make sure you've read the
                "Welcome" part of the book that contains these chapters:
              </p>
              <ul>
                <li>Introduction (chapter 1)</li>
                <li> A Map of the Territory (chapter 2)</li>
                <li> The Lox Language (chapter 3)</li>
              </ul>
              <p className="mb-2">
                These chapters don't involve writing code, so they won't be
                covered in this challenge. This challenge will start from
                chapter 4, Scanning.
              </p>
            </div>
          </GenericCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
