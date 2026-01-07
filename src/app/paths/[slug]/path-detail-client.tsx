"use client";

import { useTranslation } from "@/hooks/use-translation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ZakatBadge } from "@/components/shared/zakat-badge";
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
import type { PathDocument, ProgramDocument } from "@/types/appwrite";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Users,
  Baby,
  Heart,
};

interface PathDetailClientProps {
  path: PathDocument;
  programs: ProgramDocument[];
}

export function PathDetailClient({ path, programs }: PathDetailClientProps) {
  const { t, language } = useTranslation();
  
  const title = language === 'ar' ? path.titleAr : path.titleEn;
  const description = language === 'ar' ? path.descriptionAr : path.descriptionEn;
  
  const Icon = iconMap[path.icon] || Heart;
  const pathImage = PlaceHolderImages.find((p) => p.id === `path-${path.slug}`);

  const totalProjects = programs.length;
  const zakatEligible = programs.filter((p) => p.zakatSupported).length;

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
                {language === 'ar' ? '← العودة للمسارات' : '← Back to Paths'}
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
                    {language === 'ar' ? 'مسار رئيسي' : 'Main Path'}
                  </Badge>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
                
                <p className="text-lg text-primary-foreground/90 leading-relaxed">
                  {description}
                </p>

                {/* Quick Stats */}
                <div className="mt-8 flex gap-4">
                  <div className="p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-primary-foreground/80 mb-1">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">{language === 'ar' ? 'البرامج' : 'Programs'}</span>
                    </div>
                    <p className="text-3xl font-bold">{totalProjects}</p>
                  </div>
                  {zakatEligible > 0 && (
                    <div className="p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-primary-foreground/80 mb-1">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm">{language === 'ar' ? 'يدعم الزكاة' : 'Zakat Eligible'}</span>
                      </div>
                      <p className="text-3xl font-bold">{zakatEligible}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Path Image */}
              <div className="animate-fadeInUp animation-delay-200">
                <div className="relative rounded-2xl overflow-hidden shadow-modern-xl aspect-square md:aspect-auto md:h-96">
                  <Image
                    src={path.coverImageUrl || pathImage?.imageUrl || PlaceHolderImages[0]?.imageUrl || ""}
                    alt={title}
                    fill
                    className="object-cover"
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
                {language === 'ar' ? 'أثرنا' : 'Our Impact'}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'نحن ملتزمون بإحداث فرق حقيقي في حياة المستفيدين'
                  : 'We are committed to making a real difference in beneficiaries\' lives'}
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
                    {language === 'ar' ? 'مستفيد' : 'Beneficiaries'}
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
                    {language === 'ar' ? 'إجمالي التبرعات' : 'Total Donations'}
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
                    {language === 'ar' ? 'متطوع' : 'Volunteers'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 animate-fadeInUp">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ar' ? 'البرامج' : 'Programs'}
              </h2>
              <p className="text-muted-foreground text-lg">
                {language === 'ar' 
                  ? 'اكتشف البرامج المتاحة ضمن هذا المسار'
                  : 'Discover the programs available under this path'}
              </p>
            </div>

            <div className="space-y-6">
              {programs.map((program, index) => {
                const programTitle = language === 'ar' ? program.titleAr : program.titleEn;
                const programDescription = language === 'ar' 
                  ? (program.descriptionAr || program.summaryAr) 
                  : (program.descriptionEn || program.summaryEn);

                return (
                  <Card
                    key={program.$id}
                    className="group hover:shadow-modern-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 overflow-hidden animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="md:flex">
                      {/* Program Image */}
                      <div className="relative md:w-80 h-64 md:h-auto">
                        <Image
                          src={program.coverImageUrl || PlaceHolderImages[index]?.imageUrl || ""}
                          alt={programTitle}
                          fill
                          className="object-cover"
                        />
                        {program.zakatSupported && (
                          <div className="absolute top-4 left-4">
                            <ZakatBadge supported={true} />
                          </div>
                        )}
                      </div>

                      {/* Program Details */}
                      <div className="flex-1">
                        <CardHeader>
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {programTitle}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {programDescription}
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          {/* Key Highlights */}
                          <div className="space-y-2 mb-6">
                            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                              {language === 'ar' ? 'أبرز النقاط' : 'Key Highlights'}
                            </h4>
                            <div className="space-y-2">
                              {[
                                language === 'ar' ? 'تأثير مستدام' : 'Sustainable Impact',
                                language === 'ar' ? 'إدارة شفافة' : 'Transparent Management',
                                language === 'ar' ? 'تقارير دورية' : 'Regular Reports',
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
                            <Button asChild className="shadow-modern-md">
                              <Link href={`/donate?program=${program.slug}`}>
                                <Heart className="mr-2 h-4 w-4" />
                                {language === 'ar' ? 'تبرع الآن' : 'Donate Now'}
                              </Link>
                            </Button>
                            <Button variant="outline" className="shadow-modern-md">
                              {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                );
              })}

              {programs.length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    {language === 'ar' 
                      ? 'لا توجد برامج متاحة حالياً'
                      : 'No programs available at this time'}
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-muted via-background to-muted">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === 'ar' ? 'كن جزءاً من التغيير' : 'Be Part of the Change'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {language === 'ar' 
                ? 'انضم إلينا اليوم وساهم في إحداث فرق حقيقي'
                : 'Join us today and help make a real difference'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-modern-xl">
                <Link href="/donate">
                  <Heart className="mr-2 h-5 w-5" />
                  {language === 'ar' ? 'تبرع الآن' : 'Donate Now'}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-modern-md">
                <Link href="/paths">
                  {language === 'ar' ? 'استكشف مسارات أخرى' : 'Explore Other Paths'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="accent" className="shadow-modern-xl">
                <Link href="/volunteer">
                  <Users className="mr-2 h-5 w-5" />
                  {language === 'ar' ? 'تطوع معنا' : 'Volunteer With Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
