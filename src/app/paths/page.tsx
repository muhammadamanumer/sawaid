"use client";

import { useTranslation } from "@/hooks/use-translation";
import { paths } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Baby, Heart } from "lucide-react";
import Link from "next/link";

const iconMap = {
  GraduationCap,
  Users,
  Baby,
  Heart,
};

export default function PathsPage() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-primary-dark text-primary-foreground py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('paths.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              {t('paths.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((path, index) => {
              const Icon = iconMap[path.icon as keyof typeof iconMap];
              return (
                <Card
                  key={path.id}
                  className="group hover:shadow-modern-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary-light"></div>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                          {t(path.titleKey)}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {t(path.descriptionKey)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-muted-foreground">
                        {language === 'ar' ? 'المشاريع والبرامج' : 'Programs & Projects'}
                      </h3>
                      <div className="space-y-3">
                        {path.programs.map((program) => (
                          <div
                            key={program.id}
                            className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">
                                  {language === 'ar' ? program.titleAr : program.titleEn}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {language === 'ar' ? program.descriptionAr : program.descriptionEn}
                                </p>
                              </div>
                              {program.zakatSupported && (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary shrink-0">
                                  {language === 'ar' ? '✓ زكاة' : '✓ Zakat'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full mt-4" variant="outline">
                        <Link href={`/paths/${path.slug}`}>
                          {t('paths.viewProjects')}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'ar' ? 'كن جزءًا من التغيير' : 'Be Part of the Change'}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'ساعدنا في بناء أجيال المصلحين من خلال دعم مساراتنا وبرامجنا'
              : 'Help us build generations of reformers by supporting our paths and programs'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="shadow-modern-md">
              <Link href="/donate">{t('header.donateNow')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-modern-md">
              <Link href="/volunteer">
                {language === 'ar' ? 'تطوع معنا' : 'Volunteer With Us'}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
