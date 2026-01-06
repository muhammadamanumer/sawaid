import { Models } from 'appwrite';

// Base document type from Appwrite
export type AppwriteDocument = Models.Document;


// Volunteer Position Collection

export interface VolunteerPositionDocument extends AppwriteDocument {
    slug: string;
    titleEn: string;
    titleAr: string;
    type: 'remote' | 'onsite' | 'hybrid';
    status: 'active' | 'inactive';
}

// 1. Path Collection
export interface PathDocument extends AppwriteDocument {
    slug: string;
    titleEn: string;
    titleAr: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    icon: string;
    coverImageUrl: string | null;
    displayOrder: number; // Renamed from order_priority
    isActive: boolean;    // Changed from status string to boolean
}

// 2. Program Collection
export interface ProgramDocument extends AppwriteDocument {
    pathId: string;
    slug: string;
    titleEn: string;
    titleAr: string;
    summaryEn: string | null;
    summaryAr: string | null;
    descriptionEn: string | null;
    descriptionAr: string | null;
    coverImageUrl: string | null;
    zakatSupported: boolean;
    displayOrder: number;
    isActive: boolean; // Changed from status string to boolean
}

// 3. Campaign Collection
export interface CampaignDocument extends AppwriteDocument {
    programId: string | null;
    slug: string;
    titleEn: string;
    titleAr: string;
    summaryEn: string | null;
    summaryAr: string | null;
    descriptionEn: string | null;
    descriptionAr: string | null;
    goalAmount: number;
    raisedAmount: number;
    currency: string;
    isUrgent: boolean;
    zakatSupported: boolean;
    isFeatured: boolean;
    isActive: boolean;
    coverImageUrl: string | null;
    galleryUrls: string[]; // Appwrite stores arrays as strings
    startDate: string | null; // ISO Date string
    endDate: string | null;   // ISO Date string
}

// 4. Donation Collection
export interface DonationDocument extends AppwriteDocument {
    campaignId: string | null;
    programId: string | null;
    amount: number;
    currency: string;
    donorName: string | null;  // Combined first/last name
    donorEmail: string | null;
    isAnonymous: boolean;
    isRecurring: boolean;
    paymentRef: string | null; // Replaces stripe_payment_intent_id
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    donationType: 'general' | 'zakat' | 'sadaqah' | string;
    message: string | null;
}

// 5. Volunteer Collection
export interface VolunteerDocument extends AppwriteDocument {
    fullName: string;
    email: string;
    phone: string | null;
    positionId: string | null;
    skills: string[]; 
    availability: string | null;
    message: string | null;
    status: 'new' | 'reviewed' | 'accepted' | 'rejected';
}

// 6. Media Asset Collection
export interface MediaAssetDocument extends AppwriteDocument {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl: string | null;
    titleEn: string | null;
    titleAr: string | null;
    altText: string | null;
    tags: string[];
    campaignId: string | null;
    displayOrder: number;
}

// 7. Post Collection (News/Updates)
export interface PostDocument extends AppwriteDocument {
    slug: string;
    titleEn: string;
    titleAr: string;
    excerptEn: string | null;
    excerptAr: string | null;
    contentEn: string | null;
    contentAr: string | null;
    coverImageUrl: string | null;
    category: string;
    authorName: string | null;
    publishedAt: string | null;
    isPublished: boolean;
}

// 8. Contact Message Collection
export interface ContactSubmissionDocument extends AppwriteDocument {
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
}

// 9. Report Collection
export interface ReportDocument extends AppwriteDocument {
    year: number;
    titleEn: string;
    titleAr: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    pdfUrl: string;
    reportType: string;
    isPublished: boolean;
}

// 10. Sponsor Collection
export interface SponsorDocument extends AppwriteDocument {
    organizationName: string;
    contactName: string;
    email: string;
    phone: string | null;
    website: string | null;
    message: string | null;
    sponsorType: string;
    logoUrl: string | null;
    isDisplayed: boolean;
    status: string;
}

// 11. Category Collection (New)
// NOTE: This uses snake_case as explicitly requested in the previous step
export interface CategoryDocument extends AppwriteDocument {
    slug: string;
    title_en: string;
    title_ar: string;
    type: 'sector' | 'beneficiary' | 'tag';
    isActive: boolean;
}