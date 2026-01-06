"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CampaignCard } from "@/components/campaign-card";
import type { PathDocument, ProgramDocument, CampaignDocument } from "@/types/appwrite";
import {
    ArrowRight,
    Heart,
    Users,
    TrendingUp,
    GraduationCap,
    Baby,
    Play,
    CheckCircle2,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

// Hero background images for rotation
const heroImages = [
    PlaceHolderImages.find((p) => p.id === "hero-home"),
    PlaceHolderImages.find((p) => p.id === "campaign-education-support"),
    PlaceHolderImages.find((p) => p.id === "campaign-clean-water"),
].filter(Boolean);

// Icon mapping
const iconMap = {
    GraduationCap,
    Users,
    Baby,
    Heart,
};

interface HomeClientProps {
    paths: PathDocument[];
    programs: ProgramDocument[];
    campaigns: CampaignDocument[];
    stats: {
        totalCampaigns: number;
        totalPrograms: number;
        totalRaised: number;
        beneficiariesHelped: number;
        volunteersActive: number;
    };
}

export function HomeClient({ paths, programs, campaigns, stats }: HomeClientProps) {
    const { t, language } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    // Rotate hero background images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Get programs for a specific path
    const getProgramsForPath = (pathId: string) => {
        return programs.filter(p => p.path_id === pathId);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {/* Hero Section with Rotating Backgrounds */}
                <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
                    {/* Rotating Background Images */}
                    {heroImages.map((img, index) => (
                        <Image
                            key={index}
                            src={img?.imageUrl || ""}
                            alt={img?.description || "Hero background"}
                            fill
                            className={`object-cover transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                                }`}
                            priority={index === 0}
                            data-ai-hint={img?.imageHint}
                        />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/40" />

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
                    </div>

                    <div className="relative max-w-5xl mx-auto text-primary-foreground z-10">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-2xl animate-fadeInUp leading-tight">
                            {t("home.heroTitle")}
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/95 drop-shadow-lg animate-fadeInUp animation-delay-200 leading-relaxed">
                            {t("home.heroSubtitle")}
                        </p>

                        {/* Call-to-Action Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
                            <Button
                                asChild
                                size="lg"
                                className="shadow-modern-xl hover:scale-105 transition-all bg-primary hover:bg-primary-dark"
                            >
                                <Link href="/donate">
                                    <Heart className="mr-2 h-5 w-5" />
                                    {t("home.donationFields")}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="border-2 border-primary-foreground/80 text-primary-foreground bg-transparent hover:bg-primary-foreground/20 shadow-modern-lg backdrop-blur-sm hover:scale-105 transition-all"
                            >
                                <Link href="/sponsor">
                                    <Users className="mr-2 h-5 w-5" />
                                    {t("home.registerSponsor")}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="accent"
                                className="shadow-modern-xl hover:scale-105 transition-all"
                            >
                                <Link href="/volunteer">
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    {t("home.volunteerNow")}
                                </Link>
                            </Button>
                        </div>

                        {/* Optional Video Button */}
                        <button
                            onClick={() => setShowVideo(true)}
                            className="mt-8 inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors animate-fadeInUp animation-delay-500"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-foreground/30 transition-all">
                                <Play className="h-6 w-6 ml-1" />
                            </div>
                            <span className="text-sm font-medium">
                                {language === 'ar' ? 'شاهد قصتنا' : 'Watch Our Story'}
                            </span>
                        </button>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
                            <div className="w-1 h-2 bg-primary-foreground/50 rounded-full"></div>
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                <section className="relative bg-gradient-to-br from-muted via-background to-muted py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative container mx-auto px-4 md:px-6">
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 animate-fadeInUp">
                            {t("home.achievementsTitle")}
                        </h2>
                        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                            {language === 'ar'
                                ? 'إنجازاتنا في خدمة المجتمعات حول العالم'
                                : 'Making a real difference in communities around the world'}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="group p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-modern-lg hover:shadow-modern-xl transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-200 hover:-translate-y-2">
                                <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <TrendingUp className="h-12 w-12 text-primary" />
                                </div>
                                <p className="text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                                    QAR {(stats.totalRaised / 1000000).toFixed(1)}M+
                                </p>
                                <p className="text-muted-foreground mt-3 font-medium">
                                    {t("home.fundsRaised")}
                                </p>
                            </div>
                            <div className="group p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-modern-lg hover:shadow-modern-xl transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-300 hover:-translate-y-2">
                                <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <Users className="h-12 w-12 text-primary" />
                                </div>
                                <p className="text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                                    {stats.beneficiariesHelped.toLocaleString()}+
                                </p>
                                <p className="text-muted-foreground mt-3 font-medium">
                                    {t("home.peopleHelped")}
                                </p>
                            </div>
                            <div className="group p-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-modern-lg hover:shadow-modern-xl transition-all duration-500 border border-border/50 hover:border-primary/30 animate-fadeInUp animation-delay-400 hover:-translate-y-2">
                                <div className="inline-flex p-4 bg-gradient-to-br from-primary-lightest to-primary-lighter rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <Heart className="h-12 w-12 text-primary" />
                                </div>
                                <p className="text-5xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-light">
                                    {stats.volunteersActive.toLocaleString()}+
                                </p>
                                <p className="text-muted-foreground mt-3 font-medium">
                                    {t("home.volunteers")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Campaigns Section */}
                <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp">
                                {t("home.featuredCampaigns")}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                                {language === 'ar'
                                    ? 'ادعم حملاتنا النشطة وكن جزءًا من التغيير الإيجابي'
                                    : 'Support our active campaigns and be part of positive change'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {campaigns.slice(0, 3).map((campaign, index) => (
                                <div
                                    key={campaign.$id}
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <CampaignCard campaign={campaign} />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-12 animate-fadeInUp animation-delay-400">
                            <Button asChild variant="outline" size="lg" className="shadow-modern-md">
                                <Link href="/campaigns">
                                    {t("home.viewAllCampaigns")}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Four Paths Section */}
                <section className="py-20 bg-gradient-to-br from-muted/50 via-background to-muted/50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp">
                                {t("home.pathsTitle")}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                                {t("home.pathsSubtitle")}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {paths.map((path, index) => {
                                const Icon = iconMap[path.icon as keyof typeof iconMap] || Heart;
                                const pathPrograms = getProgramsForPath(path.$id);
                                const title = language === 'ar' ? path.title_ar : path.title_en;
                                const description = language === 'ar' ? path.description_ar : path.description_en;

                                return (
                                    <Card
                                        key={path.$id}
                                        className="group hover:shadow-modern-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50 animate-fadeInUp overflow-hidden"
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
                                                        {title}
                                                    </CardTitle>
                                                    <CardDescription className="text-base">
                                                        {description}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                                    {language === 'ar' ? 'البرامج والمشاريع' : 'Programs & Projects'}
                                                </h4>
                                                <div className="space-y-2">
                                                    {pathPrograms.slice(0, 2).map((program) => (
                                                        <div
                                                            key={program.$id}
                                                            className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                                        >
                                                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                            <div className="flex-1">
                                                                <p className="font-medium text-sm">
                                                                    {language === 'ar' ? program.title_ar : program.title_en}
                                                                </p>
                                                                {program.zakat_supported && (
                                                                    <Badge variant="outline" className="mt-1 bg-primary/10 text-primary border-primary text-xs">
                                                                        {language === 'ar' ? '✓ زكاة' : '✓ Zakat'}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {pathPrograms.length === 0 && (
                                                        <p className="text-sm text-muted-foreground italic">
                                                            {language === 'ar' ? 'لا توجد برامج حالياً' : 'No programs yet'}
                                                        </p>
                                                    )}
                                                </div>
                                                <Button asChild variant="link" className="w-full mt-2 text-primary">
                                                    <Link href={`/paths/${path.slug}`}>
                                                        {t('paths.viewProjects')}
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        <div className="text-center mt-12 animate-fadeInUp animation-delay-400">
                            <Button asChild size="lg" className="shadow-modern-md">
                                <Link href="/paths">
                                    {language === 'ar' ? 'اكتشف جميع المسارات' : 'Explore All Paths'}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
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

                {/* News & Challenges Section - Footer Area */}
                <section className="py-20 bg-gradient-to-br from-muted via-background to-muted">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 animate-fadeInUp">
                                {t("home.newsAndChallenges")}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-100">
                                {language === 'ar'
                                    ? 'آخر الأخبار والتحديات والإنجازات من مؤسستنا'
                                    : 'Latest news, challenges, and achievements from our foundation'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Sample News Items - Replace with dynamic content later */}
                            {[1, 2, 3].map((item, index) => (
                                <Card
                                    key={item}
                                    className="hover:shadow-modern-xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp overflow-hidden"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={PlaceHolderImages[index]?.imageUrl || ""}
                                            alt={`News ${item}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <span>{language === 'ar' ? 'الأخبار' : 'News'}</span>
                                            <span>•</span>
                                            <span>{language === 'ar' ? 'منذ 3 أيام' : '3 days ago'}</span>
                                        </div>
                                        <CardTitle className="text-xl line-clamp-2">
                                            {language === 'ar'
                                                ? `إنجاز جديد في مجال ${item === 1 ? 'التعليم' : item === 2 ? 'الصحة' : 'التنمية'}`
                                                : `New Achievement in ${item === 1 ? 'Education' : item === 2 ? 'Healthcare' : 'Development'}`}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm line-clamp-3">
                                            {language === 'ar'
                                                ? 'نحن سعداء بالإعلان عن تحقيق إنجاز جديد في خدمة المجتمعات المحتاجة...'
                                                : 'We are excited to announce a new achievement in serving communities in need...'}
                                        </p>
                                        <Button asChild variant="link" className="mt-4 p-0 text-primary">
                                            <Link href="/news">
                                                {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-12 animate-fadeInUp animation-delay-400">
                            <Button asChild variant="outline" size="lg" className="shadow-modern-md">
                                <Link href="/news">
                                    {language === 'ar' ? 'عرض جميع الأخبار' : 'View All News'}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Video Popup Modal */}
            {showVideo && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setShowVideo(false)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                        >
                            ✕
                        </button>
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/fHnfaaUPozE"
                            title="Organization Introduction Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
