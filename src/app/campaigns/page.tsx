import { getCampaigns } from '@/lib/appwrite-service';
import { CampaignsClient } from './campaigns-client';

export const revalidate = 60;

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return <CampaignsClient campaigns={campaigns} />;
}
