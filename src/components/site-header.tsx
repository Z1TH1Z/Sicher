"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#featured-products", label: "Products" },
  { href: "/track-order", label: "Track Order" },
];

export default function SiteHeader() {
  const { cartCount } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4 p-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Shield className="h-6 w-6 text-primary" />
            <span>Sicher Tech</span>
          </Link>
          <nav className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Button key={link.href} variant="ghost" asChild className="justify-start">
                  <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="hidden md:flex items-center gap-2 font-bold">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg">Sicher Tech</span>
          </Link>
          {isClient && <MobileNav />}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          {isClient && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[200px] lg:w-[300px]" />
            </div>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart />
              {isClient && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
