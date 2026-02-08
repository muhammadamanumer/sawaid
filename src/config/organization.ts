/**
 * Organization Information
 * Single source of truth for all organization-related data
 */

export const organizationInfo = {
  // Organization Names
  name: {
    en: 'Sawaid Al Islah',
    ar: 'سواعد الإصلاح',
  },
  
  // Contact Information
  contact: {
    headOffice: {
      en: 'Karam Al-Shami Neighborhood, Homs, Syria',
      ar: 'حي كرم الشامي، حمص، سوريا',
    },
    phone: '+963 982 369 654',
    whatsapp: '+90 538 707 8528',
    email: 'info@sawaidalislah.org', // Add if available
  },
  
  // Social Media Links (add as needed)
  social: {
    facebook: 'https://facebook.com/sawaidalislah',
    twitter: 'https://twitter.com/sawaidalislah',
    instagram: 'https://instagram.com/sawaidalislah',
    telegram: 'https://t.me/sawaidalislah',
  },
  
  // Legal Information
  legal: {
    registrationNumber: '', // Add if available
    taxId: '', // Add if available
  },
} as const;

// Helper function to get localized organization name
export const getOrganizationName = (locale: string = 'en'): string => {
  return locale === 'ar' ? organizationInfo.name.ar : organizationInfo.name.en;
};

// Helper function to get localized head office address
export const getHeadOffice = (locale: string = 'en'): string => {
  return locale === 'ar' 
    ? organizationInfo.contact.headOffice.ar 
    : organizationInfo.contact.headOffice.en;
};
