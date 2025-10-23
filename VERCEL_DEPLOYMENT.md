# Vercel Deployment Guide for Stripe Integration

## Quick Deployment Steps

### 1. Push Your Code to GitHub

```bash
git add .
git commit -m "Add Stripe payment integration"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New Project"**
4. Import your repository: `muhammadamanumer/sawaid`
5. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Click **"Deploy"**

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

### 3. Add Environment Variables to Vercel

After deployment, you need to add your Stripe keys:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_your_publishable_key_here
Environment: Production, Preview, Development

STRIPE_SECRET_KEY
Value: sk_test_your_secret_key_here
Environment: Production, Preview, Development

STRIPE_WEBHOOK_SECRET
Value: (we'll add this after webhook setup)
Environment: Production, Preview, Development

NEXT_PUBLIC_MAINTENANCE
Value: false
Environment: Production, Preview, Development
```

4. Click **"Save"** after adding each variable
5. **Important**: Redeploy your project after adding environment variables
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **"Redeploy"**

### 4. Set Up Stripe Webhook for Vercel

#### Get Your Vercel URL
After deployment, you'll get a URL like: `https://sawaid-xyz123.vercel.app`

#### Configure Webhook in Stripe Dashboard

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. Set the **Endpoint URL**: `https://your-vercel-url.vercel.app/api/stripe/webhook`
   - Example: `https://sawaid-xyz123.vercel.app/api/stripe/webhook`
4. Click **"Select events"**
5. Choose these events:
   - ✅ `checkout.session.completed`
   - ✅ `checkout.session.expired`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
6. Click **"Add endpoint"**
7. Copy the **Signing secret** (starts with `whsec_`)

#### Add Webhook Secret to Vercel

1. Go back to Vercel dashboard
2. Navigate to **Settings → Environment Variables**
3. Find `STRIPE_WEBHOOK_SECRET` and click **Edit**
4. Paste the webhook signing secret
5. Click **Save**
6. **Redeploy** your project again to apply the changes

### 5. Test Your Deployment

1. Visit your Vercel URL: `https://your-vercel-url.vercel.app/donate`
2. Fill out the donation form
3. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Any future expiry date (e.g., 12/34)
   - Any 3-digit CVC
4. Complete checkout and verify:
   - Redirected to success page
   - Donation details displayed correctly
   - Check Stripe Dashboard for the payment

### 6. Monitor Webhook Events

