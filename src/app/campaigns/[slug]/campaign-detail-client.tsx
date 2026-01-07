"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedProgressBar } from '@/components/progress-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ZakatBadge } from '@/components/shared/zakat-badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslation } from '@/hooks/use-translation';
import type { CampaignDocument, DonationDocument } from '@/types/appwrite';
import { AlertTriangle, Calendar, Heart } from 'lucide-react';

interface CampaignDetailClientProps {
  campaign: CampaignDocument;
  donors: DonationDocument[];
}

export function CampaignDetailClient({ campaign, donors }: CampaignDetailClientProps) {
  const { language } = useTranslation();
  
  const title = language === 'ar' ? campaign.titleAr : campaign.titleEn;
  const description = language === 'ar' 
    ? (campaign.descriptionAr || campaign.summaryAr) 
    : (campaign.descriptionEn || campaign.summaryEn);
  
  const progress = campaign.goalAmount > 0 
    ? (campaign.raisedAmount / campaign.goalAmount) * 100 
    : 0;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-QA' : 'en-QA', {
      style: 'currency',
      currency: campaign.currency || 'QAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-QA' : 'en-QA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Cover Image */}
              {campaign.coverImageUrl && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-modern-xl">
                  <Image
                    src={campaign.coverImageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Badges overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {campaign.isUrgent && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {language === 'ar' ? 'عاجل' : 'Urgent'}
                      </Badge>
                    )}
                    {campaign.zakatSupported && <ZakatBadge supported={true} />}
                  </div>
                </div>
              )}

              {/* Title & Description */}
              <h1 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-dark">
                {title}
              </h1>
              
              {/* Campaign dates */}
              {(campaign.startDate || campaign.endDate) && (
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {campaign.startDate && (
                    <span>{formatDate(campaign.startDate)}</span>
                  )}
                  {campaign.startDate && campaign.endDate && <span>-</span>}
                  {campaign.endDate && (
                    <span>{formatDate(campaign.endDate)}</span>
                  )}
                </div>
              )}
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
              
              {/* Gallery */}
              {campaign.galleryUrls && campaign.galleryUrls.length > 0 && (
                <div>
                  <h2 className="text-2xl font-headline font-semibold mb-4">
                    {language === 'ar' ? 'معرض الصور' : 'Gallery'}
                  </h2>
                  <Carousel className="w-full">
                    <CarouselContent className="-ml-2">
                      {campaign.galleryUrls.map((url, index) => (
                        <CarouselItem key={index} className="pl-2 md:basis-1/2">
                          <div className="p-1">
                            <div className="relative aspect-video rounded-lg overflow-hidden shadow-modern">
                              <Image
                                src={url}
                                alt={`${title} - ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12" />
                    <CarouselNext className="mr-12" />
                  </Carousel>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Progress Card */}
            <Card className="sticky top-24 shadow-modern-xl border-border/50">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  {language === 'ar' ? 'تقدم الحملة' : 'Campaign Progress'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimatedProgressBar value={Math.min(progress, 100)} />
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-foreground">
                    {formatCurrency(campaign.raisedAmount)}
                  </span>
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'من' : 'of'} {formatCurrency(campaign.goalAmount)}
                  </span>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {Math.round(progress)}% {language === 'ar' ? 'مكتمل' : 'complete'}
                </p>
                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl shadow-modern-xl">
                  <Link href={`/donate?campaign=${campaign.slug}`}>
                    <Heart className="mr-2 h-5 w-5" />
                    {language === 'ar' ? 'تبرع الآن' : 'Donate Now'}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Donors */}
            {donors.length > 0 && (
              <Card className="shadow-modern border-border/50">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    {language === 'ar' ? 'أحدث المتبرعين' : 'Recent Donors'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {donors.map((donor, index) => (
                    <div key={donor.$id || index} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {donor.isAnonymous 
                            ? '?' 
                            : (donor.donorName?.charAt(0) || 'D')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">
                          {donor.isAnonymous 
                            ? (language === 'ar' ? 'متبرع مجهول' : 'Anonymous')
                            : donor.donorName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(donor.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
