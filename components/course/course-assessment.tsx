import { StatusBadge } from "@/components/stage/stage-status";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { StageStatus } from "@/types/stage-status";
import { ArrowDown, Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface CourseAssessmentProps {
  status: StageStatus;
  proficiency: string | null;
  cadence: string | null;
  accountability: boolean | null;
  onProficiencyChange: Dispatch<SetStateAction<string | null>>;
  onCadenceChange: Dispatch<SetStateAction<string | null>>;
  onAccountabilityChange: Dispatch<SetStateAction<boolean | null>>;
}

interface Option<T = string | boolean> {
  key: string;
  value: T;
  label: string;
  description?: string;
}

interface AssessmentItemProps<T> {
  title: string;
  value: T | null;
  options: Option<T>[];
  onChange: (value: T) => void;
  description: string;
  additionalContent?: React.ReactNode;
  isActive: boolean;
  onToggle: (isOpen: boolean) => void;
  disabled?: boolean;
}

function AssessmentItem<T extends string | boolean>({
  title,
  value,
  options,
  onChange,
  description,
  additionalContent,
  isActive,
  onToggle,
  disabled = false,
}: AssessmentItemProps<T>) {
  const selectedOption =
    value !== null ? options.find((opt) => opt.value === value) : null;

  return (
    <Collapsible open={isActive} onOpenChange={onToggle}>
      <Card className="px-6 py-4 rounded-none border-t border-l-0 border-r-0 border-b-0">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center text-gray-600">
              <span className="font-bold">
                {title}
                {value !== null && ":"}
              </span>
              {value !== undefined && selectedOption && (
                <>
                  <span className="ml-2 font-semibold">
                    {selectedOption.label}
                  </span>
                  <Check className="ml-2 h-5 w-5 text-green-500" />
                </>
              )}
            </div>
            <span className="text-gray-500">
              {!isActive && <ChevronDown />}
            </span>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <p className="text-gray-600 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <Button
                key={option.key}
                variant={value === option.value ? "default" : "outline"}
                onClick={() => onChange(option.value)}
                disabled={disabled}
              >
                {option.label}
              </Button>
            ))}
          </div>
          {selectedOption?.description && (
            <p className="mt-3 text-sm text-gray-500">
              {selectedOption.description}
            </p>
          )}
          {additionalContent}
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

const proficiencies: Option<string>[] = [
  {
    key: "never_tried",
    value: "never_tried",
    label: "Never tried",
    description:
      "First time with this language? Start with beginner-friendly tutorials or interactive courses to grasp the basics before diving in.",
  },
  {
    key: "beginner",
    value: "beginner",
    label: "Beginner",
    description:
      "If you're new to this language, try small coding exercises or guided projects to build confidence before tackling challenges.",
  },
  {
    key: "intermediate",
    value: "intermediate",
    label: "Intermediate",
    description:
      "Already comfortable with the basics? Compare your solutions with others in the community to learn new techniques and best practices.",
  },
  {
    key: "advanced",
    value: "advanced",
    label: "Advanced",
    description:
      "For seasoned learners, focus on optimizing your code or exploring advanced topics like performance tuning and idiomatic patterns.",
  },
];

const cadences: Option<string>[] = [
  { key: "every_day", value: "every_day", label: "Every day" },
  {
    key: "few_times_week",
    value: "few_times_week",
    label: "Few times a week",
  },
  { key: "once_week", value: "once_week", label: "Once a week" },
  {
    key: "few_times_month",
    value: "few_times_month",
    label: "Few times a month",
  },
  { key: "once_month", value: "once_month", label: "Once a month" },
];

const accountabilities: Option<boolean>[] = [
  { key: "yes", value: true, label: "Yes please" },
  { key: "no", value: false, label: "I'll pass" },
];

export function CourseAssessment({
  status,
  proficiency,
  cadence,
  accountability,
  onProficiencyChange,
  onCadenceChange,
  onAccountabilityChange,
}: CourseAssessmentProps) {
  const [activeSection, setActiveSection] = useState<string>(
    status === StageStatus.Completed ? "" : "proficiency",
  );

  const [initialProficiency] = useState(proficiency);

  return (
    <div className="rounded border">
      <div className="flex items-center space-x-6 px-6 py-2 bg-accent">
        <h1 className="text-lg font-semibold">Pre-Challenge Assessment</h1>
        {status != StageStatus.Pending && <StatusBadge status={status} />}
      </div>

      <AssessmentItem
        title="Language Proficiency"
        value={proficiency}
        options={proficiencies}
        onChange={onProficiencyChange}
        description="How would you describe your experience level with this language? We can tailor your experience accordingly."
        isActive={activeSection === "proficiency"}
        onToggle={(open) => setActiveSection(open ? "proficiency" : "")}
        additionalContent={
          proficiency !== initialProficiency && (
            <div className="mt-6 flex justify-start">
              <Button onClick={() => setActiveSection("cadence")}>
                <ArrowDown /> Next question
              </Button>
            </div>
          )
        }
      />

      <AssessmentItem
        title="Practice Cadence"
        value={cadence}
        options={cadences}
        onChange={(value) => {
          onCadenceChange(value);
          setActiveSection("accountability");
        }}
        description="How often do you intend to practice? Learners that maintain a consistent cadence are most likely to meet their learning objectives."
        isActive={activeSection === "cadence"}
        onToggle={(open) => setActiveSection(open ? "cadence" : "")}
        disabled={!proficiency}
      />

      <AssessmentItem
        title="Accountability"
        value={accountability}
        options={accountabilities}
        onChange={(value) => {
          onAccountabilityChange(value);
          setActiveSection("");
        }}
        description="Would you like us to email you occasional friendly nudges to help you stay accountable, as well as tips on maximising your learning experience?"
        isActive={activeSection === "accountability"}
        onToggle={(open) => setActiveSection(open ? "accountability" : "")}
        disabled={!cadence}
      />
    </div>
  );
}
