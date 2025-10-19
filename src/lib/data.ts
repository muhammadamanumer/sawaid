import type { NavLink, Campaign, VolunteerPosition, FaqItem, FinancialAllocation } from './types';

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/transparency', label: 'Transparency' },
  { href: '/contact', label: 'Contact' },
];

export const campaigns: Campaign[] = [
  {
    id: '1',
    slug: 'emergency-food-drive',
    title: 'Emergency Food Drive',
    shortDescription: 'Providing essential meals to families affected by recent disasters.',
    description: 'In the wake of recent floods, countless families have been displaced and are without access to basic necessities. Our Emergency Food Drive aims to provide hot meals and non-perishable food packages to those in urgent need. Your contribution can provide a family with food for a week.',
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
    title: 'Clean Water for All',
    shortDescription: 'Building wells to provide safe, clean drinking water to remote villages.',
    description: 'Access to clean water is a fundamental human right, yet many communities lack this basic resource. This campaign focuses on building sustainable wells and water purification systems in remote areas, preventing waterborne diseases and improving overall health. Join us in bringing life-sustaining water to those who need it most.',
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
    title: 'Education Support Program',
    shortDescription: 'Supplying books, stationery, and learning materials to underprivileged students.',
    description: 'Education is the key to a brighter future. Our Education Support Program equips students in low-income communities with the tools they need to succeed in school. Your donation can provide a child with a full year\'s worth of school supplies and textbooks.',
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
    title: 'Event Staff',
    description: 'Assist with setup, registration, and coordination at our fundraising events.',
    requirements: ['Friendly and outgoing personality', 'Ability to stand for long periods', 'Available on weekends'],
    location: 'Local (Multiple Cities)'
  },
  {
    title: 'Social Media Ambassador',
    description: 'Help spread awareness about our campaigns and mission on social media platforms.',
    requirements: ['Active presence on social media (Instagram, Facebook, Twitter)', 'Strong communication skills', 'Creative mindset'],
    location: 'Remote'
  },
  {
    title: 'Grant Writer',
    description: 'Research and write grant proposals to secure funding from foundations and corporations.',
    requirements: ['Excellent writing and research skills', 'Previous experience in grant writing preferred', 'Detail-oriented'],
    location: 'Remote'
  }
];

export const faqItems: FaqItem[] = [
  {
    question: 'How is my donation used?',
    answer: '85% of every donation goes directly to our programs. The remaining 15% covers essential administrative and fundraising costs to ensure we can continue our work effectively. You can view our detailed financial breakdown on our Transparency page.'
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, HopeHarbor is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the extent allowed by law. You will receive an automated receipt for your records after donating.'
  },
  {
    question: 'Can I volunteer from my country?',
    answer: 'We have many remote volunteering opportunities, such as our Social Media Ambassador program. Please check our Volunteer page for current openings that you can participate in from anywhere in the world.'
  },
  {
    question: 'How do you choose which campaigns to run?',
    answer: 'Our campaigns are based on rigorous needs assessments conducted in partnership with local communities. We prioritize projects that have a long-term, sustainable impact and address the most critical needs.'
  }
];

export const financialData: FinancialAllocation[] = [
  { category: 'Food & Water Programs', amount: 450000, percentage: 45 },
  { category: 'Medical Aid', amount: 250000, percentage: 25 },
  { category: 'Education & Child Support', amount: 150000, percentage: 15 },
  { category: 'Infrastructure & Shelter', amount: 100000, percentage: 10 },
  { category: 'Administration & Fundraising', amount: 50000, percentage: 5 }
];
