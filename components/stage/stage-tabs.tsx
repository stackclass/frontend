import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Code2, MessageSquare } from "lucide-react";

interface TabItem {
  value: string;
  label: string;
  isLink?: boolean;
  href?: string;
  icon?: LucideIcon;
}

interface StageTabsProps {
  tabs: TabItem[];
  active?: string;
}

// Default icons as components
const defaultIcons: Record<string, LucideIcon> = {
  instructions: BookOpen,
  example: Code2,
  forum: MessageSquare,
};

export function StageTabs({ tabs, active }: StageTabsProps) {
  const resolvedActive = active || tabs[0]?.value;

  return (
    <div className="p-4">
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const IconComponent = tab.icon || defaultIcons[tab.value];
          return tab.isLink ? (
            <Link
              key={tab.value}
              href={tab.href || "#"}
              className={`px-1 py-3 font-medium transition-colors border-b-2 ${
                resolvedActive === tab.value
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                {tab.label}
              </div>
            </Link>
          ) : (
            <button
              key={tab.value}
              className={`px-1 py-3 font-medium transition-colors border-b-2 ${
                resolvedActive === tab.value
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center">
                {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>
      <Separator />
    </div>
  );
}
