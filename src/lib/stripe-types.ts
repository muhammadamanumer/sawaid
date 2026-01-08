/**
 * ============================================================================
 * STRIPE TYPES
 * ============================================================================
 * 
 * Type definitions for Stripe payment integration.
 * ============================================================================
 */

export interface DonationFormData {
  amount: number;
  currency: 'qar' | 'usd' | 'eur' | 'gbp';
  donationType: 'one-time' | 'monthly';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  campaignId?: string;
  programId?: string;
  zakatEligible?: boolean;
  anonymous?: boolean;
  message?: string;
}

export interface StripePaymentMetadata {
  donationType: string;
  campaignId: string;
  programId?: string;
  zakatEligible: string;
  anonymous: string;
  firstName: string;
  lastName: string;
  phone?: string;
  message?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface DonationRecord {
  id: string;
  campaignId: string | null;
  programId: string | null;
  amount: number;
  currency: string;
  donorName: string | null;
  donorEmail: string | null;
  isAnonymous: boolean;
  isRecurring: boolean;
  paymentRef: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  donationType: string;
  message: string | null;
  createdAt: string;
}
