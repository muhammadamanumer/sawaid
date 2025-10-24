"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Home,
  Search,
  ArrowLeft,
  Heart,
  Users,
  TrendingUp,
  Compass,
} from "lucide-react";

export default function NotFound() {
  const { t, language } = useTranslation();

  const quickLinks = [
    {
      href: "/",
      icon: Home,
      titleKey: "notFound.links.home.title",
      descriptionKey: "notFound.links.home.description",
    },
    {
      href: "/paths",
      icon: Compass,
      titleKey: "notFound.links.paths.title",
      descriptionKey: "notFound.links.paths.description",
    },
    {
      href: "/campaigns",
      icon: TrendingUp,
      titleKey: "notFound.links.campaigns.title",
      descriptionKey: "notFound.links.campaigns.description",
    },
    {
      href: "/donate",
      icon: Heart,
      titleKey: "notFound.links.donate.title",
      descriptionKey: "notFound.links.donate.description",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex items-center justify-center px-4 py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Main 404 Content */}
        <div className="text-center mb-16 animate-fadeInUp">
          {/* Large 404 Number with Gradient */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <svg
                className="w-full h-64 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.54-7-10V8.3l7-3.5 7 3.5V10c0 4.46-3.13 9.04-7 10z" />
              </svg>
            </div>
            <h1 className="text-9xl md:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent relative z-10">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('notFound.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('notFound.description')}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp animation-delay-100">
            <Button asChild size="lg" className="shadow-modern-xl">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                {t('notFound.backToHome')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-modern-md">
              <Link href="/contact">
                <Users className="mr-2 h-5 w-5" />
                {t('notFound.contactUs')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="animate-fadeInUp animation-delay-200">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t('notFound.quickLinks')}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="p-6 hover:shadow-modern-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 group animate-fadeInUp" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {t(link.titleKey)}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {t(link.descriptionKey)}
                        </p>
                      </div>
                      <ArrowLeft className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-all ${language === 'ar' ? 'rotate-180' : ''} group-hover:translate-x-1`} />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-16 text-center animate-fadeInUp animation-delay-300">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Search className="h-5 w-5" />
            <p className="text-sm">
              {t('notFound.searchSuggestion')}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
        </div>
      </div>
    </div>
  );
}

