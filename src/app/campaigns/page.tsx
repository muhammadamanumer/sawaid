"use client"
import { CampaignCard } from '@/components/campaign-card';
import { campaigns } from '@/lib/data';
import { useTranslation } from '@/hooks/use-translation';

export default function CampaignsPage() {
  const { t } = useTranslation();
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">{t('campaigns.title')}</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('campaigns.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}
