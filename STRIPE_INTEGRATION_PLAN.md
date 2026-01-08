# Stripe Integration Plan for Sawaid Platform

## Overview

This document provides a comprehensive plan for integrating Stripe payments with the Sawaid humanitarian organization platform, including how donation data flows between Stripe and Appwrite database.

---

## 1. Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │     │   Stripe API    │     │    Appwrite     │
│   (Next.js)     │────▶│   (Checkout)    │────▶│    Database     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        │ 1. User fills form    │                       │
        │ 2. POST /api/stripe/  │                       │
        │    checkout           │                       │
        │                       │                       │
        │ 3. Redirect to       │                       │
        │    Stripe Checkout    │                       │
        │                       │ 4. Payment processed  │
        │                       │                       │
        │                       │ 5. Webhook fires      │
        │                       │    (checkout.session  │
        │                       │     .completed)       │
        │                       │                       │
        │                       │ 6. Webhook handler    │
        │                       │    creates donation   │
        │                       │────────────────────▶  │
        │                       │                       │
        │ 7. Redirect to       │                       │
        │    success page       │                       │
        │◀──────────────────────│                       │
```

---

## 2. Environment Variables Setup

Add these to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_xxxxx          # Use sk_live_xxxxx for production
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx     # Use pk_live_xxxxx for production
STRIPE_WEBHOOK_SECRET=whsec_xxxxx        # From Stripe Dashboard > Webhooks

# Appwrite Configuration (Server-side)
APPWRITE_API_KEY=your_server_api_key     # API key with write permissions
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=sawaid
NEXT_PUBLIC_APPWRITE_DATABASE_ID=sawaid_db_test

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com  # For production redirects
```

---

## 3. Stripe Dashboard Setup

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification
3. Enable test mode for development

### Step 2: Get API Keys
1. Navigate to **Developers** > **API Keys**
2. Copy the **Publishable key** (pk_test_xxx)
3. Copy the **Secret key** (sk_test_xxx)

### Step 3: Configure Webhooks
1. Go to **Developers** > **Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL:
   - **Local**: `https://your-ngrok-url.ngrok.io/api/stripe/webhook`
   - **Production**: `https://your-domain.com/api/stripe/webhook`
4. Select events to listen:
   - `checkout.session.completed` (Required)
   - `invoice.payment_succeeded` (For recurring)
   - `invoice.payment_failed` (For failed recurring)
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `charge.refunded`
5. Copy the **Signing secret** (whsec_xxx)

---

## 4. Data Flow & Database Mapping

### 4.1 Donation Form → Stripe Checkout

When a user submits the donation form, the following data is sent:

```typescript
interface DonationFormData {
  amount: number;           // e.g., 100
  currency: string;         // e.g., "qar"
  donationType: string;     // "one-time" | "monthly"
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  campaignId?: string;      // Appwrite campaign document ID
  programId?: string;       // Appwrite program document ID
  zakatEligible: boolean;
  anonymous: boolean;
  message?: string;
}
```

### 4.2 Stripe Metadata Storage

All donation data is stored in Stripe checkout session metadata:

```typescript
metadata: {
  donationType: "one-time",
  campaignId: "abc123",           // Appwrite campaign ID
  programId: "",                   // Optional
  zakatEligible: "true",
  anonymous: "false",
  firstName: "John",
  lastName: "Doe",
  phone: "+1234567890",
  message: "Keep up the good work!"
}
```

### 4.3 Webhook → Appwrite Donation Record

When payment succeeds, webhook creates this record:

```typescript
// Appwrite donations collection document
{
  campaignId: "abc123",            // Links to campaign
  programId: null,
  amount: 100,
  currency: "QAR",
  donorName: "John Doe",           // null if anonymous
  donorEmail: "john@example.com",
  isAnonymous: false,
  isRecurring: false,
  paymentRef: "pi_xxx",            // Stripe payment intent ID
  status: "completed",
  donationType: "zakat",           // "general" | "zakat" | "sadaqah"
  message: "Keep up the good work!",
  $createdAt: "2024-01-15T10:30:00Z"  // Auto-generated
}
```

