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
    // Validate pathId parameter - must be a non-empty string
    if (!pathId || typeof pathId !== 'string' || pathId.trim() === '') {
        console.warn('getProgramsByPathId called with invalid pathId:', pathId);
        return [];
    }

    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,    
            tableId: COLLECTIONS.PROGRAMS,
            queries: [
                Query.equal('pathId', pathId.trim()),
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
    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        console.warn('getProgramBySlug called with invalid slug:', slug);
        return null;
    }

    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.PROGRAMS,
            queries: [
                Query.equal('slug', slug.trim()),
                Query.limit(1),
            ],
        });
        
        const rows = response.rows as unknown as ProgramDocument[];
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching program by slug:', error);
        return null;
    }
}
