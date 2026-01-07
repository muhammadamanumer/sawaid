import { HomeClient } from "@/components/home-client";
import { getPaths } from "@/services/path";
import { getPrograms } from "@/services/programs";
import { getFeaturedCampaigns } from "@/services/campaigns";
import { getStats } from "@/services/stats";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch all data in parallel
  const [paths, programs, campaigns, stats] = await Promise.all([
    getPaths(),
    getPrograms(),
    getFeaturedCampaigns(),
    getStats(),
  ]);

  return (
    <HomeClient
      paths={paths}
      programs={programs}
      campaigns={campaigns}
      stats={stats}
    />
  );
}
