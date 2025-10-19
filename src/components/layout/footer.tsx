"use client"

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const { t, navLinks } = useTranslation();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-headline font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold text-lg mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {t('footer.terms')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold text-lg mb-4">{t('footer.connect')}</h3>
              <div className="flex space-x-4">
                <Link href="#" aria-label="Facebook" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="Twitter" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" aria-label="LinkedIn" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} Sawaid Al islah. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
