"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ZakatBadge } from "@/components/shared/zakat-badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  ChevronDown,
  ChevronUp,
  Calendar,
  Globe,
  Layers,
  XCircle,
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

// Default fallback image when no image is available
const DEFAULT_FALLBACK_IMAGE = '/placeholder-path.svg';

/**
 * Safely gets an image URL with fallback chain
 */
function getImageUrl(primaryUrl: string | null | undefined, fallbackUrl?: string): string {
  if (primaryUrl && primaryUrl.trim() !== '') {
    return primaryUrl;
  }
  if (fallbackUrl && fallbackUrl.trim() !== '') {
    return fallbackUrl;
  }
  return DEFAULT_FALLBACK_IMAGE;
}

/**
 * Formats text with proper line breaks and paragraph rendering
 * Handles RTL text and preserves intentional formatting
 */
function formatDescription(text: string | null | undefined, isRtl: boolean): React.ReactNode {
  if (!text) return null;
  
  // Split by double newlines (paragraphs) and single newlines
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
  
  return (
    <div className={`space-y-4 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {paragraphs.map((paragraph, idx) => {
        // Handle single line breaks within paragraphs
        const lines = paragraph.split(/\n/).filter(l => l.trim());
        return (
          <p key={idx} className="leading-relaxed">
            {lines.map((line, lineIdx) => (
              <span key={lineIdx}>
                {line.trim()}
                {lineIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export function PathDetailClient({ path, programs }: PathDetailClientProps) {
  const { t, language } = useTranslation();
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());
  const isRtl = language === 'ar';

  const toggleProgramExpanded = (programId: string) => {
    setExpandedPrograms(prev => {
      const next = new Set(prev);
      if (next.has(programId)) {
        next.delete(programId);
      } else {
        next.add(programId);
      }
      return next;
    });
  };
  
  const title = language === 'ar' ? path.titleAr : path.titleEn;
  const description = language === 'ar' ? path.descriptionAr : path.descriptionEn;
  
  // Safe title for alt text with fallback
  const safeTitle = title || path.titleEn || path.titleAr || 'Path';
  const safeDescription = description || path.descriptionEn || path.descriptionAr || '';
  
  const Icon = iconMap[path.icon] || Heart;
  const pathImage = PlaceHolderImages.find((p) => p.id === `path-${path.slug}`);
  
  // Safe image URL with proper fallback chain
  const heroImageUrl = getImageUrl(
    path.coverImageUrl,
    pathImage?.imageUrl
  );

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
                  {heroImageUrl !== DEFAULT_FALLBACK_IMAGE ? (
                    <Image
                      src={heroImageUrl}
                      alt={safeTitle}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Hide broken image gracefully
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <Icon className="h-24 w-24 text-primary/50" />
                    </div>
                  )}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {programs.map((program, index) => {
                const programTitle = language === 'ar' ? program.titleAr : program.titleEn;
                const programSummary = language === 'ar' 
                  ? (program.summaryAr || '') 
                  : (program.summaryEn || '');
                const programDescription = language === 'ar' 
                  ? (program.descriptionAr || program.summaryAr) 
                  : (program.descriptionEn || program.summaryEn);
                
                // Safe program title for alt text
                const safeProgramTitle = programTitle || program.titleEn || program.titleAr || 'Program';
                
                // Safe program image URL with fallback
                const programImageUrl = getImageUrl(
                  program.coverImageUrl,
                  PlaceHolderImages[index % PlaceHolderImages.length]?.imageUrl
                );

                const isExpanded = expandedPrograms.has(program.$id);
                const hasDetailedDescription = programDescription && programDescription.length > (programSummary?.length || 0);

                return (
                  <Card
                    key={program.$id}
                    className="group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-modern-2xl h-full hover:-translate-y-2 border-border/50 hover:border-primary/30 animate-fadeInUp"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Program Image Header - Campaign Card Style */}
                    <CardHeader className="p-0 relative overflow-hidden">
                      <div className="relative h-56 w-full block overflow-hidden">
                        {programImageUrl !== DEFAULT_FALLBACK_IMAGE ? (
                          <Image
                            src={programImageUrl}
                            alt={safeProgramTitle}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-muted to-accent/10 flex items-center justify-center">
                            <Layers className="h-20 w-20 text-primary/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Zakat Badge - Top Left */}
                      <div className="absolute top-4 left-4">
                        {program.zakatSupported ? (
                          <Badge className="bg-primary/95 text-primary-foreground border-0 shadow-modern-md backdrop-blur-sm flex items-center gap-1.5 px-3 py-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs font-semibold">
                              {language === 'ar' ? 'يدعم الزكاة' : 'Zakat Eligible'}
                            </span>
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-destructive/95 backdrop-blur-sm border-0 shadow-modern-md flex items-center gap-1.5 px-3 py-1.5">
                            <XCircle className="h-4 w-4" />
                            <span className="text-xs font-semibold">
                              {language === 'ar' ? 'صدقة فقط' : 'Sadaqah Only'}
                            </span>
                          </Badge>
                        )}
                      </div>

                      {/* Path Badge - Top Right */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/95 backdrop-blur-sm border-border/50 shadow-modern-md flex items-center gap-1.5 px-3 py-1.5">
                          <Globe className="h-3 w-3" />
                          <span className="text-xs font-medium">
                            {language === 'ar' ? path.titleAr : path.titleEn}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>

                    {/* Program Content */}
                    <CardContent className="flex flex-col flex-grow p-6" dir={isRtl ? 'rtl' : 'ltr'}>
                      <CardTitle className="font-headline text-xl mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                        {programTitle}
                      </CardTitle>
                      
                      {/* Summary - Always visible */}
                      <div className={`text-muted-foreground text-sm flex-grow leading-relaxed mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {programSummary ? (
                          <p className="line-clamp-3">{programSummary}</p>
                        ) : (
                          <p className="text-muted-foreground/60 italic">
                            {language === 'ar' ? 'لا يوجد وصف متاح' : 'No description available'}
                          </p>
                        )}
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-2 mb-4 mt-auto">
                        <h4 className={`font-semibold text-xs text-muted-foreground uppercase tracking-wide ${isRtl ? 'text-right' : 'text-left'}`}>
                          {language === 'ar' ? 'أبرز الميزات' : 'Key Features'}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { icon: TrendingUp, textAr: 'تأثير مستدام', textEn: 'Impact' },
                            { icon: Target, textAr: 'أهداف واضحة', textEn: 'Goals' },
                            { icon: Users, textAr: 'شفافية كاملة', textEn: 'Transparent' },
                            { icon: Calendar, textAr: 'تقارير دورية', textEn: 'Reports' },
                          ].map((feature, idx) => (
                            <div key={idx} className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                              <feature.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                              <span className="text-xs text-muted-foreground">
                                {language === 'ar' ? feature.textAr : feature.textEn}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expandable Description */}
                      {hasDetailedDescription && (
                        <Collapsible open={isExpanded} onOpenChange={() => toggleProgramExpanded(program.$id)}>
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className={`w-full justify-between mb-4 text-primary hover:text-primary/80 hover:bg-primary/5 ${isRtl ? 'flex-row-reverse' : ''}`}
                            >
                              <span className="flex items-center gap-2">
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                                {language === 'ar' 
                                  ? (isExpanded ? 'إخفاء التفاصيل' : 'اعرف المزيد')
                                  : (isExpanded ? 'Hide Details' : 'Learn More')}
                              </span>
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="animate-in slide-in-from-top-2 duration-300">
                            <div className="p-4 rounded-xl bg-muted/50 border border-border/50 mb-4">
                              <h5 className={`font-semibold text-sm mb-3 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                                <Sparkles className="h-4 w-4 text-accent" />
                                {language === 'ar' ? 'تفاصيل البرنامج' : 'Program Details'}
                              </h5>
                              <div className="text-sm text-muted-foreground">
                                {formatDescription(programDescription, isRtl)}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </CardContent>

                    {/* Action Footer - Campaign Card Style */}
                    <CardFooter className="p-6 pt-0">
                      <Button asChild variant="accent" className="w-full group-hover:shadow-modern-lg transition-all">
                        <Link href={`/donate?program=${program.slug}`} className={`flex items-center justify-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <Heart className="h-4 w-4" />
                          {language === 'ar' ? 'تبرع الآن' : 'Donate Now'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {programs.length === 0 && (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <Layers className="h-16 w-16 text-muted-foreground/30" />
                  <p className="text-muted-foreground text-lg">
                    {language === 'ar' 
                      ? 'لا توجد برامج متاحة حالياً'
                      : 'No programs available at this time'}
                  </p>
                </div>
              </Card>
            )}
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
