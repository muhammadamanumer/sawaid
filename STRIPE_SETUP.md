# Stripe Payment Integration - Setup Guide

## Overview
This project integrates Stripe for secure payment processing, supporting both one-time donations and monthly recurring subscriptions.

## Features
- ✅ One-time donations
- ✅ Monthly recurring subscriptions
- ✅ Multiple currency support (USD, EUR, GBP)
- ✅ Campaign-specific donations
- ✅ Zakat-eligible donation tracking
- ✅ Anonymous donation option
- ✅ Secure Stripe Checkout
- ✅ Webhook handling for payment events
- ✅ Success/Cancel pages
- ✅ Bilingual support (Arabic/English)

## Setup Instructions

### 1. Get Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or sign in
3. Navigate to **Developers → API Keys**
4. Copy your **Publishable Key** (starts with `pk_test_` for test mode)
5. Copy your **Secret Key** (starts with `sk_test_` for test mode)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Webhook Secret (we'll set this up next)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Set Up Webhook Endpoint

> **📘 For Vercel Deployment**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment and webhook setup instructions.

#### For Local Development:

1. Install Stripe CLI:
   ```bash
   # Windows (using Scoop)
   scoop install stripe
   
   # macOS
   brew install stripe/stripe-cli/stripe
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. Copy the webhook signing secret that appears (starts with `whsec_`)
5. Add it to your `.env.local` file

#### For Production:

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add Endpoint**
3. Set the endpoint URL to: `https://your-domain.com/api/stripe/webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing Secret** and add it to your production environment variables

### 4. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In another terminal, start the Stripe webhook listener:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. Visit `http://localhost:3000/donate`

4. Fill in the donation form and use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC
   - Use any postal code

5. Complete the checkout and verify:
   - You're redirected to `/donate/success`
   - Webhook events appear in the Stripe CLI terminal
   - Session details are displayed correctly

## API Routes

### POST `/api/stripe/checkout`
Creates a Stripe Checkout session for donation processing.

**Request Body:**
```typescript
{
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
```

**Response:**
```typescript
{
  sessionId: string;
  url: string;
}
```

### POST `/api/stripe/webhook`
Handles Stripe webhook events for payment processing.

**Events Handled:**
- `checkout.session.completed` - Payment successful
- `customer.subscription.*` - Subscription lifecycle
- `invoice.payment_*` - Recurring payment status
- `payment_intent.*` - Payment intent status

### GET `/api/stripe/session?session_id={id}`
Retrieves checkout session details for confirmation page.

**Response:**
```typescript
{
  session: {
    id: string;
    amount_total: number;
    currency: string;
    customer_email: string;
    payment_status: string;
    metadata: object;
  }
}
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── stripe/
│   │       ├── checkout/route.ts    # Create checkout sessions
│   │       ├── webhook/route.ts     # Handle webhooks
│   │       └── session/route.ts     # Retrieve session details
│   └── donate/
│       ├── page.tsx                 # Main donation page
│       ├── success/page.tsx         # Success confirmation
│       └── cancel/page.tsx          # Cancellation page
├── components/
│   └── donate-form.tsx              # Donation form with Stripe integration
└── lib/
    ├── stripe.ts                    # Stripe client configuration
    └── stripe-types.ts              # TypeScript interfaces
```

## Next Steps

### Database Integration (Recommended)
To persist donation data, you should:

1. **Set up Supabase** (recommended for this project):
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create donations table**:
   ```sql
   CREATE TABLE donations (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     stripe_session_id VARCHAR(255) UNIQUE NOT NULL,
     amount DECIMAL(10, 2) NOT NULL,
     currency VARCHAR(3) NOT NULL,
     donation_type VARCHAR(20) NOT NULL,
     campaign_id VARCHAR(100),
     zakat_eligible BOOLEAN DEFAULT false,
     anonymous BOOLEAN DEFAULT false,
     first_name VARCHAR(100),
     last_name VARCHAR(100),
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50),
     message TEXT,
     payment_status VARCHAR(50),
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Update webhook handler** to save donations:
   - In `src/app/api/stripe/webhook/route.ts`
   - Add database inserts in the event handlers
   - Store donation records when payments succeed

### Email Notifications
Consider integrating an email service:

- **Resend** (recommended for Next.js)
- **SendGrid**
- **Amazon SES**

Send confirmation emails in the webhook handler after successful payments.

## Security Checklist

- ✅ Never expose `STRIPE_SECRET_KEY` in client-side code
- ✅ Always verify webhook signatures
- ✅ Use HTTPS in production
- ✅ Validate amounts on the server side
- ✅ Implement rate limiting for API routes
- ✅ Log all payment events for auditing
- ✅ Handle errors gracefully
- ✅ Test with various scenarios (success, failure, cancellation)

## Troubleshooting

### Webhook Not Receiving Events
- Verify the webhook secret is correct
- Check that Stripe CLI is running (`stripe listen`)
- Ensure the endpoint URL is accessible
- Check firewall/network settings

### Checkout Session Creation Fails
- Verify API keys are correct
- Check amount is in cents (multiply by 100)
- Ensure currency is lowercase
- Validate all required fields are provided

### Payment Stays in Processing
- Check webhook endpoint is reachable
- Verify webhook secret matches
- Look for errors in webhook handler logs
- Test with Stripe CLI webhook forwarding

## Support

For issues or questions:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)
- [Project GitHub Issues](#)

## License

This integration follows the main project license.
