import { StageNavButton } from "@/components/stage/stage-nav-button";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { useState } from "react";

// Config map for different states
const configMap = new Map([
  [
    "forward",
    {
      icon: "🎉",
      title: "Step Completed!",
      subtitle: "You've completed this step.",
      action: "Show instructions again",
    },
  ],
  [
    "backward",
    {
      icon: "⚠️",
      title: "Previous steps incomplete!",
      subtitle:
        "This step depends on previous steps that you haven't completed yet.",
      action: "I'm just exploring 👀",
    },
  ],
]);

export default function Overlay({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const { currentIndex, backIndex, backDirection } = useNavigation();

  if (!isVisible || currentIndex === backIndex) {
    return <>{children}</>;
  }

  // Determine the config based on navigation direction
  const config = configMap.get(backDirection);

  return (
    <div className="relative w-full h-full">
      {children}
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg mx-4 max-w-md border text-center  overflow-y-auto max-h-[90vh]">
          <div className="w-full mb-4">
            <div className="text-6xl mb-2">{config?.icon}</div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {config?.title}
            </h2>
            <p className="text-gray-600 text-balance">{config?.subtitle}</p>
          </div>

          <div className="space-y-3">
            <StageNavButton className="w-full" />

            <Button
              variant="link"
              className="w-full text-gray-600 underline cursor-pointer"
              onClick={() => setIsVisible(false)}
            >
              {config?.action}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
