import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Attempt } from "@/types/attempt";

interface AttemptsProps {
  attempts: Attempt[];
  currentUserId: string;
}

export function Attempts({ attempts, currentUserId }: AttemptsProps) {
  if (attempts.length === 0) {
    return (
      <div className="text-muted-foreground text-sm text-center py-20">
        No recent attempts yet. <br /> Be the first to start!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold pl-5">RECENT ATTEMPTS</h3>
      <div className="space-y-2">
        {attempts.map((attempt) => (
          <div
            key={attempt.user_id}
            className={`flex items-center justify-between pl-4 pr-4 group ${
              attempt.user_id === currentUserId
                ? "border-l-2 border-primary"
                : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={attempt.avatar} alt={attempt.username} />
                <AvatarFallback>
                  {attempt.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {attempt.username}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`text-right text-sm text-muted-foreground ${
                  attempt.user_id === currentUserId
                    ? ""
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {attempt.completed}/{attempt.total}
              </div>
              <Progress
                max={attempt.total}
                value={attempt.completed}
                className="h-4 rounded-sm w-[48px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
