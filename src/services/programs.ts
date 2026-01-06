import { PathDocument, ProgramDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID,  Query,  tablesDB } from "@/lib/appwrite";

// ============ PROGRAMS ============
export async function getPrograms(): Promise<ProgramDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.PROGRAMS,
            queries: [
                Query.limit(100),
            ],
        });
        return response.rows as unknown as ProgramDocument[];
    } catch (error) {
        console.error('Error fetching programs:', error);
        return [];
    }
}

export async function getProgramsByPathId(pathId: string): Promise<ProgramDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,    
            tableId: COLLECTIONS.PROGRAMS,
            queries: [
                Query.equal('pathId', pathId),
                Query.limit(100),
            ],
        });
        return response.rows as unknown as ProgramDocument[];
    } catch (error) {
        console.error('Error fetching programs by path:', error);
        return [];
    }
}

export async function getProgramBySlug(slug: string): Promise<ProgramDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.PROGRAMS,
            queries: [
                Query.equal('slug', slug),
                Query.limit(1),
            ],
        });
        return response.rows as unknown as ProgramDocument || null;
    } catch (error) {
        console.error('Error fetching program by slug:', error);
        return null;
    }
}
