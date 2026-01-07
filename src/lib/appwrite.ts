import { Client, Databases, Storage, Query, ID, TablesDB, Account } from 'appwrite';

/**
 * ============================================================================
 * SAWAID APPWRITE SERVICE - PRODUCTION STANDARD
 * ============================================================================
 * 
 * ARCHITECTURE DECISION: Client-side `appwrite` SDK (not node-appwrite)
 * 
 * WHY THIS APPROACH:
 * 1. TablesDB is the latest Appwrite API (v21+) - future-proof
 * 2. Works in both client & server components in Next.js App Router
 * 3. Simpler setup - no API key management needed for read operations
 * 4. Smaller bundle size compared to node-appwrite
 * 
 * COST OPTIMIZATION STRATEGIES:
 * 1. Page-level caching with `revalidate` (ISR) - reduces API calls
 * 2. Parallel data fetching with Promise.all() - reduces latency
 * 3. Query.limit() on all queries - prevents over-fetching
 * 4. Query.select() for specific fields when possible
 * 
 * USAGE PATTERN:
 * - All services use `tablesDB.listRows()` and `tablesDB.createRow()`
 * - Services are in `src/services/` directory
 * - Types are in `src/types/appwrite.ts`
 * ============================================================================
 */

// Environment configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

// Database ID - single source of truth
export const DATABASE_ID = 'sawaid_db_test';

// Collection IDs - centralized configuration
export const COLLECTIONS = {
    CAMPAIGNS: 'campaigns',
    CONTACT: 'contact_submissions',
    DONATIONS: 'donations',
    MEDIA: 'media_assets',
    PATHS: 'paths',
    POSTS: 'posts',
    PROGRAMS: 'programs',
    REPORTS: 'reports',
    SPONSORS: 'sponsors',
    VOLUNTEERS: 'volunteers',
    VOLUNTEER_POSITIONS: 'volunteer_positions',
} as const;

// Bucket IDs for Storage
export const BUCKETS = {
    CAMPAIGN_COVERS: 'campaign-covers',
    GALLERY: 'gallery',
} as const;

// Type for collection keys
export type CollectionKey = keyof typeof COLLECTIONS;

// Initialize client (singleton pattern)
const client = new Client();

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

// Primary service for database operations (RECOMMENDED)
export const tablesDB = new TablesDB(client);

// Legacy Databases instance (use tablesDB instead when possible)
export const databases = new Databases(client);

// Storage service for file operations
export const storage = new Storage(client);

// Account service for sessions (anonymous session support on client)
export const account = new Account(client);

// Re-export utilities for building queries
export { Query, ID };

// Export client for special cases (auth, realtime, etc.)
export { client };

/**
 * ============================================================================
 * HELPER TYPES FOR SERVICE RESPONSES
 * ============================================================================
 */

// Generic response type for list operations
export interface ListResponse<T> {
    rows: T[];
    total: number;
}

// Standard query options for services
export interface QueryOptions {
    limit?: number;
    offset?: number;
    orderField?: string;
    orderType?: 'ASC' | 'DESC';
}

/**
 * Ensure there is a valid session for public reads when running in the browser.
 * Creates an anonymous session if none exists. No-ops on the server.
 */
export async function ensureAnonymousSession(): Promise<void> {
    if (typeof window === 'undefined') return; // server: skip
    try {
        await account.get();
    } catch {
        try {
            await account.createAnonymousSession();
        } catch (err) {
            console.error('Failed to create anonymous session', err);
        }
    }
}
