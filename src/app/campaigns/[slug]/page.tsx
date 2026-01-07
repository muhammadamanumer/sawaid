import { notFound } from 'next/navigation';
import { getCampaignBySlug } from '@/services/campaigns';
import { getDonationsByCampaignId } from '@/services/donations';
import { CampaignDetailClient } from './campaign-detail-client';

export const revalidate = 60;

interface CampaignDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { slug } = await params;
  
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  // Fetch recent donors for this campaign
  const donors = await getDonationsByCampaignId(campaign.$id, 5);

  return <CampaignDetailClient campaign={campaign} donors={donors} />;
}
