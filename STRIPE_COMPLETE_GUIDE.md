# Complete Stripe + Appwrite Integration Guide for Sawaid

## 📋 Executive Summary

This guide provides a **production-grade** implementation for recording Stripe donations directly into your Appwrite database. Since you're using Next.js with Appwrite as your Backend-as-a-Service (BaaS), all payment processing happens through:

1. **Next.js API Routes** - Server-side endpoints for Stripe operations
2. **Stripe Checkout** - Hosted payment page (PCI compliant)
3. **Stripe Webhooks** - Server-to-server callbacks for reliable event processing
4. **Appwrite Server SDK** - Server-side database operations with API key

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              SAWAID DONATION FLOW                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────┐    ┌──────────────────┐    ┌─────────────────────────────┐   │
│   │   Frontend   │    │   Next.js API    │    │        Stripe               │   │
│   │  (React UI)  │───▶│     Routes       │───▶│    (Checkout/Webhooks)      │   │
│   └──────────────┘    └──────────────────┘    └─────────────────────────────┘   │
│          │                    │                          │                       │
│          │                    │                          │                       │
│          ▼                    │                          ▼                       │
│   ┌──────────────┐           │                 ┌─────────────────────────────┐  │
│   │  User fills  │           │                 │  Stripe processes payment   │  │
│   │ donate form  │           │                 │  & fires webhook events     │  │
│   └──────────────┘           │                 └─────────────────────────────┘  │
│                              │                          │                       │
│                              ▼                          ▼                       │
│                    ┌──────────────────┐    ┌─────────────────────────────┐      │
│                    │  /api/stripe/    │◀───│  checkout.session.completed │      │
│                    │    webhook       │    │  invoice.payment_succeeded  │      │
│                    └──────────────────┘    └─────────────────────────────┘      │
│                              │                                                   │
│                              ▼                                                   │
│                    ┌──────────────────┐                                         │
│                    │    Appwrite      │                                         │
│                    │   (node-appwrite │                                         │
│                    │    with API Key) │                                         │
│                    └──────────────────┘                                         │
│                              │                                                   │
│                    ┌─────────┴─────────┐                                        │
│                    ▼                   ▼                                        │
│            ┌──────────────┐    ┌──────────────┐                                 │
│            │  donations   │    │  campaigns   │                                 │
│            │  collection  │    │ (update      │                                 │
│            │              │    │ raisedAmount)│                                 │
│            └──────────────┘    └──────────────┘                                 │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 Why This Architecture is Production-Grade

### 1. **Reliability with Webhooks**
- Webhooks are **server-to-server** - they work even if user closes browser after payment
- Stripe retries failed webhooks automatically (up to 72 hours)
- Signature verification prevents fake webhook attacks

### 2. **Security**
- Stripe Checkout handles all card data (PCI DSS compliant)
- Server-side API key for Appwrite (never exposed to client)
- Webhook signature verification in production

### 3. **Cost Optimization**
- No separate backend server needed (Vercel/Next.js handles API routes)
- Appwrite handles database operations at scale
- Single source of truth for donation data

### 4. **Idempotency**
- Each donation is linked to a unique `paymentRef` (Stripe payment intent ID)
- Prevents duplicate records if webhooks retry

---

## ⚙️ Environment Variables Setup

Create or update your `.env.local` file with these variables:

```env
# ═══════════════════════════════════════════════════════════════════════════════
# STRIPE CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Get from: https://dashboard.stripe.com/webhooks (after creating endpoint)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ═══════════════════════════════════════════════════════════════════════════════
# APPWRITE CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=sawaid
NEXT_PUBLIC_APPWRITE_DATABASE_ID=sawaid_db_test

# SERVER-SIDE API KEY (with write permissions to donations & campaigns)
# Create in Appwrite Console: Settings > API Keys
# Required Scopes: databases.read, databases.write, documents.read, documents.write
APPWRITE_API_KEY=standard_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ═══════════════════════════════════════════════════════════════════════════════
# SITE CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════
# Your production domain (used for Stripe redirects)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Creating Appwrite API Key

1. Go to your Appwrite Console
2. Navigate to **Settings** > **API Keys**
3. Click **Create API Key**
4. Name it: `Stripe Webhook Handler`
5. Select these scopes:
   - `databases.read`
   - `databases.write`
   - `documents.read`
   - `documents.write`
6. Copy the key to `APPWRITE_API_KEY`

---

## 🏪 Stripe Dashboard Setup

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete business verification for payouts
3. Enable **Test Mode** during development (toggle in top-right)

### Step 2: Get API Keys
1. Navigate to **Developers** → **API Keys**
2. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`

### Step 3: Configure Webhook Endpoint

