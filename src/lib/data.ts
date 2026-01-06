import type { 
  Campaign, 
  VolunteerPosition, 
  FaqItem, 
  FinancialAllocation,
  Path,
  Program,
  CampaignDonor,
  LegacyPath,
  LegacyProgram
} from './types';

// ============================================
// LEGACY DATA STRUCTURE (for backward compatibility)
// Will be migrated to Appwrite database
// ============================================

/**
 * @deprecated Use paths (new structure) with Appwrite
 */
export interface LegacyPathInterface {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  programs: LegacyProgramInterface[];
}

/**
 * @deprecated Use programs (new structure) with Appwrite
 */
export interface LegacyProgramInterface {
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

// ============================================
// NEW UNIFIED DATA STRUCTURE
// Hierarchy: Paths → Programs → Campaigns
// ============================================

/**
 * Paths - 4 main organizational tracks
 */
export const pathsData: Path[] = [
  {
    id: 'path-1',
    slug: 'education-empowerment',
    titleEn: 'Education & Empowerment',
    titleAr: 'التعليم والتمكين',
    descriptionEn: 'Empowering individuals through quality education, scholarships, and vocational training programs that build sustainable futures.',
    descriptionAr: 'تمكين الأفراد من خلال التعليم الجيد والمنح الدراسية وبرامج التدريب المهني التي تبني مستقبلاً مستداماً.',
    icon: 'GraduationCap',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'path-2',
    slug: 'sponsoring-reformers',
    titleEn: 'Sponsoring Reformers',
    titleAr: 'كفالة المصلحين',
    descriptionEn: 'Supporting emerging community leaders and reformers who are making positive changes in their communities.',
    descriptionAr: 'دعم قادة المجتمع والمصلحين الناشئين الذين يحدثون تغييرات إيجابية في مجتمعاتهم.',
    icon: 'Users',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'path-3',
    slug: 'educational-nurseries',
    titleEn: 'Educational Nurseries',
    titleAr: 'الحضانات التعليمية',
    descriptionEn: 'Providing quality early childhood education and care programs for young children.',
    descriptionAr: 'توفير برامج تعليم ورعاية مبكرة عالية الجودة للأطفال الصغار.',
    icon: 'Baby',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'path-4',
    slug: 'general-reform-programs',
    titleEn: 'General Reform Programs',
    titleAr: 'برامج الإصلاح العامة',
    descriptionEn: 'Comprehensive programs for sustainable community development and humanitarian aid.',
    descriptionAr: 'برامج شاملة للتنمية المجتمعية المستدامة والمساعدات الإنسانية.',
    icon: 'Heart',
    displayOrder: 4,
    isActive: true,
  },
];

/**
 * Programs - Specific programs within each Path
 */
export const programsData: Program[] = [
  // Education & Empowerment Programs
  {
    id: 'prog-1',
    pathId: 'path-1',
    slug: 'scholarship-program',
    titleEn: 'Scholarship Program',
    titleAr: 'برنامج المنح الدراسية',
    summaryEn: 'Providing educational scholarships for underprivileged students',
    summaryAr: 'توفير منح دراسية للطلاب المحتاجين',
    descriptionEn: 'Our scholarship program helps deserving students access quality education by covering tuition, books, and living expenses.',
    descriptionAr: 'يساعد برنامج المنح الدراسية لدينا الطلاب المستحقين على الوصول إلى تعليم جيد من خلال تغطية الرسوم الدراسية والكتب ونفقات المعيشة.',
    zakatSupported: true,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'prog-2',
    pathId: 'path-1',
    slug: 'skills-training',
    titleEn: 'Skills Training Center',
    titleAr: 'مركز التدريب المهني',
    summaryEn: 'Vocational training programs for youth empowerment',
    summaryAr: 'برامج تدريب مهني لتمكين الشباب',
    descriptionEn: 'Practical skills training in technology, trades, and professional development for employment opportunities.',
    descriptionAr: 'تدريب عملي على المهارات في التكنولوجيا والحرف والتطوير المهني لفرص العمل.',
    zakatSupported: false,
    displayOrder: 2,
    isActive: true,
  },
  // Sponsoring Reformers Programs
  {
    id: 'prog-3',
    pathId: 'path-2',
    slug: 'community-leaders',
    titleEn: 'Community Leaders Program',
    titleAr: 'برنامج قادة المجتمع',
    summaryEn: 'Supporting emerging community leaders and reformers',
    summaryAr: 'دعم قادة المجتمع والمصلحين الناشئين',
    descriptionEn: 'Identifying and nurturing community leaders who can drive positive change in their societies.',
    descriptionAr: 'تحديد ورعاية قادة المجتمع الذين يمكنهم قيادة التغيير الإيجابي في مجتمعاتهم.',
    zakatSupported: true,
    displayOrder: 1,
    isActive: true,
  },
  // Educational Nurseries Programs
  {
    id: 'prog-4',
    pathId: 'path-3',
    slug: 'early-childhood-education',
    titleEn: 'Early Childhood Education',
    titleAr: 'التعليم المبكر للأطفال',
    summaryEn: 'Quality early education programs for young children',
    summaryAr: 'برامج تعليم مبكر عالية الجودة للأطفال الصغار',
    descriptionEn: 'Comprehensive early childhood development programs focusing on cognitive, social, and emotional growth.',
    descriptionAr: 'برامج شاملة لتنمية الطفولة المبكرة تركز على النمو المعرفي والاجتماعي والعاطفي.',
    zakatSupported: false,
    displayOrder: 1,
    isActive: true,
  },
  // General Reform Programs
  {
    id: 'prog-5',
    pathId: 'path-4',
    slug: 'community-development',
    titleEn: 'Community Development',
    titleAr: 'تنمية المجتمع',
    summaryEn: 'Comprehensive programs for sustainable community development',
    summaryAr: 'برامج شاملة للتنمية المجتمعية المستدامة',
    descriptionEn: 'Holistic approach to community development including infrastructure, health, and social services.',
    descriptionAr: 'نهج شامل للتنمية المجتمعية يشمل البنية التحتية والصحة والخدمات الاجتماعية.',
    zakatSupported: true,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'prog-6',
    pathId: 'path-4',
    slug: 'emergency-relief',
    titleEn: 'Emergency Relief',
    titleAr: 'الإغاثة الطارئة',
    summaryEn: 'Rapid response humanitarian aid programs',
    summaryAr: 'برامج المساعدات الإنسانية للاستجابة السريعة',
    descriptionEn: 'Providing immediate relief to communities affected by disasters and emergencies.',
    descriptionAr: 'تقديم الإغاثة الفورية للمجتمعات المتضررة من الكوارث والطوارئ.',
    zakatSupported: true,
    displayOrder: 2,
    isActive: true,
  },
];

/**
 * Campaigns - Individual fundraising projects linked to Programs
 */
export const campaignsData: Campaign[] = [
  {
    id: 'camp-1',
    programId: 'prog-6', // Linked to Emergency Relief program
    slug: 'emergency-food-drive',
    titleEn: 'Emergency Food Drive',
    titleAr: 'حملة الغذاء الطارئة',
    summaryEn: 'Providing emergency food supplies to families in crisis',
    summaryAr: 'توفير إمدادات الغذاء الطارئة للعائلات في الأزمات',
    descriptionEn: 'Our emergency food drive aims to provide nutritious meals and essential food supplies to families affected by crisis situations. Every contribution helps us deliver immediate relief to those in desperate need.',
    descriptionAr: 'تهدف حملة الغذاء الطارئة لدينا إلى توفير وجبات مغذية وإمدادات غذائية أساسية للعائلات المتضررة من حالات الأزمات. كل مساهمة تساعدنا على تقديم الإغاثة الفورية لأولئك الذين هم في أمس الحاجة.',
    goalAmount: 180000,
    raisedAmount: 85000,
    currency: 'QAR',
    isUrgent: true,
    zakatSupported: true,
    coverImageUrl: 'campaign-food-drive',
    galleryUrls: ['gallery-1', 'gallery-2'],
    isFeatured: true,
    isActive: true,
    donors: [
      { name: 'Ahmed K.', amount: 500, avatar: 'avatar-1' },
      { name: 'Fatima A.', amount: 300, avatar: 'avatar-2' },
      { name: 'Anonymous', amount: 750, avatar: 'avatar-3', isAnonymous: true },
    ],
  },
  {
    id: 'camp-2',
    programId: 'prog-5', // Linked to Community Development program
    slug: 'clean-water-for-all',
    titleEn: 'Clean Water for All',
    titleAr: 'مياه نظيفة للجميع',
    summaryEn: 'Building water wells and purification systems',
    summaryAr: 'بناء آبار المياه وأنظمة التنقية',
    descriptionEn: 'Access to clean water is a fundamental human right. This campaign builds sustainable water infrastructure including wells, pumps, and purification systems for communities in need.',
    descriptionAr: 'الحصول على المياه النظيفة حق أساسي من حقوق الإنسان. تبني هذه الحملة البنية التحتية المستدامة للمياه بما في ذلك الآبار والمضخات وأنظمة التنقية للمجتمعات المحتاجة.',
    goalAmount: 270000,
    raisedAmount: 248000,
    currency: 'QAR',
    isUrgent: false,
    zakatSupported: false,
    coverImageUrl: 'campaign-clean-water',
    galleryUrls: ['gallery-3', 'gallery-4'],
    isFeatured: true,
    isActive: true,
    donors: [
      { name: 'Mohammed S.', amount: 1800, avatar: 'avatar-1' },
      { name: 'Aisha M.', amount: 900, avatar: 'avatar-2' },
    ],
  },
  {
    id: 'camp-3',
    programId: 'prog-1', // Linked to Scholarship Program
    slug: 'education-support-program',
    titleEn: 'Education Support Program',
    titleAr: 'برنامج دعم التعليم',
    summaryEn: 'Supporting students with educational materials and tuition',
    summaryAr: 'دعم الطلاب بالمواد التعليمية والرسوم الدراسية',
    descriptionEn: 'Help us provide educational materials, tuition support, and learning resources to underprivileged students striving for a better future through education.',
    descriptionAr: 'ساعدنا في توفير المواد التعليمية ودعم الرسوم الدراسية وموارد التعلم للطلاب المحتاجين الذين يسعون لمستقبل أفضل من خلال التعليم.',
    goalAmount: 90000,
    raisedAmount: 41000,
    currency: 'QAR',
    isUrgent: false,
    zakatSupported: true,
    coverImageUrl: 'campaign-education-support',
    galleryUrls: ['gallery-1', 'gallery-4'],
    isFeatured: true,
    isActive: true,
    donors: [
      { name: 'Khalid R.', amount: 400, avatar: 'avatar-3' },
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all programs for a specific path
 */
export function getProgramsByPathId(pathId: string): Program[] {
  return programsData.filter(p => p.pathId === pathId && p.isActive);
}

/**
 * Get all campaigns for a specific program
 */
export function getCampaignsByProgramId(programId: string): Campaign[] {
  return campaignsData.filter(c => c.programId === programId && c.isActive);
}

/**
 * Get path with its programs and campaigns
 */
export function getPathWithDetails(slug: string): Path | null {
  const path = pathsData.find(p => p.slug === slug);
  if (!path) return null;
  
  const programs = getProgramsByPathId(path.id).map(program => ({
    ...program,
    campaigns: getCampaignsByProgramId(program.id),
  }));
  
  return { ...path, programs };
}

/**
 * Get program with its campaigns
 */
export function getProgramWithCampaigns(slug: string): Program | null {
  const program = programsData.find(p => p.slug === slug);
  if (!program) return null;
  
  return {
    ...program,
    campaigns: getCampaignsByProgramId(program.id),
    path: pathsData.find(p => p.id === program.pathId),
  };
}

/**
 * Get campaign with its program and path info
 */
export function getCampaignWithDetails(slug: string): Campaign | null {
  const campaign = campaignsData.find(c => c.slug === slug);
  if (!campaign) return null;
  
  const program = campaign.programId 
    ? programsData.find(p => p.id === campaign.programId)
    : undefined;
  
  return {
    ...campaign,
    program: program ? {
      ...program,
      path: pathsData.find(p => p.id === program.pathId),
    } : undefined,
  };
}

// ============================================
// LEGACY DATA EXPORTS (for backward compatibility)
// These will be deprecated when migrating to Appwrite
// ============================================

/**
 * @deprecated Use pathsData with programsData instead
 * Legacy paths structure with nested programs
 */
export const paths: LegacyPathInterface[] = [
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

/**
 * @deprecated Use campaignsData instead
 * Legacy campaigns for backward compatibility
 */
export const campaigns: (Omit<Campaign, 'donors'> & { 
  goal: number; 
  currentAmount: number; 
  image: string; 
  gallery: string[];
  donors: { name: string; amount: number; avatar: string }[];
})[] = [
  {
    id: '1',
    programId: 'prog-6',
    slug: 'emergency-food-drive',
    titleEn: 'Emergency Food Drive',
    titleAr: 'حملة الغذاء الطارئة',
    goal: 180000,
    goalAmount: 180000,
    currentAmount: 85000,
    raisedAmount: 85000,
    currency: 'QAR',
    image: 'campaign-food-drive',
    coverImageUrl: 'campaign-food-drive',
    zakatSupported: true,
    isUrgent: true,
    isFeatured: true,
    isActive: true,
    gallery: ['gallery-1', 'gallery-2'],
    galleryUrls: ['gallery-1', 'gallery-2'],
    donors: [
      { name: 'Ahmed K.', amount: 500, avatar: 'avatar-1' },
      { name: 'Fatima A.', amount: 300, avatar: 'avatar-2' },
      { name: 'Anonymous', amount: 750, avatar: 'avatar-3' },
    ]
  },
  {
    id: '2',
    programId: 'prog-5',
    slug: 'clean-water-for-all',
    titleEn: 'Clean Water for All',
    titleAr: 'مياه نظيفة للجميع',
    goal: 270000,
    goalAmount: 270000,
    currentAmount: 248000,
    raisedAmount: 248000,
    currency: 'QAR',
    image: 'campaign-clean-water',
    coverImageUrl: 'campaign-clean-water',
    zakatSupported: false,
    isUrgent: false,
    isFeatured: true,
    isActive: true,
    gallery: ['gallery-3', 'gallery-4'],
    galleryUrls: ['gallery-3', 'gallery-4'],
    donors: [
      { name: 'Mohammed S.', amount: 1800, avatar: 'avatar-1' },
      { name: 'Aisha M.', amount: 900, avatar: 'avatar-2' },
    ]
  },
  {
    id: '3',
    programId: 'prog-1',
    slug: 'education-support-program',
    titleEn: 'Education Support Program',
    titleAr: 'برنامج دعم التعليم',
    goal: 90000,
    goalAmount: 90000,
    currentAmount: 41000,
    raisedAmount: 41000,
    currency: 'QAR',
    image: 'campaign-education-support',
    coverImageUrl: 'campaign-education-support',
    zakatSupported: true,
    isUrgent: false,
    isFeatured: true,
    isActive: true,
    gallery: ['gallery-1', 'gallery-4'],
    galleryUrls: ['gallery-1', 'gallery-4'],
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
