import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { Code } from "../ui/code";

interface TestRunnerProps {
  status: "passed" | "failed";
}

const statusConfig = {
  passed: {
    message: "Tests passed.",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
  },
  failed: {
    message: "Tests failed.",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
  },
};

export default function TestRunner({ status }: TestRunnerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Return null if no status is provided to prevent rendering the component
  if (!status) return null;

  // Get config based on test status (passed/failed)
  const config = statusConfig[status];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="rounded-sm py-4 gap-4">
        <CardHeader className="gap-0">
          <CardTitle>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg">TEST RUNNER:</h2>
              <span className={`h-3 w-3 rounded-full ${config.bgColor}`} />
              <span className={`text-sm font-medium ${config.textColor}`}>
                {config.message}
              </span>
            </div>
          </CardTitle>

          <CardAction>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                {isOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Hide Instructions
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    View Instructions
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </CardAction>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-4">
            <hr />
            <p>
              To run tests again, make changes to your code and run the
              following commands:
            </p>

            <Code title="command line">
              <div>git add .</div>
              <div>git commit --allow-empty -m &quot;[any message]&quot;</div>
              <div>git push origin main</div>
            </Code>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