#### For Production (Vercel/your-domain.com):
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
4. Select events:
   - ✅ `checkout.session.completed`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.deleted`
   - ✅ `charge.refunded`
5. Click **Add endpoint**
6. Click **Reveal** next to signing secret
7. Copy to `STRIPE_WEBHOOK_SECRET`

#### For Local Development:
Use Stripe CLI to forward webhooks to localhost:

```bash
# Install Stripe CLI
# Windows (with Scoop)
scoop install stripe

# macOS
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:9002/api/stripe/webhook
```

The CLI will display a webhook signing secret (`whsec_...`) - use this for local testing.

---

## 📊 Data Flow: Donation Form → Appwrite Database

### Step 1: User Submits Donation Form

The form collects:
```typescript
{
  amount: 500,              // Amount in currency units
  currency: 'qar',          // QAR, USD, EUR, GBP
  donationType: 'one-time', // or 'monthly'
  firstName: 'Ahmed',
  lastName: 'Al-Rashid',
  email: 'ahmed@example.com',
  phone: '+974 1234 5678',
  campaignId: 'abc123',     // Appwrite document ID (or 'general')
  zakatEligible: true,
  anonymous: false,
  message: 'For education'
}
```

### Step 2: Checkout Session Created

Your API route (`/api/stripe/checkout`) creates a Stripe Checkout session with metadata:

```typescript
metadata: {
  donationType: 'one-time',
  campaignId: 'abc123',
  programId: '',
  zakatEligible: 'true',
  anonymous: 'false',
  firstName: 'Ahmed',
  lastName: 'Al-Rashid',
  phone: '+974 1234 5678',
  message: 'For education'
}
```

### Step 3: User Completes Payment

User is redirected to Stripe's hosted checkout page and completes payment.

### Step 4: Webhook Receives Event

Stripe sends `checkout.session.completed` event to `/api/stripe/webhook`:

```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_xxx",
      "amount_total": 50000,  // 500.00 QAR in cents
      "currency": "qar",
      "customer_email": "ahmed@example.com",
      "payment_intent": "pi_xxx",
      "payment_status": "paid",
      "metadata": {
        "donationType": "one-time",
        "campaignId": "abc123",
        "firstName": "Ahmed",
        "lastName": "Al-Rashid",
        ...
      }
    }
  }
}
```

### Step 5: Webhook Handler Creates Appwrite Record

The webhook handler:
1. Verifies Stripe signature (production)
2. Extracts donation data from metadata
3. Creates document in `donations` collection
4. Updates `raisedAmount` on the campaign

**Resulting Appwrite Document:**
```javascript
{
  $id: 'unique_generated_id',
  $createdAt: '2024-01-15T10:30:00.000Z',
  campaignId: 'abc123',
  programId: null,
  amount: 500,
  currency: 'QAR',
  donorName: 'Ahmed Al-Rashid',  // null if anonymous
  donorEmail: 'ahmed@example.com',
  isAnonymous: false,
  isRecurring: false,
  paymentRef: 'pi_xxx',  // Stripe payment intent ID
  status: 'completed',
  donationType: 'zakat',  // 'zakat' or 'general'
  message: 'For education'
}
```

---

## 🔄 Recurring Donations Flow

### Monthly Subscriptions

1. **First Payment**: `checkout.session.completed` → Creates donation record
2. **Subsequent Payments**: `invoice.payment_succeeded` → Creates new donation record each month
3. **Cancellation**: `customer.subscription.deleted` → Can update subscription status

Each monthly charge creates a **new donation record** with:
- `isRecurring: true`
- `paymentRef`: The invoice payment intent ID

---

## 🧪 Testing Guide

### Test Card Numbers

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires 3D Secure authentication |

**For all test cards:**
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any valid postal code

### Local Testing Steps

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Start Stripe CLI (new terminal):**
   ```bash
   stripe listen --forward-to localhost:9002/api/stripe/webhook
   ```
   Copy the `whsec_...` secret and update `.env.local`

3. **Make a test donation:**
   - Go to `http://localhost:9002/donate`
   - Fill form with test data
   - Use test card `4242 4242 4242 4242`

4. **Verify in CLI output:**
   ```
   2024-01-15 10:30:00   --> checkout.session.completed [evt_xxx]
   2024-01-15 10:30:01  <--  [200] POST http://localhost:9002/api/stripe/webhook
   ```

5. **Check Appwrite Console:**
   - Navigate to your database → donations collection
   - Verify new document was created

6. **Check campaign update:**
   - If campaign-specific donation, verify `raisedAmount` increased

### Trigger Test Events

