'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full border-b border-border/50 glass z-50 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Add a sleek text logo, fallback if images not loading or size is an issue */}
          <div className="relative w-28 h-8">
            <Image
              src="/images/cheyf-logo-black.webp"
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

          <Link href="/become-a-partner" className="text-sm font-medium text-accent hover:text-accent transition-colors">
            Become a Partner
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="accent" className="hidden sm:inline-flex">
            <Link href="/book">Book Now</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md absolute w-full left-0 top-16 shadow-xl">
          <nav className="flex flex-col p-4 space-y-4">
            <Link href="/about" className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium p-2 hover:bg-accent/10 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/become-a-partner" className="text-sm font-medium p-2 text-accent hover:bg-accent/10 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              Become a Partner
            </Link>
            <Button asChild variant="accent" className="w-full mt-4 sm:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/book">Book Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
