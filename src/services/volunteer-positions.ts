import { VolunteerPositionDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * VOLUNTEER POSITIONS SERVICE
 * ============================================================================
 * 
 * All volunteer position-related data fetching operations.
 * Uses TablesDB API for consistency with other services.
 * ============================================================================
 */

// ============ GET ALL VOLUNTEER POSITIONS ============
export async function getVolunteerPositions(): Promise<VolunteerPositionDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.VOLUNTEER_POSITIONS,
            queries: [
                Query.limit(100),
            ],
        });
        return response.rows as unknown as VolunteerPositionDocument[];
    } catch (error) {
        console.error('Error fetching volunteer positions:', error);
        return [];
    }
}

// ============ GET ACTIVE VOLUNTEER POSITIONS ============
export async function getActiveVolunteerPositions(): Promise<VolunteerPositionDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.VOLUNTEER_POSITIONS,
            queries: [
                Query.equal('status', 'active'),
                Query.limit(100),
            ],
        });
        return response.rows as unknown as VolunteerPositionDocument[];
    } catch (error) {
        console.error('Error fetching active volunteer positions:', error);
        // Fallback to all positions if status filter fails
        return getVolunteerPositions();
    }
}

// ============ GET VOLUNTEER POSITION BY SLUG ============
export async function getVolunteerPositionBySlug(slug: string): Promise<VolunteerPositionDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.VOLUNTEER_POSITIONS,
            queries: [
                Query.equal('slug', slug),
                Query.limit(1),
            ],
        });
        return (response.rows[0] as unknown as VolunteerPositionDocument) || null;
    } catch (error) {
        console.error('Error fetching volunteer position by slug:', error);
        return null;
    }
}

// ============ GET VOLUNTEER POSITIONS BY TYPE ============
export async function getVolunteerPositionsByType(type: 'remote' | 'onsite' | 'hybrid'): Promise<VolunteerPositionDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.VOLUNTEER_POSITIONS,
            queries: [
                Query.equal('type', type),
                Query.equal('status', 'active'),
                Query.limit(100),
            ],
        });
        return response.rows as unknown as VolunteerPositionDocument[];
    } catch (error) {
        console.error('Error fetching volunteer positions by type:', error);
        return [];
    }
}
