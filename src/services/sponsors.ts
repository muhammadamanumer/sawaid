import { SponsorDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * SPONSORS SERVICE
 * ============================================================================
 * 
 * All sponsor-related data operations.
 * Includes both read (for displayed sponsors) and write (for registration).
 * ============================================================================
 */

export interface SponsorRegistrationData {
    organizationName: string;
    contactName: string;
    email: string;
    phone?: string;
    website?: string;
    message?: string;
    sponsorType: string;
}

// ============ GET DISPLAYED SPONSORS (for homepage/about) ============
export async function getDisplayedSponsors(): Promise<SponsorDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.SPONSORS,
            queries: [
                Query.equal('isDisplayed', true),
                Query.limit(50),
            ],
        });
        return response.rows as unknown as SponsorDocument[];
    } catch (error) {
        console.error('Error fetching displayed sponsors:', error);
        return [];
    }
}

// ============ GET ALL SPONSORS (admin) ============
export async function getAllSponsors(): Promise<SponsorDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.SPONSORS,
            queries: [
                Query.limit(100),
            ],
        });
        return response.rows as unknown as SponsorDocument[];
    } catch (error) {
        console.error('Error fetching all sponsors:', error);
        return [];
    }
}

// ============ GET SPONSORS BY TYPE ============
export async function getSponsorsByType(sponsorType: string): Promise<SponsorDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.SPONSORS,
            queries: [
                Query.equal('sponsorType', sponsorType),
                Query.equal('isDisplayed', true),
                Query.limit(50),
            ],
        });
        return response.rows as unknown as SponsorDocument[];
    } catch (error) {
        console.error('Error fetching sponsors by type:', error);
        return [];
    }
}

// ============ REGISTER NEW SPONSOR ============
export async function registerSponsor(data: SponsorRegistrationData) {
    console.log("Registering sponsor:", data);
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTIONS.SPONSORS,
        rowId: ID.unique(),
        data: {
            organizationName: data.organizationName,
            contactName: data.contactName,
            email: data.email,
            phone: data.phone || null,
            website: data.website || null,
            message: data.message || null,
            sponsorType: data.sponsorType,
            isDisplayed: false, // Default to not displayed until approved
            status: 'new',
        },
    });
}