### 4.4 Campaign Total Update

After donation record is created, the webhook also updates the campaign:

```typescript
// Update campaign document
{
  raisedAmount: previousAmount + donationAmount
}
```

---

## 5. Admin Dashboard Data Access

### 5.1 Viewing All Donations

Admins can query the donations collection:

```typescript
// Query all donations
const donations = await databases.listDocuments(
  DATABASE_ID,
  'donations',
  [
    Query.orderDesc('$createdAt'),
    Query.limit(100)
  ]
);

// Each donation includes:
// - campaignId: Link to which campaign received the donation
// - donorName/donorEmail: Donor information
// - amount/currency: Donation amount
// - status: pending/completed/failed/refunded
// - paymentRef: Stripe reference for cross-checking
```

### 5.2 Campaign-Specific Donations

```typescript
// Get donations for a specific campaign
const campaignDonations = await databases.listDocuments(
  DATABASE_ID,
  'donations',
  [
    Query.equal('campaignId', 'campaign_abc123'),
    Query.equal('status', 'completed'),
    Query.orderDesc('$createdAt')
  ]
);
```

### 5.3 Donation Statistics

```typescript
// Calculate total donations for a campaign
const stats = campaignDonations.reduce((acc, donation) => ({
  total: acc.total + donation.amount,
  count: acc.count + 1,
  avgAmount: (acc.total + donation.amount) / (acc.count + 1)
}), { total: 0, count: 0, avgAmount: 0 });
```

### 5.4 Export Donations (CSV)

```typescript
// Generate CSV for accounting
const csvData = donations.documents.map(d => ({
  Date: new Date(d.$createdAt).toLocaleDateString(),
  Campaign: getCampaignName(d.campaignId),
  DonorName: d.isAnonymous ? 'Anonymous' : d.donorName,
  Email: d.donorEmail,
  Amount: `${d.currency} ${d.amount}`,
  Type: d.donationType,
  Status: d.status,
  PaymentRef: d.paymentRef
}));
```

---

## 6. Testing in Test Mode

### 6.1 Test Card Numbers

Use these Stripe test cards:

| Card Number | Description |
|------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |
| 4000 0025 0000 3155 | Requires 3D Secure |

**Test Details:**
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC (e.g., 123)
- Any billing postal code

### 6.2 Local Webhook Testing with Stripe CLI

1. Install Stripe CLI:
```bash
# Windows (Scoop)
scoop install stripe

# macOS
brew install stripe/stripe-cli/stripe
```

2. Login to Stripe:
```bash
stripe login
```

3. Forward webhooks to local:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

4. Note the webhook signing secret (starts with `whsec_`)

5. Trigger test events:
```bash
# Test successful payment
stripe trigger checkout.session.completed

# Test subscription
stripe trigger customer.subscription.created
```

### 6.3 Manual Testing Flow

1. **Start dev server**: `npm run dev`
2. **Start webhook forwarding**: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
3. **Navigate to**: `http://localhost:3000/donate`
4. **Fill form** with test data
5. **Complete checkout** with test card
6. **Verify in terminal**: Webhook received and donation created
7. **Check Appwrite**: New donation document exists
8. **Check campaign**: raisedAmount updated

---

## 7. Production Deployment Checklist

### 7.1 Before Going Live

- [ ] Switch to **live API keys** (`sk_live_xxx`, `pk_live_xxx`)
- [ ] Create **production webhook** in Stripe Dashboard
- [ ] Update `STRIPE_WEBHOOK_SECRET` with production secret
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Test complete flow with real card (small amount)
- [ ] Verify donation appears in Appwrite
- [ ] Verify campaign total updates

### 7.2 Webhook Endpoint Security

Ensure your webhook endpoint:
- Verifies Stripe signature
- Returns 200 OK quickly (process async if needed)
- Handles duplicate events idempotently
- Logs all events for debugging

### 7.3 Error Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor webhook failures in Stripe Dashboard
- Set up alerts for failed payments

---

## 8. Recurring Donations Flow

### 8.1 Initial Subscription

