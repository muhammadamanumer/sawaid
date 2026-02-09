import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";
import { CampaignDocument, DonationDocument, VolunteerDocument } from "@/types/appwrite";

/**
 * ============================================================================
 * STATS SERVICE
 * ============================================================================
 * 
 * Aggregation and statistics for homepage counters and dashboards.
 * All data is fetched dynamically from the database.
 * 
 * COST OPTIMIZATION:
 * - Parallel API calls to reduce latency
 * - Use Query.select() to only fetch fields needed for calculation
 * - Heavy caching at page level (revalidate = 60+ seconds for stats)
 * ============================================================================
 */

export interface SiteStats {
    totalCampaigns: number;
    totalPrograms: number;
    totalRaised: number;
    totalDonors: number;
    totalVolunteers: number;
}

// ============ GET SITE STATS ============
/**
 * Fetches aggregated stats for the homepage.
 * Uses parallel fetching for efficiency - all data is dynamic from database.
 */
export async function getStats(): Promise<SiteStats> {
    try {
        debugger
        // Parallel fetch - 4 API calls for all stats
        const [campaignsRes, programsRes, donationsRes, volunteersRes] = await Promise.all([
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.CAMPAIGNS,
                queries: [
                    Query.equal('isActive', true),
                    Query.limit(500),
                    Query.select(['raisedAmount']),
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.PROGRAMS,
                queries: [
                    Query.limit(1), // We only need the total count
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.DONATIONS,
                queries: [
                    Query.equal('status', 'completed'),
                    Query.limit(5000),
                    Query.select(['donorEmail', 'amount']),
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.VOLUNTEERS,
                queries: [
                    Query.limit(1), // We only need the total count
                ],
            }),
        ]);

        // Calculate total raised from campaigns
        const campaigns = campaignsRes.rows as unknown as Pick<CampaignDocument, 'raisedAmount'>[];
        const totalRaised = campaigns.reduce(
            (sum, c) => sum + (c.raisedAmount || 0), 
            0
        );

        // Count unique donors by email
        const donations = donationsRes.rows as unknown as Pick<DonationDocument, 'donorEmail'>[];
        const uniqueDonors = new Set(donations.map(d => d.donorEmail).filter(Boolean));

        return {
            totalCampaigns: campaignsRes.total,
            totalPrograms: programsRes.total,
            totalRaised,
            totalDonors: uniqueDonors.size,
            totalVolunteers: volunteersRes.total,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        // Return defaults on error
        return {
            totalCampaigns: 0,
            totalPrograms: 0,
            totalRaised: 0,
            totalDonors: 0,
            totalVolunteers: 0,
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
