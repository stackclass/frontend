"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { SignInButton } from "@/components/auth/sign-in-btn";
import { UserNavigation } from "@/components/auth/user-nav";
import { useSession } from "@/components/provider/auth-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Header() {
  const { session } = useSession();

  return (
    <header className="fixed top-0 w-full bg-background border-b z-50">
      <div className="container lg:max-w-screen-lg mx-auto flex items-center md:flex-row h-16 justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="font-bold text-lg">
            StackClass
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/catalog">Catalog</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          {session ? <UserNavigation user={session.user} /> : <SignInButton />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
