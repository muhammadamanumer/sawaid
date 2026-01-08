import { getReports } from "@/services/reports";
import { getStats } from "@/services/stats";
import { TransparencyClient } from "./transparency-client";

export const revalidate = 60;

export default async function TransparencyPage() {
  // Fetch reports and stats in parallel
  const [reports, stats] = await Promise.all([
    getReports(),
    getStats(),
  ]);

  return <TransparencyClient reports={reports} stats={stats} />;
}
