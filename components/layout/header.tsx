"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import { SignInButton } from "../auth/sign-in-btn";
import { UserNavigation } from "../auth/user-nav";
import authClient from "@/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full bg-white border-b z-50">
      <div className="container lg:max-w-screen-lg mx-auto flex items-center md:flex-row md:px-6 h-16 justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/catalog" className="font-bold text-lg">
            Codecraft
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/catalog">Catalog</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {session ? <UserNavigation user={session.user} /> : <SignInButton />}
      </div>
    </header>
  );
}
