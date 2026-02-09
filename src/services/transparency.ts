import { CampaignDocument, DonationDocument, PathDocument, ProgramDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * TRANSPARENCY SERVICE
 * ============================================================================
 * 
 * Service for fetching financial allocation data for the transparency page.
 * Aggregates donation data by path/category to show fund distribution.
 * ============================================================================
 */

export interface FinancialAllocation {
    category: string;
    categoryAr: string;
    amount: number;
    percentage: number;
    pathId: string | null;
}

export interface TransparencyStats {
    totalDonors: number;
    totalDonations: number;
    avgDonationAmount: number;
    zakatDonations: number;
    generalDonations: number;
    recurringDonors: number;
}

// Administration overhead percentage (industry standard for nonprofits)
const ADMIN_OVERHEAD_PERCENTAGE = 10;

/**
 * Get financial allocation breakdown by path/category
 * Calculates real-time distribution of funds based on completed donations
 */
export async function getFinancialAllocation(): Promise<FinancialAllocation[]> {
    try {
        // Fetch all necessary data in parallel
        const [donationsRes, campaignsRes, programsRes, pathsRes] = await Promise.all([
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.DONATIONS,
                queries: [
                    Query.equal('status', 'completed'),
                    Query.limit(5000), // Adjust based on expected volume
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.CAMPAIGNS,
                queries: [
                    Query.limit(500),
                    Query.select(['$id', 'programId']),
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.PROGRAMS,
                queries: [
                    Query.limit(100),
                    Query.select(['$id', 'pathId']),
                ],
            }),
            tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.PATHS,
                queries: [
                    Query.equal('isActive', true),
                    Query.limit(20),
                ],
            }),
        ]);

        const donations = donationsRes.rows as unknown as DonationDocument[];
        const campaigns = campaignsRes.rows as unknown as Pick<CampaignDocument, '$id' | 'programId'>[];
        const programs = programsRes.rows as unknown as Pick<ProgramDocument, '$id' | 'pathId'>[];
        const paths = pathsRes.rows as unknown as PathDocument[];

        // Create lookup maps for efficient resolution
        const campaignToProgram = new Map<string, string | null>();
        campaigns.forEach(c => campaignToProgram.set(c.$id, c.programId));

        const programToPath = new Map<string, string>();
        programs.forEach(p => programToPath.set(p.$id, p.pathId));

        const pathDetails = new Map<string, PathDocument>();
        paths.forEach(p => pathDetails.set(p.$id, p));

        // Aggregate donations by path
        const pathTotals = new Map<string, number>();
        let unallocatedTotal = 0;
        let grandTotal = 0;

        donations.forEach(donation => {
            const amount = donation.amount || 0;
            grandTotal += amount;

            // Resolve donation to path
            let pathId: string | null = null;

            if (donation.campaignId) {
                const programId = campaignToProgram.get(donation.campaignId);
                if (programId) {
                    pathId = programToPath.get(programId) || null;
                }
            } else if (donation.programId) {
                pathId = programToPath.get(donation.programId) || null;
            }

            if (pathId) {
                const current = pathTotals.get(pathId) || 0;
                pathTotals.set(pathId, current + amount);
            } else {
                unallocatedTotal += amount;
            }
        });

        // If no donations exist, return placeholder data based on paths
        if (grandTotal === 0) {
            // Return paths with zero amounts
            const allocations: FinancialAllocation[] = paths.map(path => ({
                category: path.titleEn,
                categoryAr: path.titleAr,
                amount: 0,
                percentage: 0,
                pathId: path.$id,
            }));

            // Add administration category
            allocations.push({
                category: 'Administration & Operations',
                categoryAr: 'الإدارة والعمليات',
                amount: 0,
                percentage: ADMIN_OVERHEAD_PERCENTAGE,
                pathId: null,
            });

            return allocations;
        }

        // Calculate administration portion (taken from total)
        const adminAmount = Math.round(grandTotal * (ADMIN_OVERHEAD_PERCENTAGE / 100));
        const programsTotal = grandTotal - adminAmount;

        // Build allocation array
        const allocations: FinancialAllocation[] = [];

        // Add path allocations
        paths.forEach(path => {
            const pathAmount = pathTotals.get(path.$id) || 0;
            // Adjust for admin overhead (proportionally reduce each path's amount)
            const adjustedAmount = Math.round(pathAmount * (1 - ADMIN_OVERHEAD_PERCENTAGE / 100));
            const percentage = grandTotal > 0 
                ? Math.round((adjustedAmount / grandTotal) * 100) 
                : 0;

            allocations.push({
                category: path.titleEn,
                categoryAr: path.titleAr,
                amount: adjustedAmount,
                percentage,
                pathId: path.$id,
            });
        });

        // Add unallocated donations (general fund) if any
        if (unallocatedTotal > 0) {
            const adjustedUnallocated = Math.round(unallocatedTotal * (1 - ADMIN_OVERHEAD_PERCENTAGE / 100));
            const percentage = grandTotal > 0 
                ? Math.round((adjustedUnallocated / grandTotal) * 100) 
                : 0;

            allocations.push({
                category: 'General Fund',
                categoryAr: 'الصندوق العام',
                amount: adjustedUnallocated,
                percentage,
                pathId: null,
            });
        }

        // Add administration allocation
        allocations.push({
            category: 'Administration & Operations',
            categoryAr: 'الإدارة والعمليات',
            amount: adminAmount,
            percentage: ADMIN_OVERHEAD_PERCENTAGE,
            pathId: null,
        });

        // Sort by amount descending (except admin which stays at bottom)
        allocations.sort((a, b) => {
            if (a.category === 'Administration & Operations') return 1;
            if (b.category === 'Administration & Operations') return -1;
            return b.amount - a.amount;
        });

        return allocations;
    } catch (error) {
        console.error('Error calculating financial allocation:', error);
        return [];
    }
}

/**
 * Get detailed transparency statistics
 */
export async function getTransparencyStats(): Promise<TransparencyStats> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.DONATIONS,
            queries: [
                Query.equal('status', 'completed'),
                Query.limit(5000),
            ],
        });

        const donations = response.rows as unknown as DonationDocument[];

        // Get unique donors by email
        const uniqueDonors = new Set<string>();
        let totalAmount = 0;
        let zakatAmount = 0;
        let generalAmount = 0;
        let recurringCount = 0;

        donations.forEach(d => {
            if (d.donorEmail) {
                uniqueDonors.add(d.donorEmail);
            }
            totalAmount += d.amount || 0;
            
            if (d.donationType === 'zakat') {
                zakatAmount += d.amount || 0;
            } else {
                generalAmount += d.amount || 0;
            }

            if (d.isRecurring) {
                recurringCount++;
            }
        });

        return {
            totalDonors: uniqueDonors.size,
            totalDonations: donations.length,
            avgDonationAmount: donations.length > 0 
                ? Math.round(totalAmount / donations.length) 
                : 0,
            zakatDonations: zakatAmount,
            generalDonations: generalAmount,
            recurringDonors: recurringCount,
        };
    } catch (error) {
        console.error('Error fetching transparency stats:', error);
        return {
            totalDonors: 0,
            totalDonations: 0,
            avgDonationAmount: 0,
            zakatDonations: 0,
            generalDonations: 0,
            recurringDonors: 0,
        };
    }
}
