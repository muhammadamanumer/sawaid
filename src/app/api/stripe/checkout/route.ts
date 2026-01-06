import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { DonationFormData } from '@/lib/stripe-types';

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
      zakatEligible,
      anonymous,
      message,
    } = body;

    // Validate required fields
    if (!amount || !currency || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe expects amounts in smallest currency unit)
    const amountInCents = Math.round(amount * 100);
    const stripeClient = getStripe();

    // Create checkout session for one-time donations
    if (donationType === 'one-time') {
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: campaignId 
                  ? `Donation to ${campaignId}` 
                  : 'General Donation - Sawaed Al-Islah',
                description: zakatEligible 
                  ? 'Zakat-eligible donation' 
                  : 'General donation',
                images: ['https://your-domain.com/logo.png'], // Replace with actual logo URL
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.nextUrl.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.nextUrl.origin}/donate/cancel`,
        customer_email: email,
        metadata: {
          donationType,
          campaignId: campaignId || 'general',
          zakatEligible: zakatEligible?.toString() || 'false',
          anonymous: anonymous?.toString() || 'false',
          firstName,
          lastName,
          phone: phone || '',
          message: message || '',
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
        name: campaignId 
          ? `Monthly Donation to ${campaignId}` 
          : 'Monthly Donation - Sawaed Al-Islah',
        description: zakatEligible 
          ? 'Monthly Zakat-eligible donation' 
          : 'Monthly general donation',
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
        success_url: `${req.nextUrl.origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.nextUrl.origin}/donate/cancel`,
        customer: customer.id,
        metadata: {
          donationType,
          campaignId: campaignId || 'general',
          zakatEligible: zakatEligible?.toString() || 'false',
          anonymous: anonymous?.toString() || 'false',
          firstName,
          lastName,
          phone: phone || '',
          message: message || '',
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
