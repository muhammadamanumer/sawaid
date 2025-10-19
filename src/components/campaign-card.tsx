"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Campaign } from '@/lib/types';
import { AnimatedProgressBar } from '@/components/progress-bar';
import { useTranslation } from '@/hooks/use-translation';

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { t } = useTranslation();
  const placeholderImage = PlaceHolderImages.find(p => p.id === campaign.image);
  const progress = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl duration-300 h-full">
      <CardHeader className="p-0">
        <Link href={`/campaigns/${campaign.slug}`} className="relative h-48 w-full block">
          {placeholderImage && (
            <Image
              src={placeholderImage.imageUrl}
              alt={placeholderImage.description}
              fill
              className="object-cover"
              data-ai-hint={placeholderImage.imageHint}
            />
          )}
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow p-6">
        <CardTitle className="font-headline text-xl mb-2">
          <Link href={`/campaigns/${campaign.slug}`} className="hover:text-primary transition-colors">
            {t(`campaigns.${campaign.slug}.title`)}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm flex-grow">{t(`campaigns.${campaign.slug}.shortDescription`)}</p>
        <div className="mt-4">
          <AnimatedProgressBar value={progress} />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>
              <span className="font-bold text-foreground">
                ${campaign.currentAmount.toLocaleString()}
              </span> {t('campaignCard.raised')}
            </span>
            <span>
              {t('campaignCard.goal')}: ${campaign.goal.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/campaigns/${campaign.slug}`}>{t('campaignCard.donateButton')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
