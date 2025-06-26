"use client";

import { StatusBadge } from "@/components/stage/stage-status";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { StageStatus } from "@/types/stage-status";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CourseAssessmentProps {
  status: StageStatus;
}

export function CourseAssessment({ status }: CourseAssessmentProps) {
  const [languageProficiency, setLanguageProficiency] =
    useState<string>("Advanced");
  const [practiceCadence, setPracticeCadence] =
    useState<string>("Once a month");
  const [accountability, setAccountability] = useState<boolean | null>(null);

  const [activeSection, setActiveSection] = useState<string>("language");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const proficiencies = ["Never tried", "Beginner", "Intermediate", "Advanced"];
  const cadences = [
    "Every day",
    "Few times a week",
    "Once a week",
    "Few times a month",
    "Once a month",
  ];

  const handleComplete = () => {};

  return (
    <div className="rounded border">
      <div className="flex items-center space-x-6 px-6 py-2 bg-accent">
        <h1 className="text-lg font-semibold">Pre-Challenge Assessment</h1>
        <StatusBadge status={status} />
      </div>

      <Collapsible
        open={activeSection === "proficiency"}
        onOpenChange={(open) => setActiveSection(open ? "proficiency" : "")}
      >
        <Card className="px-6 py-4 rounded-none border-t border-l-0 border-r-0 border-b-0">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center text-gray-600">
                <span className="font-bold">Language Proficiency:</span>
                {languageProficiency && (
                  <>
                    <span className="ml-2">{languageProficiency}</span>
                    <Check className="ml-2 h-5 w-5 text-green-500" />
                  </>
                )}
              </div>

              <span className="text-gray-500">
                {activeSection != "proficiency" && <ChevronDown />}
              </span>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <p className="text-gray-600 mb-3">
              How would you describe your experience level with this language?
              We can tailor your experience accordingly.
            </p>
            <div className="flex flex-wrap gap-2">
              {proficiencies.map((prof) => (
                <Button
                  key={prof}
                  variant={languageProficiency === prof ? "default" : "outline"}
                  onClick={() => setLanguageProficiency(prof)}
                >
                  {prof}
                </Button>
              ))}
            </div>
            {languageProficiency !== "Never tried" && (
              <p className="mt-3 text-sm text-gray-500">
                If you're already familiar with this language, CodeCraft can be
                a good way to further your mastery. If you get stuck, you can
                use our Code Examples feature to see code from other users.
              </p>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible
        open={activeSection === "cadence"}
        onOpenChange={(open) => setActiveSection(open ? "cadence" : "")}
      >
        <Card className="px-6 py-4 rounded-none border-t border-l-0 border-r-0 border-b-0">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center text-gray-600">
                <span className="font-bold">Practice Cadence:</span>
                {practiceCadence && (
                  <>
                    <span className="ml-2 font-semibold">
                      {practiceCadence}
                    </span>
                    <Check className="ml-2 h-5 w-5 text-green-500" />
                  </>
                )}
              </div>
              <span className="text-gray-500">
                {activeSection != "cadence" && <ChevronDown />}
              </span>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <p className="text-gray-600 mb-3">
              How often do you intend to practice? Learners that maintain a
              consistent cadence are most likely to meet their learning
              objectives.
            </p>
            <div className="flex flex-wrap gap-2">
              {cadences.map((cad) => (
                <Button
                  key={cad}
                  variant={practiceCadence === cad ? "default" : "outline"}
                  onClick={() => setPracticeCadence(cad)}
                >
                  {cad}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible
        open={activeSection === "accountability"}
        onOpenChange={(open) => setActiveSection(open ? "accountability" : "")}
      >
        <Card className="px-6 py-4 rounded-none border-t border-l-0 border-r-0 border-b-0">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center text-gray-600">
                <span className="font-bold">Accountability:</span>
                {accountability != null && (
                  <>
                    <span className="ml-2 font-semibold">
                      {accountability ? "Yes please" : "I'll pass"}
                    </span>
                    <Check className="ml-2 h-5 w-5 text-green-500" />
                  </>
                )}
              </div>

              <span className="text-gray-500">
                {activeSection != "accountability" && <ChevronDown />}
              </span>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <p className="text-gray-600 mb-3">
              Would you like us to email you occasional friendly nudges to help
              you stay accountable, as well as tips on maximizing your learning
              experience?
            </p>
            <div className="flex gap-3">
              <Button
                variant={accountability === true ? "default" : "outline"}
                onClick={() => setAccountability(true)}
              >
                Yes please
              </Button>
              <Button
                variant={accountability === false ? "default" : "outline"}
                onClick={() => setAccountability(false)}
              >
                I'll pass
              </Button>
            </div>

            {status === StageStatus.Completed && (
              <div className="mt-6 flex justify-start">
                <Button
                  onClick={handleComplete}
                  disabled={
                    !languageProficiency ||
                    !practiceCadence ||
                    accountability === null
                  }
                >
                  Continue
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
