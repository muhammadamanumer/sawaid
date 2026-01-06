import { getPaths, getPrograms, getFeaturedCampaigns, getStats } from "@/lib/appwrite-service";
import { HomeClient } from "@/components/home-client";

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
