/**
 * ============================================================================
 * SERVICES INDEX - BARREL EXPORT
 * ============================================================================
 * 
 * Central export for all Appwrite services.
 * Import from '@/services' for cleaner imports.
 * 
 * Example:
 *   import { getCampaigns, getPaths, submitContactForm } from '@/services';
 * ============================================================================
 */

// Path services
export { getPaths, getPathBySlug } from './path';

// Program services  
export { getPrograms, getProgramsByPathId, getProgramBySlug } from './programs';

// Campaign services
export { 
    getCampaigns, 
    getFeaturedCampaigns, 
    getCampaignBySlug,
    getCampaignsByProgramId,
    getActiveCampaigns,
    getUrgentCampaigns 
} from './campaigns';

// Volunteer services
export { submitVolunteerApplication } from './volunteers';
export type { VolunteerApplicationData } from './volunteers';

// Volunteer position services
export { 
    getVolunteerPositions,
    getActiveVolunteerPositions,
    getVolunteerPositionBySlug,
    getVolunteerPositionsByType 
} from './volunteer-positions';

// Contact services
export { submitContactForm } from './contact';
export type { ContactFormPostData } from './contact';

// Post services
export { 
    getPosts, 
    getAllPosts,
    getPostBySlug,
    getPostsByCategory,
    getRecentPosts 
} from './posts';

// Stats services
export { getStats, getCampaignStats } from './stats';
export type { SiteStats } from './stats';

// Sponsor services
export { 
    getDisplayedSponsors,
    getAllSponsors,
    getSponsorsByType,
    registerSponsor 
} from './sponsors';
export type { SponsorRegistrationData } from './sponsors';

// Media services
export { 
    getMediaAssets,
    getMediaByType,
    getMediaByCampaignId,
    getMediaByTag 
} from './media';

// Report services
export { 
    getReports,
    getReportsByType,
    getLatestAnnualReport,
    getReportByYear 
} from './reports';

// Donation services
export { 
    createDonation,
    updateDonationStatus,
    getRecentDonations,
    getDonationsByCampaignId,
    getDonationByPaymentRef 
} from './donations';
export type { CreateDonationData } from './donations';
