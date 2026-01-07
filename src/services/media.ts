import { MediaAssetDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * MEDIA ASSETS SERVICE
 * ============================================================================
 * 
 * Gallery/media asset fetching for the gallery page and campaign galleries.
 * ============================================================================
 */

// ============ GET ALL MEDIA ASSETS (for gallery page) ============
export async function getMediaAssets(limit: number = 50): Promise<MediaAssetDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.MEDIA,
            queries: [
                Query.orderAsc('displayOrder'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as MediaAssetDocument[];
    } catch (error) {
        console.error('Error fetching media assets:', error);
        return [];
    }
}

// ============ GET MEDIA BY TYPE (photo/video) ============
export async function getMediaByType(type: 'image' | 'video', limit: number = 50): Promise<MediaAssetDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.MEDIA,
            queries: [
                Query.equal('type', type),
                Query.orderAsc('displayOrder'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as MediaAssetDocument[];
    } catch (error) {
        console.error('Error fetching media by type:', error);
        return [];
    }
}

// ============ GET MEDIA FOR CAMPAIGN ============
export async function getMediaByCampaignId(campaignId: string): Promise<MediaAssetDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.MEDIA,
            queries: [
                Query.equal('campaignId', campaignId),
                Query.orderAsc('displayOrder'),
                Query.limit(50),
            ],
        });
        return response.rows as unknown as MediaAssetDocument[];
    } catch (error) {
        console.error('Error fetching media for campaign:', error);
        return [];
    }
}

// ============ GET MEDIA BY TAGS ============
export async function getMediaByTag(tag: string, limit: number = 20): Promise<MediaAssetDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.MEDIA,
            queries: [
                Query.contains('tags', [tag]),
                Query.orderAsc('displayOrder'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as MediaAssetDocument[];
    } catch (error) {
        console.error('Error fetching media by tag:', error);
        return [];
    }
}
