export type NavLink = {
  href: string;
  label: string;
};

export type Campaign = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  goal: number;
  currentAmount: number;
  image: string;
  gallery: string[];
  donors: { name: string; amount: number; avatar: string }[];
};

export type VolunteerPosition = {
  title: string;
  description: string;
  requirements: string[];
  location: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FinancialAllocation = {
  category: string;
  amount: number;
  percentage: number;
};
