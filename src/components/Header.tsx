'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

const navItems = [
  {href: '/', label: 'Products'},
  {href: '/favorites', label: 'Favorites'},
];

export default function Header() {
  const pathname = usePathname();
  const favoritesCount = useAppStore((state) => state.favorites.length);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          MyShop
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map(({href, label}) => (
            <Button
              key={href}
              variant={pathname === href ? 'default' : 'ghost'}
              asChild
              className="relative"
            >
              <Link href={href}>
                {label}
                {href === '/favorites' && favoritesCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                )}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
