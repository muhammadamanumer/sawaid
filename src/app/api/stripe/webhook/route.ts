import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { Client, Databases, ID } from 'node-appwrite';

/**
 * ============================================================================
 * STRIPE WEBHOOK HANDLER
 * ============================================================================
 * 
 * This webhook handles all Stripe events including:
 * - checkout.session.completed (one-time donations)
 * - invoice.payment_succeeded (recurring donations)
 * - customer.subscription.created/updated/deleted
 * 
 * It saves donation records to Appwrite and updates campaign totals.
 * ============================================================================
 */

// Lazy initialization for Stripe
let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripe = new Stripe(secretKey, {
      apiVersion: '2025-09-30.clover',
    });
  }
  return stripe;
}

// Initialize Appwrite server client
function getAppwriteClient(): { databases: Databases } {
  const client = new Client();
  
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;
  
  if (!projectId || !apiKey) {
    throw new Error('Appwrite configuration missing');
  }
  
  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);
  
  return {
    databases: new Databases(client),
  };
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'sawaid_db_test';
const COLLECTIONS = {
  DONATIONS: 'donations',
  CAMPAIGNS: 'campaigns',
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

interface DonationData {
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
}

/**
 * Create donation record in Appwrite
 */
async function createDonationRecord(data: DonationData): Promise<void> {
  try {
    const { databases } = getAppwriteClient();
    
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.DONATIONS,
      ID.unique(),
      {
        campaignId: data.campaignId,
        programId: data.programId,
        amount: data.amount,
        currency: data.currency,
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        isAnonymous: data.isAnonymous,
        isRecurring: data.isRecurring,
        paymentRef: data.paymentRef,
        status: data.status,
        donationType: data.donationType,
        message: data.message,
      }
    );
    
    console.log('✅ Donation record created:', data.paymentRef);
  } catch (error) {
    console.error('❌ Failed to create donation record:', error);
    throw error;
  }
}

/**
 * Update campaign raised amount
 */
async function updateCampaignRaisedAmount(
  campaignId: string, 
  amount: number
): Promise<void> {
  try {
    const { databases } = getAppwriteClient();
    
    // Get current campaign data
    const campaign = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.CAMPAIGNS,
      campaignId
    );
    
    const currentRaised = (campaign as any).raisedAmount || 0;
    const newRaised = currentRaised + amount;
    
    // Update campaign
    await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.CAMPAIGNS,
      campaignId,
      {
        raisedAmount: newRaised,
      }
    );
    
    console.log(`✅ Updated campaign ${campaignId}: ${currentRaised} → ${newRaised}`);
  } catch (error) {
    console.error(`❌ Failed to update campaign ${campaignId}:`, error);
    // Don't throw - donation was still recorded
  }
}

/**
 * Process successful checkout session
 */
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const metadata = session.metadata || {};
  
  // Convert amount from cents to actual currency
  const amountInCents = session.amount_total || 0;
  const amount = amountInCents / 100;
  
  const donationData: DonationData = {
    campaignId: metadata.campaignId && metadata.campaignId !== 'general' ? metadata.campaignId : null,
    programId: metadata.programId || null,
    amount,
    currency: (session.currency || 'qar').toUpperCase(),
    donorName: metadata.anonymous === 'true' 
      ? null 
      : `${metadata.firstName || ''} ${metadata.lastName || ''}`.trim() || null,
    donorEmail: session.customer_email || null,
    isAnonymous: metadata.anonymous === 'true',
    isRecurring: session.mode === 'subscription',
    paymentRef: session.payment_intent as string || session.subscription as string || session.id,
    status: 'completed',
    donationType: metadata.zakatEligible === 'true' ? 'zakat' : 'general',
    message: metadata.message || null,
  };
  
  // Create donation record
  await createDonationRecord(donationData);
  
  // Update campaign total if campaign-specific donation
  if (donationData.campaignId) {
    await updateCampaignRaisedAmount(donationData.campaignId, amount);
  }
}

/**
 * Process successful invoice payment (recurring donations)
 */
async function handleInvoicePaymentSucceeded(
  invoice: Stripe.Invoice
): Promise<void> {
  // Skip if this is the first invoice (handled by checkout.session.completed)
  if (invoice.billing_reason === 'subscription_create') {
    console.log('Skipping first invoice - handled by checkout session');
    return;
  }
  
  const subscription = invoice.subscription as string;
  const amountInCents = invoice.amount_paid || 0;
  const amount = amountInCents / 100;
  
  // Get subscription metadata
  let metadata: Record<string, string> = {};
  if (subscription) {
    try {
      const sub = await getStripe().subscriptions.retrieve(subscription);
      metadata = sub.metadata || {};
    } catch (error) {
      console.error('Failed to retrieve subscription:', error);
    }
  }
  
  const donationData: DonationData = {
    campaignId: metadata.campaignId && metadata.campaignId !== 'general' ? metadata.campaignId : null,
    programId: metadata.programId || null,
    amount,
    currency: (invoice.currency || 'qar').toUpperCase(),
    donorName: metadata.anonymous === 'true' 
      ? null 
      : `${metadata.firstName || ''} ${metadata.lastName || ''}`.trim() || null,
    donorEmail: invoice.customer_email || null,
    isAnonymous: metadata.anonymous === 'true',
    isRecurring: true,
    paymentRef: invoice.payment_intent as string || invoice.id,
    status: 'completed',
    donationType: metadata.zakatEligible === 'true' ? 'zakat' : 'general',
    message: metadata.message || null,
  };
  
  // Create donation record for recurring payment
  await createDonationRecord(donationData);
  
  // Update campaign total if campaign-specific donation
  if (donationData.campaignId) {
    await updateCampaignRaisedAmount(donationData.campaignId, amount);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    // Development mode: Skip signature verification if webhook secret is not set
    const isDevelopment = !webhookSecret || process.env.NODE_ENV === 'development';

    let event: Stripe.Event;

    if (isDevelopment && !signature) {
      // In development without webhook secret, parse the body directly
      console.log('⚠️  Development mode: Skipping webhook signature verification');
      event = JSON.parse(body) as Stripe.Event;
    } else {
      // Production: Always verify signature
      if (!signature) {
        return NextResponse.json(
          { error: 'Missing stripe-signature header' },
          { status: 400 }
        );
      }

      if (!webhookSecret) {
        return NextResponse.json(
          { error: 'Webhook secret not configured' },
          { status: 500 }
        );
      }

      try {
        event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json(
          { error: `Webhook Error: ${err.message}` },
          { status: 400 }
        );
      }
    }

    console.log(`📨 Received event: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('💳 Payment successful:', session.id);
        
        if (session.payment_status === 'paid') {
          await handleCheckoutCompleted(session);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('🔄 Recurring payment succeeded:', invoice.id);
        await handleInvoicePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('❌ Invoice payment failed:', invoice.id);
        // TODO: Send notification email to donor
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('📅 Subscription created:', subscription.id);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('📅 Subscription updated:', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Subscription cancelled:', subscription.id);
        // TODO: Update subscription status in database
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('✅ Payment intent succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('❌ Payment intent failed:', paymentIntent.id);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log('💸 Charge refunded:', charge.id);
        // TODO: Update donation status to 'refunded'
        break;
      }

      default:
        console.log(`ℹ️  Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
