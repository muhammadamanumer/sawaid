import { Client, Databases, Storage, Query, ID, TablesDB } from 'appwrite';

// Server-side Appwrite client (uses API key for full read access)
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const API_KEY = process.env.APPWRITE_API_KEY!;
export const DATABASE_ID = 'sawaid_db_test';


// Collection IDs
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


// Bucket IDs
export const BUCKETS = {
    CAMPAIGN_COVERS: 'campaign-covers',
    GALLERY: 'gallery',
} as const;

// Initialize client
const client = new Client();

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

// Export services
export const databases = new Databases(client);
export const storage = new Storage(client);

export const tablesDB = new TablesDB(client);

// Re-export utilities
export { Query, ID };

// Export client for special cases (auth, etc.)
export { client };
