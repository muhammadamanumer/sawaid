import { Suspense } from "react";
import { getCampaigns } from "@/services/campaigns";
import { DonateClient } from "./donate-client";
import { DonateFormCampaign } from "@/components/donate-form";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

function DonateLoading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>
      <div className="relative container mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="h-14 bg-muted/50 rounded-lg w-64 mx-auto animate-pulse"></div>
          <div className="h-6 bg-muted/50 rounded w-96 mx-auto animate-pulse mt-6"></div>
        </div>
        <div className="bg-card rounded-2xl p-8 shadow-xl animate-pulse">
          <div className="space-y-4">
            <div className="h-12 bg-muted/50 rounded"></div>
            <div className="h-12 bg-muted/50 rounded"></div>
            <div className="h-32 bg-muted/50 rounded"></div>
            <div className="h-12 bg-muted/50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <Suspense fallback={<DonateLoading />}>
      <DonateClient campaigns={campaigns} />
    </Suspense>
  );
}