#### In Stripe Dashboard:
1. Go to [Developers → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click on your webhook endpoint
3. View the **"Requests"** tab to see:
   - Event delivery status
   - Response codes
   - Event payloads
   - Retry attempts

#### In Vercel Dashboard:
1. Go to your project
2. Navigate to **Deployments → Functions**
3. Click on `/api/stripe/webhook`
4. View logs and function invocations

### 7. Testing Without Webhook Secret (Development Mode)

If you deploy without setting `STRIPE_WEBHOOK_SECRET`, the webhook handler will run in **development mode**:
- ⚠️ Webhook signature verification is **bypassed**
- ✅ Events will still be processed
- ⚠️ **NOT recommended for production**

To enable development mode:
1. Simply don't add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables
2. The webhook will log: `⚠️ DEVELOPMENT MODE: Webhook signature verification bypassed`

## Custom Domain Setup (Optional)

### Add Custom Domain to Vercel

1. Go to **Settings → Domains**
2. Add your domain (e.g., `sawaid.org`)
3. Configure DNS records as shown by Vercel
4. Wait for DNS propagation (5-60 minutes)

### Update Stripe Webhook URL

After adding custom domain:
1. Go to Stripe Dashboard → Webhooks
2. Edit your webhook endpoint
3. Update URL to: `https://sawaid.org/api/stripe/webhook`
4. Save changes

## Environment-Specific Configuration

### For Preview Deployments (Branch Previews)

Vercel creates preview deployments for each branch/PR. To test these:

1. Keep using **test mode** Stripe keys
2. Create a separate webhook endpoint for previews:
   - URL: `https://sawaid-git-[branch]-[username].vercel.app/api/stripe/webhook`
   - Or use development mode (no webhook secret)

### For Production Deployments

When ready to accept real payments:

1. Switch to Stripe **live mode** keys:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```
2. Create production webhook endpoint with live keys
3. Update `STRIPE_WEBHOOK_SECRET` with production value
4. Redeploy to production

## Troubleshooting

### Deployment Fails

**Build Error**: Check Vercel deployment logs
```bash
vercel logs [deployment-url]
```

**Common Issues**:
- TypeScript errors: Run `npm run build` locally first
- Missing dependencies: Check `package.json`
- Environment variables: Ensure all required vars are set

### Webhook Not Working on Vercel

**Check These**:
1. ✅ Webhook URL is correct (must be full Vercel URL)
2. ✅ `STRIPE_WEBHOOK_SECRET` is set in Vercel
3. ✅ Project was redeployed after adding environment variables
4. ✅ Webhook endpoint is accessible (test with curl)

**Test Webhook**:
```bash
curl https://your-vercel-url.vercel.app/api/stripe/webhook
```
Should return: `{"error":"No signature found"}`

**View Logs**:
- Vercel Dashboard → Functions → `/api/stripe/webhook`
- Click on individual invocations to see errors

### Payments Work But Webhook Fails

1. Check Stripe Dashboard → Webhooks → Requests tab
2. Look for failed deliveries (red X)
3. Click on failed event to see error details
4. Common issues:
   - 500 error: Check Vercel function logs
   - Timeout: Function taking too long (>10 seconds)
   - 401/403: Webhook signature verification failing

### Environment Variables Not Working

After adding/changing environment variables:
1. Go to **Deployments** tab
2. Find latest deployment
3. Click three dots → **"Redeploy"**
4. Wait for redeployment to complete
5. Test again

## Vercel-Specific Considerations

### Function Timeout
- Free plan: 10 seconds
- Pro plan: 60 seconds
- Webhook handler should respond quickly

### Cold Starts
- First request after inactivity may be slower
- Subsequent requests are faster
- Not an issue for webhook delivery (Stripe retries)

### Logs Retention
- Free plan: Last 1 hour
- Pro plan: Longer retention
- Use external logging service for production

## Testing Checklist

Before going live:

- [ ] Test successful payment flow
- [ ] Test declined payment
- [ ] Test payment cancellation
- [ ] Verify success page displays correct info
- [ ] Check webhook events in Stripe Dashboard
- [ ] Test with different currencies (USD, EUR, GBP)
- [ ] Test one-time donations
- [ ] Test monthly subscriptions
- [ ] Verify emails are sent (if configured)
- [ ] Check database records (if configured)
- [ ] Test on mobile devices
- [ ] Test in different browsers

## Production Launch Checklist

- [ ] Switch to Stripe live mode keys
- [ ] Set up production webhook endpoint
- [ ] Configure custom domain
- [ ] Enable webhook signature verification
- [ ] Set up monitoring/alerts
- [ ] Configure email notifications
- [ ] Set up database backups
- [ ] Add error tracking (Sentry, etc.)
- [ ] Review security settings
- [ ] Test complete flow with real card (small amount)
- [ ] Document runbook for support team

## Useful Commands

```bash
# View recent deployments
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Check environment variables
vercel env ls

# Add environment variable via CLI
vercel env add STRIPE_SECRET_KEY

# Pull environment variables to local
vercel env pull .env.local

# Redeploy to production
vercel --prod

# Cancel a deployment
vercel cancel [deployment-url]
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Stripe webhook delivery logs
3. Review Vercel function logs
4. Test locally with same environment variables
5. Contact Vercel support (support@vercel.com)
6. Contact Stripe support (support@stripe.com)
