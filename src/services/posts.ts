import { PostDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * POSTS SERVICE (News/Updates)
 * ============================================================================
 * 
 * All post/news-related data fetching operations.
 * Uses TablesDB API for consistency with other services.
 * ============================================================================
 */

// ============ GET POSTS ============
export async function getPosts(limit: number = 10): Promise<PostDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.POSTS,
            queries: [
                Query.equal('isPublished', true),
                Query.orderDesc('publishedAt'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as PostDocument[];
    } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback without filters if they fail
        try {
            const fallback = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: COLLECTIONS.POSTS,
                queries: [
                    Query.limit(limit),
                ],
            });
            return fallback.rows as unknown as PostDocument[];
        } catch {
            return [];
        }
    }
}

// ============ GET ALL POSTS (for news page) ============
export async function getAllPosts(): Promise<PostDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.POSTS,
            queries: [
                Query.equal('isPublished', true),
                Query.orderDesc('publishedAt'),
                Query.limit(100),
            ],
        });
        return response.rows as unknown as PostDocument[];
    } catch (error) {
        console.error('Error fetching all posts:', error);
        return [];
    }
}

// ============ GET POST BY SLUG ============
export async function getPostBySlug(slug: string): Promise<PostDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.POSTS,
            queries: [
                Query.equal('slug', slug),
                Query.limit(1),
            ],
        });
        return (response.rows[0] as unknown as PostDocument) || null;
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
}

// ============ GET POSTS BY CATEGORY ============
export async function getPostsByCategory(category: string, limit: number = 10): Promise<PostDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.POSTS,
            queries: [
                Query.equal('category', category),
                Query.equal('isPublished', true),
                Query.orderDesc('publishedAt'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as PostDocument[];
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
}

// ============ GET RECENT POSTS (for sidebar/footer) ============
export async function getRecentPosts(limit: number = 3): Promise<PostDocument[]> {
    return getPosts(limit);
}
