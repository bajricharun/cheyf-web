import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';

export function Header() {
  return (
    <header className="fixed top-0 w-full border-b border-border/50 glass z-50 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Add a sleek text logo, fallback if images not loading or size is an issue */}
          <div className="relative w-28 h-8">
            <Image
              src="/images/cheyf-logo-black.png"
              alt="Cheyf Stays Logo"
              fill
              className="object-contain dark:invert"
              priority
            />
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
            About Us
          </Link>

          <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </Link>

          <Link href="/become-a-partner" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
            Become a Partner
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="accent" className="hidden sm:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
