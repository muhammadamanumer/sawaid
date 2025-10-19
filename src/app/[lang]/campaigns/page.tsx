import { CampaignCard } from '@/components/campaign-card';
import { campaigns } from '@/lib/data';
import { i18n } from '@/i18n-config';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function CampaignsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Campaigns</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore our ongoing efforts to bring relief and hope to communities in need. Your support powers this change.
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
