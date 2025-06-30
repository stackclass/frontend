import type { LucideIcon } from "lucide-react";
import { BookOpen, Code2, MessageSquare } from "lucide-react";
import Link from "next/link";

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
    <div className="px-4 pt-2 bg-gray-100 sticky top-0 z-10 border-b">
      <div className="flex space-x-8">
        {tabs.map((tab) => {
          const IconComponent = tab.icon || defaultIcons[tab.value];
          const isActive = resolvedActive === tab.value;
          const className = `p-2 transition-colors border-b-2 ${
            isActive
              ? "border-blue-500"
              : "border-transparent text-gray-600 hover:border-gray-300"
          }`;

          return (
            <div key={tab.value} className={className}>
              {tab.isLink ? (
                <Link href={tab.href || "#"}>
                  <div className="flex items-center">
                    {IconComponent && (
                      <IconComponent className="w-4 h-4 mr-2" />
                    )}
                    {tab.label}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center">
                  {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                  {tab.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
