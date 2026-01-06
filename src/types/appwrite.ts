import { Models } from 'appwrite';

// Base document type from Appwrite
type AppwriteDocument = Models.Document;

// Path Collection
export interface PathDocument extends AppwriteDocument {
    slug: string;
    title_en: string;
    title_ar: string;
    description_en: string | null;
    description_ar: string | null;
    icon: string;
    order_priority: number;
    status: 'active' | 'inactive';
}

// Program Collection
export interface ProgramDocument extends AppwriteDocument {
    slug: string;
    title_en: string;
    title_ar: string;
    summary_en: string | null;
    summary_ar: string | null;
    description_en: string | null;
    description_ar: string | null;
    cover_image_url: string | null;
    gallery_images: string[] | null;
    zakat_supported: boolean;
    status: 'draft' | 'published' | 'archived';
    target_amount: number | null;
    current_amount: number | null;
    start_date: string | null;
    end_date: string | null;
    path_id: string | null;
}

// Campaign Collection
export interface CampaignDocument extends AppwriteDocument {
    slug: string;
    title_en: string;
    title_ar: string;
    description_en: string | null;
    description_ar: string | null;
    goal_amount: number;
    raised_amount: number;
    currency: string;
    is_urgent: boolean;
    zakat_supported: boolean;
    is_featured: boolean;
    cover_image_url: string | null;
    gallery_images: string[] | null;
    status: 'active' | 'completed' | 'cancelled';
    program_id: string | null;
}

// Donation Collection
export interface DonationDocument extends AppwriteDocument {
    donor_first_name: string;
    donor_last_name: string;
    donor_email: string;
    donor_phone: string | null;
    amount: number;
    currency: string;
    donation_type: 'onetime' | 'monthly';
    zakat_eligible: boolean;
    is_anonymous: boolean;
    message: string | null;
    stripe_payment_intent_id: string | null;
    stripe_session_id: string | null;
    payment_status: string;
    receipt_sent: boolean;
    campaign_id: string | null;
}

// Volunteer Collection
export interface VolunteerDocument extends AppwriteDocument {
    full_name: string;
    email: string;
    phone: string | null;
    message: string | null;
    cv_url: string | null;
    status: string;
    position_id: string | null;
}

// Volunteer Position Collection
export interface VolunteerPositionDocument extends AppwriteDocument {
    slug: string;
    title_en: string;
    title_ar: string;
    type: 'remote' | 'onsite' | 'hybrid';
    status: 'active' | 'inactive';
}

// Media Asset Collection
export interface MediaAssetDocument extends AppwriteDocument {
    type: 'image' | 'video';
    url: string;
    title_en: string | null;
    title_ar: string | null;
}

// Contact Message Collection
export interface ContactMessageDocument extends AppwriteDocument {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
}

// Post Collection
export interface PostDocument extends AppwriteDocument {
    slug: string;
    title_en: string;
    title_ar: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
}
