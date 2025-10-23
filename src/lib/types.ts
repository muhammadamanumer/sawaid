export type NavLink = {
  href: string;
  label: string;
};

export type Campaign = {
  id: string;
  slug: string;
  goal: number;
  currentAmount: number;
  image: string;
  zakatSupported: boolean;
  gallery: string[];
  donors: { name: string; amount: number; avatar: string }[];
};

export type VolunteerPosition = {
  id: string;
  requirements: string[];
};

export type FaqItem = {
  id: string;
};

export type FinancialAllocation = {
  category: string;
  amount: number;
  percentage: number;
};
