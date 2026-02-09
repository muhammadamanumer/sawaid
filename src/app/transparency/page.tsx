import { getReports } from "@/services/reports";
import { getStats } from "@/services/stats";
import { getFinancialAllocation, getTransparencyStats } from "@/services/transparency";
import { TransparencyClient } from "./transparency-client";

export const revalidate = 60;

export default async function TransparencyPage() {
  // Fetch all data in parallel
  const [reports, stats, financialAllocation, transparencyStats] = await Promise.all([
    getReports(),
    getStats(),
    getFinancialAllocation(),
    getTransparencyStats(),
  ]);

  return (
    <TransparencyClient 
      reports={reports} 
      stats={stats}
      financialAllocation={financialAllocation}
      transparencyStats={transparencyStats}
    />
  );
}