1. User selects "Monthly" donation
2. Checkout creates Stripe Subscription
3. `checkout.session.completed` fires → first donation recorded
4. Subscription active

### 8.2 Monthly Charges

1. Stripe automatically charges on anniversary
2. `invoice.payment_succeeded` fires
3. Webhook creates new donation record
4. Campaign total updated

### 8.3 Failed Payment Handling

1. `invoice.payment_failed` fires
2. Send notification email to donor
3. Stripe retries payment (configurable)

### 8.4 Subscription Cancellation

1. User cancels or payment fails permanently
2. `customer.subscription.deleted` fires
3. Mark subscription as cancelled in database

---

## 9. Admin Dashboard Features (Future)

### 9.1 Donation Management Page

```
┌─────────────────────────────────────────────────────────────┐
│ Donations Dashboard                                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Total Raised    │  This Month    │  Active Donors          │
│  QAR 1,234,567   │  QAR 45,000    │  2,456                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Recent Donations                                             │
├─────────────────────────────────────────────────────────────┤
│ Date       │ Donor        │ Campaign      │ Amount │ Status │
│ 2024-01-15 │ John Doe     │ Clean Water   │ QAR 500│ ✓      │
│ 2024-01-14 │ Anonymous    │ Education     │ QAR 200│ ✓      │
│ 2024-01-14 │ Sarah Smith  │ General       │ QAR 100│ ✓      │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Campaign Performance

```
┌─────────────────────────────────────────────────────────────┐
│ Campaign: Clean Water Initiative                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Goal: QAR 100,000    Raised: QAR 75,000    Progress: 75%   │
│  ████████████████████████░░░░░░░░                            │
│                                                              │
│  Donors: 156    Avg Donation: QAR 480    Recurring: 23%     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Top Donors                                                   │
│ 1. ABC Corporation - QAR 10,000                              │
│ 2. Anonymous - QAR 5,000                                     │
│ 3. Ahmed Al-Rashid - QAR 3,000                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Security Considerations

### 10.1 API Key Management

- **Never** expose `STRIPE_SECRET_KEY` to client
- Use environment variables only
- Rotate keys periodically

### 10.2 Webhook Security

- Always verify webhook signatures in production
- Use HTTPS only
- Validate all metadata before processing

### 10.3 PCI Compliance

- Stripe handles all card data (PCI DSS compliant)
- Never store card numbers in your database
- Use Stripe Checkout for maximum security

---

## 11. Files Modified/Created

### API Routes
- `src/app/api/stripe/checkout/route.ts` - Creates checkout sessions
- `src/app/api/stripe/webhook/route.ts` - Handles Stripe events
- `src/app/api/stripe/session/route.ts` - Retrieves session details

### Components
- `src/components/donate-form.tsx` - Donation form with campaign selection
- `src/app/donate/donate-client.tsx` - Donate page client component

### Types
- `src/lib/stripe-types.ts` - Stripe-related TypeScript types

### Services
- `src/services/donations.ts` - Donation CRUD operations

---

## 12. Quick Reference

### Test the Integration

```bash
# 1. Start dev server
npm run dev

# 2. Start Stripe CLI (in another terminal)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 3. Make a test donation at http://localhost:3000/donate

# 4. Verify webhook received in Stripe CLI output

# 5. Check Appwrite console for new donation document
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Webhook not received | Check Stripe CLI is running, URL is correct |
| Signature verification failed | Check STRIPE_WEBHOOK_SECRET is correct |
| Donation not saved | Check Appwrite API key has write permissions |
| Campaign not updated | Check campaignId is valid document ID |

---

## Summary

This integration provides:

1. **Secure payments** via Stripe Checkout
2. **Automatic donation recording** via webhooks
3. **Real-time campaign updates** when donations succeed
4. **Support for both one-time and recurring** donations
5. **Complete audit trail** with payment references
6. **Donor anonymity option** respected throughout

The business/admin can view all donation data in Appwrite console or build a custom admin dashboard to:
- See all donations with filters
- Track which campaign received each donation
- Export data for accounting
- Monitor recurring subscriptions
- Generate reports

