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
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.PATHS,
            queries: [
                Query.equal('slug', slug),
                Query.limit(1),
            ],
        });
        return response.rows as unknown as PathDocument || null;
    } catch (error) {
        console.error('Error fetching path by slug:', error);
        return null;
    }
}