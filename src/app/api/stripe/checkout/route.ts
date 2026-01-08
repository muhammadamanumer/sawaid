import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { DonationFormData } from '@/lib/stripe-types';

/**
 * ============================================================================
 * STRIPE CHECKOUT API
 * ============================================================================
 * 
 * Creates Stripe checkout sessions for one-time and recurring donations.
 * Stores all relevant metadata for Appwrite webhook processing.
 * ============================================================================
 */

// Lazy initialization to handle missing env variables during build
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

// Get the base URL for redirects
function getBaseUrl(req: NextRequest): string {
  // In production, use the configured domain
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Fallback to request origin
  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  try {
    const body: DonationFormData = await req.json();
    
    const {
      amount,
      currency,
      donationType,
      firstName,
      lastName,
      email,
      phone,
      campaignId,
      programId,
      zakatEligible,
      anonymous,
      message,
    } = body;

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!currency) {
      return NextResponse.json(
        { error: 'Currency is required' },
        { status: 400 }
      );
    }

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);
    const stripeClient = getStripe();
    const baseUrl = getBaseUrl(req);

    // Determine product name based on campaign
    const productName = campaignId && campaignId !== 'general'
      ? `Donation - Campaign ${campaignId}`
      : 'General Donation - Sawaed Al-Islah';

    const productDescription = zakatEligible 
      ? 'Zakat-eligible donation' 
      : 'General donation';

    // Common metadata for both one-time and subscription
    const metadata = {
      donationType: donationType || 'one-time',
      campaignId: campaignId || 'general',
      programId: programId || '',
      zakatEligible: zakatEligible?.toString() || 'false',
      anonymous: anonymous?.toString() || 'false',
      firstName,
      lastName,
      phone: phone || '',
      message: message || '',
    };

    // Create checkout session for one-time donations
    if (donationType === 'one-time') {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: productName,
                description: productDescription,
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate/cancel`,
        customer_email: email,
        metadata,
        payment_intent_data: {
          metadata, // Also store metadata on payment intent
        },
      });

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
      });
    }

    // Create subscription for monthly donations
    if (donationType === 'monthly') {
      // First, create or retrieve customer
      const customers = await stripeClient.customers.list({
        email: email,
        limit: 1,
      });

      let customer: Stripe.Customer;
      
      if (customers.data.length > 0) {
        customer = customers.data[0];
        // Update customer metadata
        await stripeClient.customers.update(customer.id, {
          name: `${firstName} ${lastName}`,
          phone: phone || undefined,
          metadata: {
            firstName,
            lastName,
            anonymous: anonymous?.toString() || 'false',
          },
        });
      } else {
        customer = await stripeClient.customers.create({
          email,
          name: `${firstName} ${lastName}`,
          phone: phone || undefined,
          metadata: {
            firstName,
            lastName,
            anonymous: anonymous?.toString() || 'false',
          },
        });
      }

      // Create a product for recurring donation
      const product = await stripeClient.products.create({
        name: `Monthly ${productName}`,
        description: `Monthly ${productDescription}`,
        metadata: {
          campaignId: campaignId || 'general',
          zakatEligible: zakatEligible?.toString() || 'false',
        },
      });

      // Create a price for the product
      const price = await stripeClient.prices.create({
        product: product.id,
        unit_amount: amountInCents,
        currency: currency.toLowerCase(),
        recurring: {
          interval: 'month',
        },
      });

      // Create checkout session for subscription
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${baseUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/donate/cancel`,
        customer: customer.id,
        metadata,
        subscription_data: {
          metadata, // Store metadata on subscription for recurring payment processing
        },
      });

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
      });
    }

    return NextResponse.json(
      { error: 'Invalid donation type' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
