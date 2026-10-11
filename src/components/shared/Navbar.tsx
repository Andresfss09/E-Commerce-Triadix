import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/storefront/CartDrawer';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 mx-auto max-w-7xl">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="TRIADIX Logo" className="h-6 w-auto invert dark:invert-0" style={{ filter: 'invert(1)' }} />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/catalog"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Catálogo
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Nosotros
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CartDrawer />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menú</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