```bash
# Simulate successful checkout
stripe trigger checkout.session.completed

# Simulate recurring payment
stripe trigger invoice.payment_succeeded

# Simulate refund
stripe trigger charge.refunded
```

---

## 🚀 Production Deployment Checklist

### Before Going Live:

- [ ] Switch from `sk_test_*` to `sk_live_*` keys
- [ ] Switch from `pk_test_*` to `pk_live_*` keys
- [ ] Create **production webhook** in Stripe Dashboard
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production secret
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Verify `APPWRITE_API_KEY` has correct permissions
- [ ] Test with a real small donation ($1)
- [ ] Verify donation appears in Appwrite
- [ ] Verify campaign `raisedAmount` updates correctly
- [ ] Set up monitoring/alerts for webhook failures

### Vercel Environment Variables:

In your Vercel project settings, add all environment variables:
1. Go to Project Settings → Environment Variables
2. Add each variable for **Production** environment
3. Redeploy after adding variables

---

## 📈 Viewing Donation Data

### In Appwrite Console

1. Go to Appwrite Console → Databases → `sawaid_db_test`
2. Open `donations` collection
3. Use filters to view:
   - By campaign: Filter `campaignId = 'xxx'`
   - By status: Filter `status = 'completed'`
   - By date: Sort by `$createdAt`

### Programmatically (for Admin Dashboard)

```typescript
import { Query } from 'appwrite';
import { tablesDB, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';

// Get all completed donations
const donations = await tablesDB.listRows({
  databaseId: DATABASE_ID,
  tableId: COLLECTIONS.DONATIONS,
  queries: [
    Query.equal('status', 'completed'),
    Query.orderDesc('$createdAt'),
    Query.limit(100),
  ],
});

// Get donations for specific campaign
const campaignDonations = await tablesDB.listRows({
  databaseId: DATABASE_ID,
  tableId: COLLECTIONS.DONATIONS,
  queries: [
    Query.equal('campaignId', 'abc123'),
    Query.equal('status', 'completed'),
    Query.orderDesc('$createdAt'),
  ],
});

// Calculate total raised
const total = donations.rows.reduce((sum, d) => sum + d.amount, 0);
```

---

## 🔐 Security Best Practices

### 1. Never Expose Secret Keys
- `STRIPE_SECRET_KEY` - Server-side only
- `APPWRITE_API_KEY` - Server-side only
- Only `NEXT_PUBLIC_*` keys are safe for client

### 2. Webhook Signature Verification
Always verify in production (already implemented):
```typescript
event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
```

### 3. Idempotency
Check for existing donation before creating:
```typescript
// Prevent duplicates by checking paymentRef
const existing = await getDonationByPaymentRef(paymentRef);
if (existing) {
  console.log('Donation already recorded, skipping');
  return;
}
```

### 4. Input Validation
Validate all form inputs before creating checkout session.

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Webhook not received | Check Stripe CLI is running, endpoint URL is correct |
| "Signature verification failed" | Update `STRIPE_WEBHOOK_SECRET` with correct value |
| Donation not saved | Check Appwrite API key has write permissions |
| Campaign not updated | Verify `campaignId` is a valid Appwrite document ID |
| 500 error on webhook | Check server logs, ensure all env vars are set |
| Duplicate donations | Implement idempotency check with `paymentRef` |

---

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       └── stripe/
│           ├── checkout/
│           │   └── route.ts    # Creates checkout sessions
│           ├── webhook/
│           │   └── route.ts    # Handles Stripe events → Appwrite
│           └── session/
│               └── route.ts    # Retrieves session details
├── components/
│   └── donate-form.tsx         # Donation form UI
├── lib/
│   ├── appwrite.ts             # Client-side Appwrite config
│   ├── appwrite-server.ts      # Server-side Appwrite with API key
│   ├── stripe.ts               # Client-side Stripe loader
│   └── stripe-types.ts         # TypeScript types
└── services/
    └── donations.ts            # Donation service functions
```

---

## 📞 Support

- **Stripe Documentation**: https://stripe.com/docs
- **Appwrite Documentation**: https://appwrite.io/docs
- **Stripe CLI Reference**: https://stripe.com/docs/stripe-cli

---

## Summary

Your integration is **already well-architected**! The key components are:

1. ✅ **Stripe Checkout** for secure payments
2. ✅ **Webhook handler** for reliable event processing
3. ✅ **Server-side Appwrite SDK** with API key
4. ✅ **Metadata flow** from form → Stripe → Appwrite

The main improvements I'll make to your code:
1. Add idempotency checks to prevent duplicate donations
2. Create a dedicated server-side Appwrite client module
3. Add refund handling to update donation status
4. Improve error handling and logging
