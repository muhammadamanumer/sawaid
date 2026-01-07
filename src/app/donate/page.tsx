import { getCampaigns } from "@/services/campaigns";
import { DonateClient } from "./donate-client";
import { DonateFormCampaign } from "@/components/donate-form";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function DonatePage() {
  // Fetch campaigns on the server
  const campaignsData = await getCampaigns();
  
  // Transform to the simplified format needed by the donate form
  const campaigns: DonateFormCampaign[] = campaignsData
    .filter(c => c.isActive)
    .map(campaign => ({
      id: campaign.$id,
      slug: campaign.slug,
      name: campaign.titleEn,
      nameAr: campaign.titleAr,
      zakatSupported: campaign.zakatSupported,
    }));

  return <DonateClient campaigns={campaigns} />;
}
