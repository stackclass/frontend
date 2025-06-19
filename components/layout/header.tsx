import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Header() {
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

        <Link href="/" className="text-sm text-gray-600">
          Sign in with GitHub
        </Link>
      </div>
    </header>
  );
}
