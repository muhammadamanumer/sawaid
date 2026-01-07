import { DonationDocument } from "@/types/appwrite";
import { COLLECTIONS, DATABASE_ID, ID, Query, tablesDB } from "@/lib/appwrite";

/**
 * ============================================================================
 * DONATIONS SERVICE
 * ============================================================================
 * 
 * Donation operations including creating donations and fetching for stats.
 * ============================================================================
 */

export interface CreateDonationData {
    campaignId?: string;
    programId?: string;
    amount: number;
    currency?: string;
    donorName?: string;
    donorEmail?: string;
    isAnonymous?: boolean;
    isRecurring?: boolean;
    paymentRef?: string;
    donationType?: 'general' | 'zakat' | 'sadaqah';
    message?: string;
}

// ============ CREATE DONATION RECORD ============
export async function createDonation(data: CreateDonationData) {
    console.log("Creating donation record:", data);
    return await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTIONS.DONATIONS,
        rowId: ID.unique(),
        data: {
            campaignId: data.campaignId || null,
            programId: data.programId || null,
            amount: data.amount,
            currency: data.currency || 'QAR',
            donorName: data.donorName || null,
            donorEmail: data.donorEmail || null,
            isAnonymous: data.isAnonymous || false,
            isRecurring: data.isRecurring || false,
            paymentRef: data.paymentRef || null,
            status: 'pending',
            donationType: data.donationType || 'general',
            message: data.message || null,
        },
    });
}

// ============ UPDATE DONATION STATUS ============
export async function updateDonationStatus(donationId: string, status: string, paymentRef?: string) {
    return await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTIONS.DONATIONS,
        rowId: donationId,
        data: {
            status,
            ...(paymentRef && { paymentRef }),
        },
    });
}

// ============ GET RECENT DONATIONS (for display, non-anonymous only) ============
export async function getRecentDonations(limit: number = 10): Promise<DonationDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.DONATIONS,
            queries: [
                Query.equal('status', 'completed'),
                Query.equal('isAnonymous', false),
                Query.orderDesc('$createdAt'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as DonationDocument[];
    } catch (error) {
        console.error('Error fetching recent donations:', error);
        return [];
    }
}

// ============ GET DONATIONS FOR CAMPAIGN ============
export async function getDonationsByCampaignId(campaignId: string, limit: number = 20): Promise<DonationDocument[]> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.DONATIONS,
            queries: [
                Query.equal('campaignId', campaignId),
                Query.equal('status', 'completed'),
                Query.orderDesc('$createdAt'),
                Query.limit(limit),
            ],
        });
        return response.rows as unknown as DonationDocument[];
    } catch (error) {
        console.error('Error fetching donations for campaign:', error);
        return [];
    }
}

// ============ GET DONATION BY PAYMENT REF ============
export async function getDonationByPaymentRef(paymentRef: string): Promise<DonationDocument | null> {
    try {
        const response = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: COLLECTIONS.DONATIONS,
            queries: [
                Query.equal('paymentRef', paymentRef),
                Query.limit(1),
            ],
        });
        return (response.rows[0] as unknown as DonationDocument) || null;
    } catch (error) {
        console.error('Error fetching donation by payment ref:', error);
        return null;
    }
}
