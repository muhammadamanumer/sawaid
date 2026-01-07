import { CampaignDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * CAMPAIGNS SERVICE
 * ============================================================================
 * 
 * All campaign-related data fetching operations.
 * Uses TablesDB API for consistency with other services.
 * 
 * COST OPTIMIZATION:
 * - Use Query.limit() to prevent over-fetching
 * - Use Query.select() when you only need specific fields
 * - Page-level revalidate handles caching
 * ============================================================================
 */

// ============ GET ALL CAMPAIGNS ============
export async function getCampaigns(): Promise<CampaignDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.CAMPAIGNS,
            queries: [
                Query.limit(100),
            ],
        });
        return response.rows as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return [];
    }
}

// ============ GET FEATURED CAMPAIGNS ============
export async function getFeaturedCampaigns(limit: number = 6): Promise<CampaignDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.CAMPAIGNS,
            queries: [
                Query.equal('isFeatured', true),
                Query.equal('isActive', true),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching featured campaigns:', error);
        // Fallback: return first N campaigns if featured query fails
        try {
            const fallback = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.CAMPAIGNS,
                queries: [
                    Query.limit(limit),
                ],
            });
            return fallback.rows as unknown as CampaignDocument[];
        } catch {
            return [];
        }
    }
}

// ============ GET CAMPAIGN BY SLUG ============
export async function getCampaignBySlug(slug: string): Promise<CampaignDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.CAMPAIGNS,
            queries: [
                Query.equal('slug', slug),
                Query.limit(1),
            ],
        });
        return (response.rows[0] as unknown as CampaignDocument) || null;
    } catch (error) {
        console.error('Error fetching campaign by slug:', error);
        return null;
    }
}

// ============ GET CAMPAIGNS BY PROGRAM ID ============
export async function getCampaignsByProgramId(programId: string): Promise<CampaignDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.CAMPAIGNS,
            queries: [
                Query.equal('programId', programId),
                Query.limit(100),
            ],
        });
        return response.rows as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching campaigns by program:', error);
        return [];
    }
}

// ============ GET ACTIVE CAMPAIGNS ============
export async function getActiveCampaigns(): Promise<CampaignDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.CAMPAIGNS,
            queries: [
                Query.equal('isActive', true),
                Query.limit(100),
            ],
        });
        return response.rows as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching active campaigns:', error);
        return [];
    }
}

// ============ GET URGENT CAMPAIGNS ============
export async function getUrgentCampaigns(limit: number = 3): Promise<CampaignDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.CAMPAIGNS,
            queries: [
                Query.equal('isUrgent', true),
                Query.equal('isActive', true),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching urgent campaigns:', error);
        return [];
    }
}
