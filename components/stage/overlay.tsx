import { StageNavButton } from "@/components/stage/stage-nav-button";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { useEffect, useState } from "react";

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

export default function Overlay({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) {
  const [isVisible, setIsVisible] = useState(visible);
  const { currentIndex, backIndex, backDirection } = useNavigation();

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible || currentIndex === backIndex) {
    return <>{children}</>;
  }

  // Determine the config based on navigation direction
  const config = configMap.get(backDirection);

  return (
    <div className="relative">
      {children}

      <div className="absolute inset-0 bg-background/50 backdrop-blur-xs flex items-start pt-40 justify-center z-9">
        <div className="bg-background p-8 rounded-lg shadow-lg mx-4 max-w-md border text-center  overflow-y-auto max-h-[90vh]">
          <div className="w-full mb-4">
            <div className="text-6xl mb-2">{config?.icon}</div>
            <h2 className="text-2xl font-semibold">{config?.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-balance">
              {config?.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            <StageNavButton className="w-full" />

            <Button
              variant="link"
              className="w-full text-gray-600 dark:text-gray-400 underline cursor-pointer"
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
