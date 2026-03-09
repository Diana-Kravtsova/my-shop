"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Products" },
  { href: "/favorites", label: "Favorites" },
];

export default function Header() {
  const pathname = usePathname();
  const favoritesCount = useAppStore((state) => state.favorites.length);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="group flex items-center gap-2">
          <div className="from-primary flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
            <span className="text-xl font-black text-white">M</span>
          </div>
          <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-2xl font-black tracking-tighter text-transparent">
            MyShop
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map(({ href, label }) => (
            <Button
              key={href}
              variant={pathname === href ? "default" : "ghost"}
              asChild
              className="relative"
            >
              <Link href={href}>
                {label}
                {href === "/favorites" && favoritesCount > 0 && (
                  <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Hi, {user.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <Link href="/login">Logout</Link>
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
