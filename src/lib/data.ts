import type { Campaign, VolunteerPosition, FaqItem, FinancialAllocation } from './types';

export interface Path {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  programs: Program[];
}

export interface Program {
  id: string;
  slug: string;
  pathId: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  zakatSupported: boolean;
  image: string;
}

export const paths: Path[] = [
  {
    id: '1',
    slug: 'education-empowerment',
    titleKey: 'paths.educationEmpowerment.title',
    descriptionKey: 'paths.educationEmpowerment.description',
    icon: 'GraduationCap',
    programs: [
      {
        id: 'p1',
        slug: 'scholarship-program',
        pathId: '1',
        titleEn: 'Scholarship Program',
        titleAr: 'برنامج المنح الدراسية',
        descriptionEn: 'Providing educational scholarships for underprivileged students',
        descriptionAr: 'توفير منح دراسية للطلاب المحتاجين',
        zakatSupported: true,
        image: 'scholarship',
      },
      {
        id: 'p2',
        slug: 'skills-training',
        pathId: '1',
        titleEn: 'Skills Training Center',
        titleAr: 'مركز التدريب المهني',
        descriptionEn: 'Vocational training programs for youth empowerment',
        descriptionAr: 'برامج تدريب مهني لتمكين الشباب',
        zakatSupported: false,
        image: 'training',
      },
    ],
  },
  {
    id: '2',
    slug: 'sponsoring-reformers',
    titleKey: 'paths.sponsoringReformers.title',
    descriptionKey: 'paths.sponsoringReformers.description',
    icon: 'Users',
    programs: [
      {
        id: 'p3',
        slug: 'community-leaders',
        pathId: '2',
        titleEn: 'Community Leaders Program',
        titleAr: 'برنامج قادة المجتمع',
        descriptionEn: 'Supporting emerging community leaders and reformers',
        descriptionAr: 'دعم قادة المجتمع والمصلحين الناشئين',
        zakatSupported: true,
        image: 'leaders',
      },
    ],
  },
  {
    id: '3',
    slug: 'educational-nurseries',
    titleKey: 'paths.educationalNurseries.title',
    descriptionKey: 'paths.educationalNurseries.description',
    icon: 'Baby',
    programs: [
      {
        id: 'p4',
        slug: 'early-childhood-education',
        pathId: '3',
        titleEn: 'Early Childhood Education',
        titleAr: 'التعليم المبكر للأطفال',
        descriptionEn: 'Quality early education programs for young children',
        descriptionAr: 'برامج تعليم مبكر عالية الجودة للأطفال الصغار',
        zakatSupported: false,
        image: 'nursery',
      },
    ],
  },
  {
    id: '4',
    slug: 'general-reform-programs',
    titleKey: 'paths.generalReformPrograms.title',
    descriptionKey: 'paths.generalReformPrograms.description',
    icon: 'Heart',
    programs: [
      {
        id: 'p5',
        slug: 'community-development',
        pathId: '4',
        titleEn: 'Community Development',
        titleAr: 'تنمية المجتمع',
        descriptionEn: 'Comprehensive programs for sustainable community development',
        descriptionAr: 'برامج شاملة للتنمية المجتمعية المستدامة',
        zakatSupported: true,
        image: 'community',
      },
    ],
  },
];

export const campaigns: Campaign[] = [
  {
    id: '1',
    slug: 'emergency-food-drive',
    goal: 180000,
    currentAmount: 85000,
    image: 'campaign-food-drive',
    zakatSupported: true,
    gallery: ['gallery-1', 'gallery-2'],
    donors: [
      { name: 'Ahmed K.', amount: 500, avatar: 'avatar-1' },
      { name: 'Fatima A.', amount: 300, avatar: 'avatar-2' },
      { name: 'Anonymous', amount: 750, avatar: 'avatar-3' },
    ]
  },
  {
    id: '2',
    slug: 'clean-water-for-all',
    goal: 270000,
    currentAmount: 248000,
    image: 'campaign-clean-water',
    zakatSupported: false,
    gallery: ['gallery-3', 'gallery-4'],
    donors: [
      { name: 'Mohammed S.', amount: 1800, avatar: 'avatar-1' },
      { name: 'Aisha M.', amount: 900, avatar: 'avatar-2' },
    ]
  },
  {
    id: '3',
    slug: 'education-support-program',
    goal: 90000,
    currentAmount: 41000,
    image: 'campaign-education-support',
    zakatSupported: true,
    gallery: ['gallery-1', 'gallery-4'],
    donors: [
      { name: 'Khalid R.', amount: 400, avatar: 'avatar-3' },
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
  { category: 'Food & Water Programs', amount: 1640000, percentage: 45 },
  { category: 'Medical Aid', amount: 910000, percentage: 25 },
  { category: 'Education & Child Support', amount: 546000, percentage: 15 },
  { category: 'Infrastructure & Shelter', amount: 364000, percentage: 10 },
  { category: 'Administration & Fundraising', amount: 182000, percentage: 5 }
];
