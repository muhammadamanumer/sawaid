import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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

      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json(
          { error: `Webhook Error: ${err.message}` },
          { status: 400 }
        );
      }
    }

    // SIMPLIFIED: Only handle the most important events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // TODO: Save one-time donation to your database
        console.log('✅ Payment received:', {
          amount: session.amount_total,
          email: session.customer_email,
          metadata: session.metadata,
        });
        
        // TODO: Send confirmation email
        
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // This handles MONTHLY RECURRING payments
        // Without this, you won't know when monthly donations are charged
        console.log('✅ Recurring payment received:', {
          amount: invoice.amount_paid,
          customer: invoice.customer,
          invoice_id: invoice.id,
        });
        
        // TODO: Save recurring donation to database
        // TODO: Send receipt email
        
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // IMPORTANT: Notify donor their card was declined
        console.log('❌ Payment failed:', {
          customer: invoice.customer,
          invoice_id: invoice.id,
        });
        
        // TODO: Send "update payment method" email to donor
        
        break;
      }

      default:
        // Ignore other events
        console.log(`ℹ️  Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
