export type NavLink = {
  href: string;
  label: string;
};

// ============================================
// CORE HIERARCHY: Paths → Programs → Campaigns
// ============================================

/**
 * Path - Top-level organizational track (4 main paths)
 * Examples: Education & Empowerment, Sponsoring Reformers
 */
export type Path = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string; // Icon component name (e.g., "GraduationCap")
  coverImageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  // Computed/joined
  programs?: Program[];
};

/**
 * Program - Specific programs within each Path
 * Examples: Scholarship Program, Skills Training Center
 */
export type Program = {
  id: string;
  pathId: string; // Reference to parent Path
  slug: string;
  titleEn: string;
  titleAr: string;
  summaryEn?: string;
  summaryAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  zakatSupported: boolean; // 🟢/🔴 Zakat eligibility stamp
  coverImageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  // Computed/joined
  path?: Path;
  campaigns?: Campaign[];
};

/**
 * Campaign - Individual fundraising project (linked to a Program)
 * Also known as "Project" in requirements
 * Examples: Emergency Food Drive, Clean Water for All
 */
export type Campaign = {
  id: string;
  programId?: string; // Reference to parent Program (optional for standalone)
  slug: string;
  titleEn: string;
  titleAr: string;
  summaryEn?: string;
  summaryAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  goalAmount: number; // Fundraising goal in QAR
  raisedAmount: number; // Amount raised so far
  currency: string; // Default: "QAR"
  isUrgent: boolean; // Mark as urgent/time-sensitive
  zakatSupported: boolean; // 🟢/🔴 Zakat eligibility stamp
  coverImageUrl?: string;
  galleryUrls: string[]; // Array of gallery image URLs
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  isFeatured: boolean; // Show on homepage featured section
  isActive: boolean;
  // Computed/joined
  program?: Program;
  donors?: CampaignDonor[]; // Recent public donors
};

/**
 * Campaign donor display (for public donor wall)
 */
export type CampaignDonor = {
  name: string;
  amount: number;
  avatar?: string;
  isAnonymous?: boolean;
};

// ============================================
// DONATION & TRANSACTIONS
// ============================================

export type Donation = {
  id: string;
  campaignId?: string;
  programId?: string;
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  isAnonymous: boolean;
  isRecurring: boolean;
  paymentRef?: string; // Stripe payment intent ID
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  donationType: 'general' | 'zakat' | 'sadaqah' | 'fidya' | 'kaffarah';
  message?: string;
  createdAt: string;
};

// ============================================
// VOLUNTEER & SPONSORS
// ============================================

export type VolunteerPosition = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  requirements: string[];
  isActive: boolean;
};

export type VolunteerApplication = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  positionId?: string;
  skills: string[];
  availability?: string;
  message?: string;
  status: 'new' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
};

export type Sponsor = {
  id: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  message?: string;
  sponsorType: 'general' | 'corporate' | 'individual';
  logoUrl?: string;
  isDisplayed: boolean;
  status: 'new' | 'approved' | 'active' | 'inactive';
  createdAt: string;
};

// ============================================
// CONTENT & MEDIA
// ============================================

export type MediaAsset = {
  id: string;
  type: 'image' | 'video';
  titleEn?: string;
  titleAr?: string;
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  tags: string[];
  campaignId?: string;
  displayOrder: number;
  createdAt: string;
};

export type Post = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn?: string;
  excerptAr?: string;
  contentEn?: string;
  contentAr?: string;
  coverImageUrl?: string;
  category: 'news' | 'update' | 'story' | 'challenge';
  authorName?: string;
  publishedAt?: string;
  isPublished: boolean;
  createdAt: string;
};

export type TransparencyReport = {
  id: string;
  year: number;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  pdfUrl: string;
  reportType: 'annual' | 'quarterly' | 'project';
  isPublished: boolean;
  createdAt: string;
};

// ============================================
// OTHER TYPES
// ============================================

export type FaqItem = {
  id: string;
  questionEn?: string;
  questionAr?: string;
  answerEn?: string;
  answerAr?: string;
};

export type FinancialAllocation = {
  category: string;
  categoryAr?: string;
  amount: number;
  percentage: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
};

// ============================================
// LEGACY SUPPORT (for backward compatibility)
// ============================================

/**
 * @deprecated Use Path type instead
 */
export type LegacyPath = {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  programs: LegacyProgram[];
};

/**
 * @deprecated Use Program type instead
 */
export type LegacyProgram = {
  id: string;
  slug: string;
  pathId: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  zakatSupported: boolean;
  image: string;
};
