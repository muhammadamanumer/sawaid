"use client";

import { use } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { paths } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Users,
  Baby,
  Heart,
  CheckCircle2,
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const iconMap = {
  GraduationCap,
  Users,
  Baby,
  Heart,
};

interface PathDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function PathDetailPage({ params }: PathDetailPageProps) {
  const { t, language } = useTranslation();
  const { slug } = use(params);
  const path = paths.find((p) => p.slug === slug);

  if (!path) {
    notFound();
  }

  const Icon = iconMap[path.icon as keyof typeof iconMap];
  const pathImage = PlaceHolderImages.find((p) => p.id === `path-${path.slug}`);

  // Calculate impact statistics (example)
  const totalProjects = path.programs.length;
  const zakatEligible = path.programs.filter((p) => p.zakatSupported).length;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section with Path Image */}
      <section className="relative bg-gradient-to-r from-primary via-primary to-primary-dark text-primary-foreground py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6 animate-fadeInUp">
              <Link
                href="/paths"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                {language === 'ar' ? '← ' : ''}
                {t('paths.detail.backToPath')}
                {language === 'en' ? ' ←' : ''}
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Path Info */}
              <div className="animate-fadeInUp">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
                    <Icon className="h-10 w-10" />
                  </div>
                  <Badge variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                    {t('paths.detail.mainPath')}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {t(path.titleKey)}
                </h1>
                
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  {t(path.descriptionKey)}
                </p>

                {/* Quick Stats */}
                <div className="mt-8">
                  <div className="p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm inline-block">
                    <div className="flex items-center gap-2 text-primary-foreground/80 mb-1">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">{t('paths.detail.programs')}</span>
                    </div>
                    <p className="text-3xl font-bold">{totalProjects}</p>
                  </div>
                </div>
              </div>

              {/* Right: Path Image/Illustration */}
              <div className="animate-fadeInUp animation-delay-200">
                <div className="relative rounded-2xl overflow-hidden shadow-modern-xl aspect-square md:aspect-auto md:h-96">
                  <Image
                    src={pathImage?.imageUrl || PlaceHolderImages[0]?.imageUrl || ""}
                    alt={t(path.titleKey)}
                    fill
                    className="object-cover"
                    data-ai-hint={pathImage?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path Impact Section */}
      <section className="py-16 bg-gradient-to-br from-muted/50 via-background to-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('paths.detail.impactTitle')}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('paths.detail.impactDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 animate-fadeInUp animation-delay-100">
              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-modern-xl">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">500+</p>
                  <p className="text-muted-foreground">
                    {t('paths.detail.beneficiaries')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-modern-xl">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">QAR 200K+</p>
                  <p className="text-muted-foreground">
                    {t('paths.detail.totalDonations')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-modern-xl">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">150+</p>
                  <p className="text-muted-foreground">
                    {t('paths.detail.volunteers')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Projects Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('paths.detail.programsTitle')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('paths.detail.programsDescription')}
              </p>
            </div>

            <div className="space-y-6">
              {path.programs.map((program, index) => {
                const programImage = PlaceHolderImages.find(
                  (p) => p.id === `program-${program.slug}`
                ) || PlaceHolderImages[index];

                return (
                  <Card
                    key={program.id}
                    className="group hover:shadow-modern-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 overflow-hidden animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="md:flex">
                      {/* Program Image */}
                      <div className="relative md:w-80 h-64 md:h-auto">
                        <Image
                          src={programImage?.imageUrl || ""}
                          alt={language === 'ar' ? program.titleAr : program.titleEn}
                          fill
                          className="object-cover"
                          data-ai-hint={programImage?.imageHint}
                        />
                        {program.zakatSupported && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-primary-foreground shadow-lg">
                              <Sparkles className="h-3 w-3 mr-1" />
                              {t('paths.detail.zakatSupported')}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Program Details */}
                      <div className="flex-1">
                        <CardHeader>
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {language === 'ar' ? program.titleAr : program.titleEn}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {language === 'ar' ? program.descriptionAr : program.descriptionEn}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          {/* Program Progress (Example - could be dynamic) */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {t('paths.detail.programProgress')}
                              </span>
                              <span className="font-semibold">75%</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>

                          {/* Key Highlights */}
                          <div className="space-y-2 mb-6">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                              {t('paths.detail.keyHighlights')}
                            </h4>
                            <div className="space-y-2">
                              {[
                                t('paths.detail.sustainableImpact'),
                                t('paths.detail.transparentManagement'),
                                t('paths.detail.regularReports'),
                              ].map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                  <span className="text-sm">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Button className="shadow-modern-md">
                              <Link href="/donate" className="flex items-center">
                                <Heart className="mr-2 h-4 w-4" />
                                {t('paths.detail.donateNow')}
                              </Link>
                            </Button>
                            <Button variant="outline" className="shadow-modern-md">
                              {t('paths.detail.learnMore')}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quranic Verse Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fadeInUp">
            <div className="mb-6">
              <div className="inline-block p-4 bg-primary-foreground/10 rounded-full backdrop-blur-sm">
                <svg
                  className="h-12 w-12 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.54-7-10V8.3l7-3.5 7 3.5V10c0 4.46-3.13 9.04-7 10z" />
                </svg>
              </div>
            </div>

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-arabic font-bold leading-relaxed mb-6">
              {t("home.quranVerse")}
            </blockquote>

            <p className="text-lg md:text-xl text-primary-foreground/90 font-medium">
              {t("home.quranReference")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-muted via-background to-muted">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('paths.detail.bePartTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('paths.detail.bePartDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-modern-xl">
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  {t('paths.detail.donateNow')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-modern-md">
                <Link href="/paths">
                  {t('paths.detail.exploreOther')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="accent" className="shadow-modern-xl">
                <Link href="/volunteer">
                  <Users className="mr-2 h-5 w-5" />
                  {t('paths.detail.volunteerWithUs')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

