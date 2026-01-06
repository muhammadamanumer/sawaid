"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedProgressBar } from '@/components/progress-bar';
import { useTranslation } from '@/hooks/use-translation';
import { ZakatBadge } from '@/components/shared/zakat-badge';

// Support both legacy and new campaign types
type CampaignCardProps = {
  campaign: {
    slug: string;
    zakatSupported: boolean;
    // New structure
    goalAmount?: number;
    raisedAmount?: number;
    coverImageUrl?: string;
    titleEn?: string;
    titleAr?: string;
    summaryEn?: string;
    summaryAr?: string;
    programId?: string;
    isUrgent?: boolean;
    // Legacy structure (backward compatibility)
    goal?: number;
    currentAmount?: number;
    image?: string;
  };
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t, language } = useTranslation();
  
  // Support both legacy and new property names
  const goal = campaign.goalAmount ?? campaign.goal ?? 0;
  const currentAmount = campaign.raisedAmount ?? campaign.currentAmount ?? 0;
  const imageId = campaign.coverImageUrl ?? campaign.image;
  
  const placeholderImage = PlaceHolderImages.find(p => p.id === imageId);
  const progress = goal > 0 ? (currentAmount / goal) * 100 : 0;

  // Use direct title if available, otherwise use translation key
  const title = campaign.titleEn 
    ? (language === 'ar' ? campaign.titleAr : campaign.titleEn)
    : t(`campaigns.${campaign.slug}.title`);
  
  const description = campaign.summaryEn
    ? (language === 'ar' ? campaign.summaryAr : campaign.summaryEn)
    : t(`campaigns.${campaign.slug}.shortDescription`);

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-modern-2xl h-full hover:-translate-y-2 border-border/50 hover:border-primary/30">
      <CardHeader className="p-0 relative overflow-hidden">
        <Link href={`/campaigns/${campaign.slug}`} className="relative h-56 w-full block overflow-hidden">
          {placeholderImage && (
            <Image
              src={placeholderImage.imageUrl}
              alt={placeholderImage.description}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={placeholderImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        
        {/* Progress Badge */}
        <div className="absolute top-4 right-4 bg-accent/95 backdrop-blur-sm text-accent-foreground px-4 py-2 rounded-full text-xs font-bold shadow-modern-md">
          {Math.round(progress)}% {language === 'ar' ? 'مكتمل' : 'Funded'}
        </div>
        
        {/* Zakat Stamp */}
        <div className="absolute top-4 left-4">
          <ZakatBadge 
            supported={campaign.zakatSupported} 
            size="sm" 
            variant="default"
            className="shadow-modern-md backdrop-blur-sm"
          />
        </div>

        {/* Urgent Badge */}
        {campaign.isUrgent && (
          <div className="absolute bottom-4 left-4 bg-red-500/95 text-white px-3 py-1 rounded-full text-xs font-bold shadow-modern-md backdrop-blur-sm animate-pulse">
            {language === 'ar' ? '🔥 عاجل' : '🔥 Urgent'}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-6">
        <CardTitle className="font-headline text-xl mb-3 leading-tight">
          <Link href={`/campaigns/${campaign.slug}`} className="hover:text-primary transition-colors duration-300">
            {title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm flex-grow leading-relaxed mb-4">
          {description}
        </p>
        <div className="mt-auto space-y-3">
          <AnimatedProgressBar value={progress} />
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-bold text-lg text-foreground">
                QAR {currentAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{t('campaignCard.raised')}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-muted-foreground">
                QAR {goal.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{t('campaignCard.goal')}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="accent" className="w-full group-hover:shadow-modern-lg transition-all">
          <Link href={`/campaigns/${campaign.slug}`}>{t('campaignCard.donateButton')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
