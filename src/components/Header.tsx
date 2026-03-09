"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Heart, Package } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Products", icon: Package },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export default function Header() {
  const pathname = usePathname();
  const favoritesCount = useAppStore(state => state.favorites.length);
  const user = useAppStore(state => state.user);
  const logout = useAppStore(state => state.logout);

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger />
          <Link href="/" className="group flex items-center gap-2">
            <div className="from-primary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 sm:h-9 sm:w-9 sm:rounded-xl">
              <span className="text-lg font-black text-white sm:text-xl">M</span>
            </div>
            <span className="from-primary hidden bg-gradient-to-r to-purple-600 bg-clip-text text-xl font-black tracking-tighter text-transparent min-[400px]:block sm:text-2xl">
              MyShop
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Button key={href} variant={pathname === href ? "default" : "ghost"} asChild className="relative">
              <Link href={href}>
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">
                  <Icon className="h-5 w-5" />
                </span>
                {href === "/favorites" && favoritesCount > 0 && (
                  <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] sm:h-5 sm:w-5 sm:text-xs">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={36}
                height={36}
                className="ring-primary/40 rounded-full object-cover ring-2"
              />
            ) : (
              <div className="from-primary flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 text-xs font-bold text-white sm:h-9 sm:w-9 sm:text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-muted-foreground hidden text-sm lg:block">Hi, {user.name}</span>
            <Button variant="outline" size="sm" onClick={logout} className="h-8 px-2 sm:h-9 sm:px-4" asChild>
              <Link href="/login">Logout</Link>
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" className="h-8 px-3 sm:h-9 sm:px-4" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
