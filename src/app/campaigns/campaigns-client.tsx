"use client"

import { CampaignCard } from '@/components/campaign-card';
import type { CampaignDocument } from '@/types/appwrite';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CampaignsClientProps {
    campaigns: CampaignDocument[];
}

export function CampaignsClient({ campaigns }: CampaignsClientProps) {
    const { t, language } = useTranslation();

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse animation-delay-300"></div>
            </div>

            <div className="relative container mx-auto px-4 md:px-6">
                <div className="text-center space-y-6 mb-20">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary-light to-accent leading-tight">
                        {t('campaigns.title')}
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fadeInUp animation-delay-100">
                        {t('campaigns.description')}
                    </p>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-4 animate-fadeInUp animation-delay-200">
                        <div className="h-0.5 w-20 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
                        <div className="h-1 w-1 rounded-full bg-accent"></div>
                        <div className="h-0.5 w-20 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
                    </div>
                </div>

                {campaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {campaigns.map((campaign, index) => (
                            <div
                                key={campaign.$id}
                                className="animate-fadeInUp"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                            >
                                <CampaignCard campaign={campaign} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">
                            {language === 'ar' ? 'لا توجد حملات نشطة حالياً' : 'No active campaigns at the moment'}
                        </p>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-20 text-center p-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border/50 shadow-modern-lg animate-fadeInUp animation-delay-500">
                    <h2 className="text-3xl font-headline font-bold mb-4">
                        {language === 'ar' ? 'لم تجد ما تبحث عنه؟' : "Can't find what you're looking for?"}
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        {language === 'ar'
                            ? 'تواصل معنا لمناقشة كيف يمكنك إحداث فرق بطرق أخرى ذات مغزى'
                            : 'Contact us to discuss how you can make a difference in other meaningful ways'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" variant="default">
                            <Link href="/contact">
                                {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/donate">
                                {language === 'ar' ? 'تبرع الآن' : 'Make a Donation'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
