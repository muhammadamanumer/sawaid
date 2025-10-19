"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/donate">{t('header.donateNow')}</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-primary pb-4">
          <nav className="container mx-auto flex flex-col gap-4 px-4 md:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-4">
              <LanguageSwitcher />
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setIsMenuOpen(false)}>
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
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => setLanguage(locale)}>
             {locale === 'en' ? 'English' : 'العربية'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
