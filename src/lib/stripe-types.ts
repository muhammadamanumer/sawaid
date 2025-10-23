export interface DonationFormData {
  amount: number;
  currency: 'usd' | 'eur' | 'gbp';
  donationType: 'one-time' | 'monthly';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  campaignId?: string;
  zakatEligible?: boolean;
  anonymous?: boolean;
  message?: string;
}

export interface StripePaymentMetadata {
  donationType: string;
  campaignId?: string;
  zakatEligible?: string;
  anonymous?: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}
