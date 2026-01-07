/**
 * ============================================================================
 * STATIC DATA
 * ============================================================================
 * 
 * Static data for UI components that don't need to be dynamic.
 * For dynamic data, use the services in src/services/
 * ============================================================================
 */

// FAQ Items for Contact Page
export const faqItems = [
    {
        id: "faq-1",
        questionKey: "contact.faq.q1",
        answerKey: "contact.faq.a1",
    },
    {
        id: "faq-2", 
        questionKey: "contact.faq.q2",
        answerKey: "contact.faq.a2",
    },
    {
        id: "faq-3",
        questionKey: "contact.faq.q3",
        answerKey: "contact.faq.a3",
    },
    {
        id: "faq-4",
        questionKey: "contact.faq.q4",
        answerKey: "contact.faq.a4",
    },
    {
        id: "faq-5",
        questionKey: "contact.faq.q5",
        answerKey: "contact.faq.a5",
    },
];

// Financial Data for Transparency Page Charts
export const financialData = [
    {
        category: "Food & Water Programs",
        amount: 850000,
        percentage: 35,
    },
    {
        category: "Medical Aid",
        amount: 485000,
        percentage: 20,
    },
    {
        category: "Education & Child Support",
        amount: 363750,
        percentage: 15,
    },
    {
        category: "Infrastructure & Shelter",
        amount: 363750,
        percentage: 15,
    },
    {
        category: "Administration & Fundraising",
        amount: 363750,
        percentage: 15,
    },
];

// Type exports
export interface FAQItem {
    id: string;
    questionKey: string;
    answerKey: string;
}

export interface FinancialDataItem {
    category: string;
    amount: number;
    percentage: number;
}
