import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";
import { CampaignDocument } from "@/types/appwrite";

/**
 * ============================================================================
 * STATS SERVICE
 * ============================================================================
 * 
 * Aggregation and statistics for homepage counters and dashboards.
 * 
 * COST OPTIMIZATION:
 * - Single API call fetches campaigns (we calculate stats client-side)
 * - Use Query.select() to only fetch fields needed for calculation
 * - Heavy caching at page level (revalidate = 300+ seconds for stats)
 * ============================================================================
 */

export interface SiteStats {
    totalCampaigns: number;
    totalPrograms: number;
    totalRaised: number;
    beneficiariesHelped: number;
    volunteersActive: number;
}

// ============ GET SITE STATS ============
/**
 * Fetches aggregated stats for the homepage.
 * Uses parallel fetching for efficiency.
 * 
 * Note: For free tier optimization, we fetch minimal data and calculate client-side
 */
export async function getStats(): Promise<SiteStats> {
    try {
        // Parallel fetch - 2 API calls instead of multiple
        const [campaignsRes, programsRes] = await Promise.all([
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.CAMPAIGNS,
                queries: [
                    Query.limit(100),
                    // Only select fields needed for calculation
                    Query.select(['raisedAmount', 'isActive']),
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.PROGRAMS,
                queries: [
                    Query.limit(1), // We only need the total count
                ],
            }),
        ]);

        // Calculate total raised from campaigns
        const campaigns = campaignsRes.rows as unknown as Pick<CampaignDocument, 'raisedAmount' | 'isActive'>[];
        const totalRaised = campaigns.reduce(
            (sum, c) => sum + (c.raisedAmount || 0), 
            0
        );

        return {
            totalCampaigns: campaignsRes.total,
            totalPrograms: programsRes.total,
            totalRaised,
            // Static values - update these from a dedicated stats collection if needed
            beneficiariesHelped: 15420,
            volunteersActive: 312,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        // Return defaults on error
        return {
            totalCampaigns: 0,
            totalPrograms: 0,
            totalRaised: 0,
            beneficiariesHelped: 0,
            volunteersActive: 0,
        };
    }
}

// ============ GET CAMPAIGN STATS ============
/**
 * Get stats for a specific campaign (for campaign detail pages)
 */
export async function getCampaignStats(campaignId: string) {
    try {
        // Single API call to get donations for this campaign
        const donationsRes = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.DONATIONS,
            queries: [
                Query.equal('campaignId', campaignId),
                Query.equal('status', 'completed'),
                Query.limit(1000),
                Query.select(['amount']),
            ],
        });

        const donations = donationsRes.rows as unknown as { amount: number }[];
        const totalRaised = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

        return {
            donorCount: donationsRes.total,
            totalRaised,
        };
    } catch (error) {
        console.error('Error fetching campaign stats:', error);
        return {
            donorCount: 0,
            totalRaised: 0,
        };
    }
}
