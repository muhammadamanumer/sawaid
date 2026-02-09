"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import type { PathDocument, ProgramDocument } from "@/types/appwrite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { GraduationCap, Users, Baby, Heart, ChevronDown, ChevronUp, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const iconMap = {
    GraduationCap,
    Users,
    Baby,
    Heart,
};

interface PathsClientProps {
    paths: PathDocument[];
    programs: ProgramDocument[];
}

/**
 * Formats text with proper line breaks for display
 */
function formatProgramText(text: string | null | undefined, isRtl: boolean): React.ReactNode {
    if (!text) return null;
    
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
    
    return (
        <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {paragraphs.map((paragraph, idx) => {
                const lines = paragraph.split(/\n/).filter(l => l.trim());
                return (
                    <p key={idx} className="leading-relaxed text-sm text-muted-foreground">
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

export function PathsClient({ paths, programs }: PathsClientProps) {
    const { t, language } = useTranslation();
    const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());
    const isRtl = language === 'ar';

    // Get programs for a specific path
    const getProgramsForPath = (pathId: string) => {
        return programs.filter(p => p.pathId === pathId);
    };

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
                        {paths.length >0    && paths.map((path, index) => {
                            const Icon = iconMap[path.icon as keyof typeof iconMap] || Heart;
                            const pathPrograms = getProgramsForPath(path.$id);
                            const title = language === 'ar' ? path.titleAr : path.titleEn;
                            const description = language === 'ar' ? path.descriptionAr : path.descriptionEn;

                            return (
                                <Card
                                    key={path.$id}
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
                                                    {title}
                                                </CardTitle>
                                                <CardDescription className="text-base">
                                                    {description}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <h3 className={`font-semibold text-lg text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                                {language === 'ar' ? 'المشاريع والبرامج' : 'Programs & Projects'}
                                            </h3>
                                            <div className="space-y-3">
                                                {pathPrograms.length > 0 ? (
                                                    pathPrograms.map((program) => {
                                                        const programTitle = language === 'ar' ? program.titleAr : program.titleEn;
                                                        const programSummary = language === 'ar' ? program.summaryAr : program.summaryEn;
                                                        const programDescription = language === 'ar' 
                                                            ? (program.descriptionAr || program.summaryAr) 
                                                            : (program.descriptionEn || program.summaryEn);
                                                        const isExpanded = expandedPrograms.has(program.$id);
                                                        const hasDetailedDescription = programDescription && 
                                                            programDescription.length > (programSummary?.length || 0);

                                                        return (
                                                            <div
                                                                key={program.$id}
                                                                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50"
                                                                dir={isRtl ? 'rtl' : 'ltr'}
                                                            >
                                                                <div className={`flex items-start justify-between gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                                    <div className="flex-1">
                                                                        <h4 className={`font-semibold mb-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                                                                            {programTitle}
                                                                        </h4>
                                                                        <p className={`text-sm text-muted-foreground line-clamp-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                                                            {programSummary}
                                                                        </p>
                                                                    </div>
                                                                    {program.zakatSupported ? (
                                                                        <Badge className="bg-primary/10 text-primary border-primary shrink-0 flex items-center gap-1">
                                                                            <CheckCircle2 className="h-3 w-3" />
                                                                            {language === 'ar' ? 'زكاة' : 'Zakat'}
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border shrink-0 flex items-center gap-1">
                                                                            <XCircle className="h-3 w-3" />
                                                                            {language === 'ar' ? 'صدقة' : 'Sadaqah'}
                                                                        </Badge>
                                                                    )}
                                                                </div>

                                                                {/* Expandable Description */}
                                                                {hasDetailedDescription && (
                                                                    <Collapsible 
                                                                        open={isExpanded} 
                                                                        onOpenChange={() => toggleProgramExpanded(program.$id)}
                                                                        className="mt-3"
                                                                    >
                                                                        <CollapsibleTrigger asChild>
                                                                            <Button 
                                                                                variant="ghost" 
                                                                                size="sm"
                                                                                className={`w-full justify-start text-primary hover:text-primary/80 hover:bg-primary/5 p-0 h-auto ${isRtl ? 'flex-row-reverse' : ''}`}
                                                                            >
                                                                                {isExpanded ? (
                                                                                    <ChevronUp className="h-4 w-4 mr-1" />
                                                                                ) : (
                                                                                    <ChevronDown className="h-4 w-4 mr-1" />
                                                                                )}
                                                                                <span className="text-sm">
                                                                                    {language === 'ar' 
                                                                                        ? (isExpanded ? 'إخفاء التفاصيل' : 'اعرف المزيد')
                                                                                        : (isExpanded ? 'Hide Details' : 'Learn More')}
                                                                                </span>
                                                                            </Button>
                                                                        </CollapsibleTrigger>
                                                                        <CollapsibleContent className="animate-in slide-in-from-top-2 duration-300">
                                                                            <div className="mt-3 p-3 rounded-lg bg-background/50 border border-border/30">
                                                                                <div className={`flex items-center gap-2 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                                                    <Sparkles className="h-4 w-4 text-accent" />
                                                                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                                                                        {language === 'ar' ? 'تفاصيل البرنامج' : 'Program Details'}
                                                                                    </span>
                                                                                </div>
                                                                                {formatProgramText(programDescription, isRtl)}
                                                                            </div>
                                                                        </CollapsibleContent>
                                                                    </Collapsible>
                                                                )}

                                                                {/* Quick Action */}
                                                                <div className="mt-3 pt-3 border-t border-border/30">
                                                                    <Button asChild size="sm" variant="outline" className="w-full">
                                                                        <Link href={`/donate?program=${program.slug}`} className={`flex items-center justify-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                                                            <Heart className="h-3 w-3" />
                                                                            {language === 'ar' ? 'تبرع لهذا البرنامج' : 'Donate to Program'}
                                                                        </Link>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className={`text-sm text-muted-foreground italic py-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                                                        {language === 'ar' ? 'لا توجد برامج حالياً' : 'No programs available yet'}
                                                    </p>
                                                )}
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
