import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface UserNavigationProps {
  user: {
    name: string;
    image?: string | null;
  };
}

export function UserNavigation({ user }: UserNavigationProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.removeItem("jwt");
          router.push("/catalog");
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.image || undefined}
        className="w-8 h-8 rounded-full border border-gray-200"
        alt="User profile"
      />
      <span className="text-gray-800 font-medium text-sm">{user.name}</span>
      <Button variant="outline" onClick={handleSignOut} className="text-sm">
        Sign out
      </Button>
    </div>
  );
}
