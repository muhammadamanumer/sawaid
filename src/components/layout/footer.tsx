"use client"

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Logo } from '@/components/shared/logo';
import { useTranslation } from '@/hooks/use-translation';

export function Footer() {
  const { t, navLinks } = useTranslation();
  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary-dark to-primary text-primary-foreground overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          <div className="space-y-6 animate-fadeInUp">
            <Logo />
            <p className="text-sm text-primary-foreground/90 max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            <div className="animate-fadeInUp animation-delay-100">
              <h3 className="font-headline font-bold text-lg mb-6 text-primary-foreground flex items-center gap-2">
                {t('footer.quickLinks')}
                <span className="h-0.5 w-8 bg-accent rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-sm text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-fadeInUp animation-delay-200">
              <h3 className="font-headline font-bold text-lg mb-6 text-primary-foreground flex items-center gap-2">
                {t('footer.legal')}
                <span className="h-0.5 w-8 bg-accent rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                    {t('footer.privacy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
                    {t('footer.terms')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fadeInUp animation-delay-300">
              <h3 className="font-headline font-bold text-lg mb-6 text-primary-foreground flex items-center gap-2">
                {t('footer.connect')}
                <span className="h-0.5 w-8 bg-accent rounded-full"></span>
              </h3>
              <div className="flex gap-4">
                <Link 
                  href="#" 
                  aria-label="Facebook" 
                  className="text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-primary-foreground/10"
                >
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link 
                  href="#" 
                  aria-label="Twitter" 
                  className="text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-primary-foreground/10"
                >
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link 
                  href="#" 
                  aria-label="Instagram" 
                  className="text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-primary-foreground/10"
                >
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link 
                  href="#" 
                  aria-label="LinkedIn" 
                  className="text-primary-foreground/85 hover:text-accent transition-all duration-300 hover:scale-110 hover:-translate-y-1 p-2 rounded-lg hover:bg-primary-foreground/10"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center animate-fadeIn animation-delay-400">
          <p className="text-sm text-primary-foreground/70">
            &copy; {new Date().getFullYear()} Sawaid Al Islah. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
