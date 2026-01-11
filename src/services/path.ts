import { PathDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID,  Query,  tablesDB } from "@/lib/appwrite";

// ============ PATHS ============
export async function getPaths(): Promise<PathDocument[]> {
    try {
        // Note: status filter removed until enum attribute is properly created
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.PATHS,
            queries: [
                Query.limit(100),
            ],
        });
        console.log('Fetched paths:', response);
        return response.rows as unknown as PathDocument[];
    } catch (error) {
        console.error('Error fetching paths:', error);
        return [];
    }
}

export async function getPathBySlug(slug: string): Promise<PathDocument | null> {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        console.warn('getPathBySlug called with invalid slug:', slug);
        return null;
    }

    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.PATHS,
            queries: [
                Query.equal('slug', slug.trim()),
                Query.limit(1),
            ],
        });
        
        const rows = response.rows as unknown as PathDocument[];
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching path by slug:', error);
        return null;
    }
}