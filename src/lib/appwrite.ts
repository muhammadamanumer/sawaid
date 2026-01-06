import { Client, Databases, Storage, Query, ID, TablesDB } from 'appwrite';

// Environment variables
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;


export const DATABASE_ID = '694833c6000376aef6f7';

// Collection IDs
export const COLLECTIONS = {
    CONTACT_MESSAGES: 'contact_us',
    VOLUNTEERS: 'volunteers',
    // -----
    PATHS: 'paths',
    PROGRAMS: 'programs',
    CAMPAIGNS: 'campaigns',
    DONATIONS: 'donations',
    VOLUNTEER_POSITIONS: 'volunteer_positions',
    MEDIA_ASSETS: 'media_assets',
    POSTS: 'posts',
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
