import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="relative w-32 h-10">
              <Image
                src="/images/cheyf-logo-black.webp"
                alt="Cheyf Stays Logo"
                fill
                className="object-contain dark:invert grayscale opacity-80"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Premium property management and curated comfortable stays in the heart of Sarajevo.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-widest uppercase text-muted-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-widest uppercase text-muted-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-widest uppercase text-muted-foreground">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://instagram.com/cheyf.stays" aria-label='Instagram' className="hover:text-accent transition-colors"><Instagram/></a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61559738473242#" aria-label='Facebook' className="hover:text-accent transition-colors"><Facebook /></a></li>

            </ul>
          </div>
        </div>
        <div className="mt-12 border-t flex flex-col items-center text-xs text-muted-foreground">
          <div className='flex flex-col gap-2 md:flex-row justify-evenly items-center w-[50%]'>
            <div className="relative w-42 h-42 bg-white rounded-sm overflow-hidden">
              <Image src="/monri_images/postcss.config.png" alt="Monri" fill className="object-contain" />
            </div>
            <div className="relative w-16 h-16 bg-white rounded-sm overflow-hidden">
              <Image src="/monri_images/Visa-2015-50.gif" alt="Visa" fill className="object-contain" />
            </div>
            <div className="relative w-16 h-16 bg-white rounded-sm overflow-hidden">
              <Image src="/monri_images/mc_acc_opt_70_1x.png" alt="Mastercard" fill className="object-contain" />
            </div>
            <div className="relative w-16 h-16 bg-white rounded-sm overflow-hidden">
              <Image src="/monri_images/ms_acc_opt_70_1x.png" alt="Maestro" fill className="object-contain" />
            </div>
            <div className="relative w-12 h-12 bg-white rounded-sm overflow-hidden">
              <Image src="/monri_images/visa-secure_blu_72dpi-180x180.jpg" alt="Visa Secure" fill className="object-contain" />
            </div>
            <div className="relative w-16 h-16 bg-white rounded-sm overflow-hidden">
              <Image src="/monri_images/mc_idcheck_vrt_rgb_rev-300x225.png" alt="Mastercard ID Check" fill className="object-contain" />
            </div>
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Cheyf Stays. All rights reserved.</p>

          <div className="flex gap-4">
            <span>Sarajevo, Bosnia & Herzegovina</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
