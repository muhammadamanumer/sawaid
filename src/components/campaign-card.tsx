"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Campaign } from '@/lib/types';
import { AnimatedProgressBar } from '@/components/progress-bar';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircle2, XCircle } from 'lucide-react';

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t } = useTranslation();
  const placeholderImage = PlaceHolderImages.find(p => p.id === campaign.image);
  const progress = (campaign.currentAmount / campaign.goal) * 100;

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
        <div className="absolute top-4 right-4 bg-accent/95 backdrop-blur-sm text-accent-foreground px-4 py-2 rounded-full text-xs font-bold shadow-modern-md">
          {Math.round(progress)}% Funded
        </div>
        {/* Zakat Stamp */}
        <div className="absolute top-4 left-4">
          {campaign.zakatSupported ? (
            <Badge className="bg-primary/95 text-primary-foreground border-0 shadow-modern-md backdrop-blur-sm flex items-center gap-1.5 px-3 py-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs font-semibold">{t('campaignCard.zakatSupported')}</span>
            </Badge>
          ) : (
            <Badge variant="destructive" className="bg-destructive/95 backdrop-blur-sm border-0 shadow-modern-md flex items-center gap-1.5 px-3 py-1.5">
              <XCircle className="h-4 w-4" />
              <span className="text-xs font-semibold">{t('campaignCard.zakatNotSupported')}</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-6">
        <CardTitle className="font-headline text-xl mb-3 leading-tight">
          <Link href={`/campaigns/${campaign.slug}`} className="hover:text-primary transition-colors duration-300">
            {t(`campaigns.${campaign.slug}.title`)}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm flex-grow leading-relaxed mb-4">{t(`campaigns.${campaign.slug}.shortDescription`)}</p>
        <div className="mt-auto space-y-3">
          <AnimatedProgressBar value={progress} />
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-bold text-lg text-foreground">
                ${campaign.currentAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">{t('campaignCard.raised')}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-muted-foreground">
                ${campaign.goal.toLocaleString()}
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
