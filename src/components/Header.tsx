"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Heart, LogIn, ShoppingBag, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";

const NAV_LINKS = [
  { href: "/", label: "Shop", icon: ShoppingBag },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export const Header = () => {
  const pathname = usePathname();
  const favoritesCount = useAppStore(state => state.favorites.length);
  const user = useAppStore(state => state.user);
  const logout = useAppStore(state => state.logout);

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-xl shadow-sm">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black">
              MyShop
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {NAV_LINKS.map(link => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant="default"
                size="icon"
                asChild
                className={cn(
                  "relative rounded-full transition-transform active:scale-95",
                  isActive && "bg-zinc-100 dark:bg-zinc-800 text-primary"
                )}
              >
                <Link href={link.href}>
                  <Icon className="h-5 w-5" />
                  {link.href === "/favorites" && favoritesCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-2 ring-white ring-zinc-950">
                      {favoritesCount > 99 ? "99+" : favoritesCount}
                    </span>
                  )}
                </Link>
              </Button>
            );
          })}

          <div className="mx-2 h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground hidden text-sm lg:block">Hi, {user.name}</span>
              <div className="relative group cursor-pointer">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-white dark:ring-zinc-900 shadow-sm"
                  />
                ) : (
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-white dark:ring-zinc-900">
                    {user.name[0]}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="rounded-full text-zinc-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href="/login" title="Login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
