import type { Campaign, VolunteerPosition, FaqItem, FinancialAllocation } from './types';

export const campaigns: Campaign[] = [
  {
    id: '1',
    slug: 'emergency-food-drive',
    goal: 50000,
    currentAmount: 23500,
    image: 'campaign-food-drive',
    gallery: ['gallery-1', 'gallery-2'],
    donors: [
      { name: 'John D.', amount: 150, avatar: 'avatar-1' },
      { name: 'Maria S.', amount: 75, avatar: 'avatar-2' },
      { name: 'Anonymous', amount: 200, avatar: 'avatar-3' },
    ]
  },
  {
    id: '2',
    slug: 'clean-water-for-all',
    goal: 75000,
    currentAmount: 68200,
    image: 'campaign-clean-water',
    gallery: ['gallery-3', 'gallery-4'],
    donors: [
      { name: 'Alex T.', amount: 500, avatar: 'avatar-1' },
      { name: 'Samantha P.', amount: 250, avatar: 'avatar-2' },
    ]
  },
  {
    id: '3',
    slug: 'education-support-program',
    goal: 25000,
    currentAmount: 11300,
    image: 'campaign-education-support',
    gallery: ['gallery-1', 'gallery-4'],
    donors: [
      { name: 'David L.', amount: 100, avatar: 'avatar-3' },
    ]
  }
];

export const volunteerPositions: VolunteerPosition[] = [
  {
    id: 'event-staff',
    requirements: ['friendly', 'standing', 'weekends'],
  },
  {
    id: 'social-media',
    requirements: ['active', 'communication', 'creative'],
  },
  {
    id: 'grant-writer',
    requirements: ['writing', 'experience', 'detail-oriented'],
  }
];

export const faqItems: FaqItem[] = [
  { id: 'usage' },
  { id: 'tax' },
  { id: 'country' },
  { id: 'campaign_choice' }
];

export const financialData: FinancialAllocation[] = [
  { category: 'Food & Water Programs', amount: 450000, percentage: 45 },
  { category: 'Medical Aid', amount: 250000, percentage: 25 },
  { category: 'Education & Child Support', amount: 150000, percentage: 15 },
  { category: 'Infrastructure & Shelter', amount: 100000, percentage: 10 },
  { category: 'Administration & Fundraising', amount: 50000, percentage: 5 }
];
