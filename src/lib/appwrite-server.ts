import { Client, Databases, ID, Query } from 'node-appwrite';

/**
 * ============================================================================
 * APPWRITE SERVER-SIDE CLIENT
 * ============================================================================
 * 
 * This module provides server-side Appwrite operations using the node-appwrite
 * SDK with an API key. This is used exclusively in:
 * - API Routes (server-side)
 * - Webhook handlers
 * - Server actions
 * 
 * IMPORTANT: Never import this module in client components!
 * 
 * The API key provides elevated permissions for:
 * - Creating donation records
 * - Updating campaign totals
 * - Processing webhook events
 * ============================================================================
 */

// Configuration
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const API_KEY = process.env.APPWRITE_API_KEY!;
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'sawaid_db_test';

// Collection IDs
export const COLLECTIONS = {
    CAMPAIGNS: 'campaigns',
    DONATIONS: 'donations',
    PROGRAMS: 'programs',
} as const;

/**
 * Creates a new Appwrite server client with API key authentication.
 * Each request should create a new client to ensure clean state.
 */
export function createServerClient(): { client: Client; databases: Databases } {
    if (!PROJECT_ID) {
        throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not configured');
    }
    
    if (!API_KEY) {
        throw new Error('APPWRITE_API_KEY is not configured. Required for server-side operations.');
    }

    const client = new Client();
    
    client
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setKey(API_KEY);
    
    return {
        client,
        databases: new Databases(client),
    };
}

// Re-export utilities
export { ID, Query };

/**
 * ============================================================================
 * DONATION OPERATIONS (Server-side)
 * ============================================================================
 */

export interface CreateDonationData {
    campaignId: string | null;
    programId: string | null;
    amount: number;
    currency: string;
    donorName: string | null;
    donorEmail: string | null;
    isAnonymous: boolean;
    isRecurring: boolean;
    paymentRef: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    donationType: string;
    message: string | null;
}

/**
 * Check if a donation with this payment reference already exists.
 * Used for idempotency - prevents duplicate donations from webhook retries.
 */
export async function donationExistsByPaymentRef(paymentRef: string): Promise<boolean> {
    try {
        const { databases } = createServerClient();
        
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.DONATIONS,
            [
                Query.equal('paymentRef', paymentRef),
                Query.limit(1),
            ]
        );
        
        return result.documents.length > 0;
    } catch (error) {
        console.error('Error checking donation existence:', error);
        // Return false to allow creation attempt (will fail if duplicate)
        return false;
    }
}

/**
 * Create a new donation record in Appwrite.
 */
export async function createDonationRecord(data: CreateDonationData): Promise<string> {
    const { databases } = createServerClient();
    
    // Idempotency check - prevent duplicate donations
    const exists = await donationExistsByPaymentRef(data.paymentRef);
    if (exists) {
        console.log(`⚠️ Donation with paymentRef ${data.paymentRef} already exists, skipping`);
        return 'existing';
    }
    
    const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        ID.unique(),
        {
            campaignId: data.campaignId,
            programId: data.programId,
            amount: data.amount,
            currency: data.currency,
            donorName: data.donorName,
            donorEmail: data.donorEmail,
            isAnonymous: data.isAnonymous,
            isRecurring: data.isRecurring,
            paymentRef: data.paymentRef,
            status: data.status,
            donationType: data.donationType,
            message: data.message,
        }
    );
    
    console.log(`✅ Donation record created: ${document.$id} (paymentRef: ${data.paymentRef})`);
    return document.$id;
}

/**
 * Update donation status by payment reference.
 * Used for handling refunds, failures, etc.
 */
export async function updateDonationByPaymentRef(
    paymentRef: string,
    status: 'pending' | 'completed' | 'failed' | 'refunded'
): Promise<boolean> {
    try {
        const { databases } = createServerClient();
        
        // Find the donation
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.DONATIONS,
            [
                Query.equal('paymentRef', paymentRef),
                Query.limit(1),
            ]
        );
        
        if (result.documents.length === 0) {
            console.log(`⚠️ No donation found with paymentRef: ${paymentRef}`);
            return false;
        }
        
        const donation = result.documents[0];
        
        // Update status
        await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.DONATIONS,
            donation.$id,
            { status }
        );
        
        console.log(`✅ Donation ${donation.$id} status updated to: ${status}`);
        return true;
    } catch (error) {
        console.error('Error updating donation status:', error);
        return false;
    }
}

/**
 * Get donation by payment reference.
 */
export async function getDonationByPaymentRef(paymentRef: string): Promise<any | null> {
    try {
        const { databases } = createServerClient();
        
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.DONATIONS,
            [
                Query.equal('paymentRef', paymentRef),
                Query.limit(1),
            ]
        );
        
        return result.documents[0] || null;
    } catch (error) {
        console.error('Error fetching donation:', error);
        return null;
    }
}

/**
 * ============================================================================
 * CAMPAIGN OPERATIONS (Server-side)
 * ============================================================================
 */

/**
 * Update campaign raised amount by adding the donation amount.
 * This is called after a successful donation is recorded.
 */
export async function updateCampaignRaisedAmount(
    campaignId: string,
    donationAmount: number
): Promise<boolean> {
    try {
        const { databases } = createServerClient();
        
        // Get current campaign data
        const campaign = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.CAMPAIGNS,
            campaignId
        );
        
        const currentRaised = (campaign as any).raisedAmount || 0;
        const newRaised = currentRaised + donationAmount;
        
        // Update campaign
        await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.CAMPAIGNS,
            campaignId,
            { raisedAmount: newRaised }
        );
        
        console.log(`✅ Campaign ${campaignId} updated: ${currentRaised} → ${newRaised} (+${donationAmount})`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to update campaign ${campaignId}:`, error);
        return false;
    }
}

/**
 * Decrease campaign raised amount (for refunds).
 */
export async function decreaseCampaignRaisedAmount(
    campaignId: string,
    refundAmount: number
): Promise<boolean> {
    try {
        const { databases } = createServerClient();
        
        // Get current campaign data
        const campaign = await databases.getDocument(
            DATABASE_ID,
            COLLECTIONS.CAMPAIGNS,
            campaignId
        );
        
        const currentRaised = (campaign as any).raisedAmount || 0;
        const newRaised = Math.max(0, currentRaised - refundAmount);
        
        // Update campaign
        await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.CAMPAIGNS,
            campaignId,
            { raisedAmount: newRaised }
        );
        
        console.log(`✅ Campaign ${campaignId} refund applied: ${currentRaised} → ${newRaised} (-${refundAmount})`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to apply refund to campaign ${campaignId}:`, error);
        return false;
    }
}
