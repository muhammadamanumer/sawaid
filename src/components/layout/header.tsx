"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/shared/logo";
import { i18n } from "@/i18n-config";
import { useTranslation } from "@/hooks/use-translation";

export function Header() {
  const { t, navLinks } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary to-primary-dark backdrop-blur-md bg-opacity-95 shadow-modern-lg border-b border-primary-foreground/10">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="animate-fadeIn">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={index}
                href={link.href}
                className={`relative text-sm font-semibold transition-all duration-300 group animate-fadeIn ${
                  isActive 
                    ? 'text-accent' 
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 rounded-full ${
                  isActive 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden md:flex items-center gap-4 animate-fadeIn animation-delay-500">
          <LanguageSwitcher />
          <Button asChild variant="accent" className="shadow-modern-md hover:shadow-modern-lg">
            <Link href="/donate">{t('header.donateNow')}</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-primary to-primary-dark pb-6 shadow-modern-lg animate-fadeIn border-t border-primary-foreground/10">
          <nav className="container mx-auto flex flex-col gap-4 px-4 md:px-6 pt-4">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`text-lg font-semibold transition-all duration-300 hover:translate-x-2 py-2 border-b border-primary-foreground/10 last:border-0 ${
                    isActive 
                      ? 'text-accent' 
                      : 'text-primary-foreground/90 hover:text-primary-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-foreground/20">
              <LanguageSwitcher />
              <Button asChild variant="accent" onClick={() => setIsMenuOpen(false)}>
                <Link href="/donate">{t('header.donateNow')}</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LanguageSwitcher() {
  const { setLanguage } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl border-border/50 shadow-modern-lg">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => setLanguage(locale)} className="cursor-pointer transition-colors">
             {locale === 'en' ? 'English' : 'العربية'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
