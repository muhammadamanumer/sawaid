'use server';

import { Client, Databases, Query } from 'node-appwrite';
import type {
    PathDocument,
    ProgramDocument,
    CampaignDocument,
    VolunteerPositionDocument,
    PostDocument
} from '@/types/appwrite';

// Server-side Appwrite client (uses API key for full read access)
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const API_KEY = process.env.APPWRITE_API_KEY!;
const DATABASE_ID = 'sawaid_db_test';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

// Collection IDs
const COLLECTIONS = {
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

// ============ PATHS ============
export async function getPaths(): Promise<PathDocument[]> {
    try {
        // Note: status filter removed until enum attribute is properly created
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PATHS, [
            Query.limit(100),
        ]);
        return response.documents as unknown as PathDocument[];
    } catch (error) {
        console.error('Error fetching paths:', error);
        return [];
    }
}

export async function getPathBySlug(slug: string): Promise<PathDocument | null> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PATHS, [
            Query.equal('slug', slug),
            Query.limit(1),
        ]);
        return response.documents[0] as unknown as PathDocument || null;
    } catch (error) {
        console.error('Error fetching path by slug:', error);
        return null;
    }
}

// ============ PROGRAMS ============
export async function getPrograms(): Promise<ProgramDocument[]> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PROGRAMS, [
            Query.limit(100),
        ]);
        return response.documents as unknown as ProgramDocument[];
    } catch (error) {
        console.error('Error fetching programs:', error);
        return [];
    }
}

export async function getProgramsByPathId(pathId: string): Promise<ProgramDocument[]> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PROGRAMS, [
            Query.equal('path_id', pathId),
            Query.limit(100),
        ]);
        return response.documents as unknown as ProgramDocument[];
    } catch (error) {
        console.error('Error fetching programs by path:', error);
        return [];
    }
}

export async function getProgramBySlug(slug: string): Promise<ProgramDocument | null> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.PROGRAMS, [
            Query.equal('slug', slug),
            Query.limit(1),
        ]);
        return response.documents[0] as unknown as ProgramDocument || null;
    } catch (error) {
        console.error('Error fetching program by slug:', error);
        return null;
    }
}

// ============ CAMPAIGNS ============
export async function getCampaigns(): Promise<CampaignDocument[]> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CAMPAIGNS, [
            Query.limit(100),
        ]);
        return response.documents as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return [];
    }
}

export async function getFeaturedCampaigns(): Promise<CampaignDocument[]> {
    try {
        // Note: is_featured filter removed until attribute is properly created
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CAMPAIGNS, [
            Query.limit(6),
        ]);
        return response.documents as unknown as CampaignDocument[];
    } catch (error) {
        console.error('Error fetching featured campaigns:', error);
        return [];
    }
}

export async function getCampaignBySlug(slug: string): Promise<CampaignDocument | null> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.CAMPAIGNS, [
            Query.equal('slug', slug),
            Query.limit(1),
        ]);
        return response.documents[0] as unknown as CampaignDocument || null;
    } catch (error) {
        console.error('Error fetching campaign by slug:', error);
        return null;
    }
}

// ============ VOLUNTEER POSITIONS ============
export async function getVolunteerPositions(): Promise<VolunteerPositionDocument[]> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.VOLUNTEER_POSITIONS, [
            Query.limit(100),
        ]);
        return response.documents as unknown as VolunteerPositionDocument[];
    } catch (error) {
        console.error('Error fetching volunteer positions:', error);
        return [];
    }
}

// ============ POSTS ============
export async function getPosts(limit: number = 10): Promise<PostDocument[]> {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTIONS.POSTS, [
            Query.limit(limit),
        ]);
        return response.documents as unknown as PostDocument[];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

// ============ STATS (for homepage counters) ============
export async function getStats() {
    try {
        const [campaignsRes, programsRes] = await Promise.all([
            databases.listDocuments(DATABASE_ID, COLLECTIONS.CAMPAIGNS, [Query.limit(100)]),
            databases.listDocuments(DATABASE_ID, COLLECTIONS.PROGRAMS, [Query.limit(100)]),
        ]);

        const totalRaised = campaignsRes.documents.reduce((sum: number, c: any) => sum + (c.raised_amount || 0), 0);

        return {
            totalCampaigns: campaignsRes.total,
            totalPrograms: programsRes.total,
            totalRaised,
            // These could come from a stats collection or be hardcoded for now
            beneficiariesHelped: 15420, // Example static value
            volunteersActive: 312,
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return {
            totalCampaigns: 0,
            totalPrograms: 0,
            totalRaised: 0,
            beneficiariesHelped: 0,
            volunteersActive: 0,
        };
    }
}
