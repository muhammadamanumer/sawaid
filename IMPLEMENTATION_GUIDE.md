# Sawaid Platform - Implementation Guide

## Overview

This document provides a comprehensive guide for implementing the unified **Paths → Programs → Campaigns** hierarchy for the Sawaid humanitarian organization platform.

---

## 1. Entity Relationships Summary

### Key Finding: **Projects = Campaigns**

Per the requirements document: *"Projects/Campaigns: Individual fundraising campaigns linked to a Program."*

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATA HIERARCHY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   PATHS (4 main organizational tracks)                          │
│   ├── Education & Empowerment                                   │
│   ├── Sponsoring Reformers                                      │
│   ├── Educational Nurseries                                     │
│   └── General Reform Programs                                   │
│                        │                                        │
│                        │ 1:N                                    │
│                        ▼                                        │
│   PROGRAMS (specific programs within each path)                 │
│   ├── Scholarship Program → Education & Empowerment             │
│   ├── Skills Training Center → Education & Empowerment          │
│   ├── Community Leaders → Sponsoring Reformers                  │
│   └── etc.                                                      │
│                        │                                        │
│                        │ 1:N                                    │
│                        ▼                                        │
│   CAMPAIGNS (individual fundraising projects)                   │
│   ├── Emergency Food Drive → Emergency Relief (program)         │
│   ├── Clean Water for All → Community Development (program)     │
│   └── Education Support → Scholarship Program (program)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Files Modified

### Core Type Definitions
- [src/lib/types.ts](src/lib/types.ts) - Updated with comprehensive type definitions for all entities

### Data Layer
- [src/lib/data.ts](src/lib/data.ts) - New unified data structure with:
  - `pathsData[]` - Path entities
  - `programsData[]` - Program entities with `pathId` reference
  - `campaignsData[]` - Campaign entities with `programId` reference
  - Helper functions: `getProgramsByPathId()`, `getCampaignsByProgramId()`, etc.
  - Legacy exports maintained for backward compatibility

### Components
- [src/components/shared/zakat-badge.tsx](src/components/shared/zakat-badge.tsx) - New reusable Zakat eligibility component
- [src/components/campaign-card.tsx](src/components/campaign-card.tsx) - Updated to support both legacy and new data structures

### Documentation
- [APPWRITE_DATABASE_SCHEMA.md](APPWRITE_DATABASE_SCHEMA.md) - Complete Appwrite database schema

---

## 3. New Type Definitions

```typescript
// Core Types (src/lib/types.ts)

type Path = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  coverImageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  programs?: Program[];
};

type Program = {
  id: string;
  pathId: string;           // ← Links to Path
  slug: string;
  titleEn: string;
  titleAr: string;
  // ... other fields
  zakatSupported: boolean;  // ← Zakat eligibility
  campaigns?: Campaign[];
};

type Campaign = {
  id: string;
  programId?: string;       // ← Links to Program (optional)
  slug: string;
  titleEn: string;
  titleAr: string;
  goalAmount: number;
  raisedAmount: number;
  zakatSupported: boolean;  // ← Zakat eligibility
  isUrgent: boolean;
  isFeatured: boolean;
  // ... other fields
};
```

---

## 4. Using the New Data Structure

### Import and Use

```typescript
import { 
  pathsData, 
  programsData, 
  campaignsData,
  getProgramsByPathId,
  getCampaignsByProgramId,
  getPathWithDetails,
  getProgramWithCampaigns,
  getCampaignWithDetails
} from '@/lib/data';

// Get all programs for a path
const educationPrograms = getProgramsByPathId('path-1');

// Get all campaigns for a program
const scholarshipCampaigns = getCampaignsByProgramId('prog-1');

// Get full path details with nested programs and campaigns
const fullPath = getPathWithDetails('education-empowerment');

// Get program with its campaigns
const program = getProgramWithCampaigns('scholarship-program');

// Get campaign with linked program and path info
const campaign = getCampaignWithDetails('emergency-food-drive');
```

### Backward Compatibility

Legacy exports are maintained for existing code:

```typescript
// These still work (deprecated but functional)
import { paths, campaigns } from '@/lib/data';

// paths[] - Legacy nested structure
// campaigns[] - Legacy flat structure with goal/currentAmount
```

---

## 5. Zakat Badge Component

### Usage

```tsx
import { ZakatBadge, ZakatStamp } from '@/components/shared/zakat-badge';

// Standard badge (cards, lists)
<ZakatBadge supported={true} size="sm" />

// Large stamp (detail pages)
<ZakatStamp supported={campaign.zakatSupported} />
```

### Variants
- `default` - Filled background
- `outline` - Transparent with border
- `minimal` - Very subtle

### Sizes
- `sm` - Small (card headers)
- `md` - Medium (default)
- `lg` - Large (standalone)

---

## 6. Appwrite Database Setup

### Step-by-Step

1. **Create Appwrite Project**
   - Go to [cloud.appwrite.io](https://cloud.appwrite.io)
   - Create new project: "sawaid-platform"

2. **Create Database**
   - Database ID: `sawaid_db`

3. **Create Collections** (in order due to relationships)
   - `paths`
   - `programs`
   - `campaigns`
   - `donations`
   - `volunteers`
   - `sponsors`
   - `media_assets`
   - `posts`
   - `reports`
   - `contact_submissions`

4. **Add Attributes** per [APPWRITE_DATABASE_SCHEMA.md](APPWRITE_DATABASE_SCHEMA.md)

5. **Configure Permissions**
   ```
   Public Read: paths, programs, campaigns, media_assets, posts, reports
   Public Write (Create only): volunteers, sponsors, contact_submissions, donations
   Admin Full Access: All collections
   ```

6. **Create Indexes** for performance

---

## 7. API Routes to Implement

### Public (Read)

```
GET /api/paths                    → List active paths
GET /api/paths/[slug]             → Path with programs
GET /api/programs                 → List active programs  
GET /api/programs/[slug]          → Program with campaigns
GET /api/campaigns                → List active campaigns
GET /api/campaigns?featured=true  → Featured campaigns
GET /api/campaigns?zakat=true     → Zakat-eligible only
GET /api/campaigns/[slug]         → Campaign details
GET /api/media                    → Gallery assets
GET /api/posts                    → Published posts
GET /api/reports                  → Published reports
```

### Public (Forms)

```
POST /api/volunteers              → Submit application
POST /api/sponsors                → Register sponsor
POST /api/contact                 → Submit contact form
POST /api/donations/checkout      → Create Stripe session
```

---

## 8. Environment Variables

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key

# Database
NEXT_PUBLIC_APPWRITE_DATABASE_ID=sawaid_db

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Email (optional)
RESEND_API_KEY=re_...
```

---

## 9. Migration Checklist

### Phase 1: Static Data (Current)
- [x] Define unified types in `types.ts`
- [x] Create new data structure in `data.ts`
- [x] Maintain legacy exports for backward compatibility
- [x] Create ZakatBadge component
- [x] Update CampaignCard to support both structures

### Phase 2: Appwrite Integration
- [ ] Set up Appwrite project and database
- [ ] Create collections with schema from documentation
- [ ] Seed initial data from static files
- [ ] Create API routes to fetch from Appwrite
- [ ] Update pages to use API with static fallback

### Phase 3: Admin Panel (Separate Project)
- [ ] Create admin CRUD for all collections
- [ ] Implement Zakat toggle feature
- [ ] Add image upload to Appwrite Storage
- [ ] Create volunteer/sponsor management

### Phase 4: Donations
- [ ] Integrate Stripe checkout
- [ ] Implement webhooks to update raised amounts
- [ ] Add recurring donation support

---

## 10. Testing

### Manual Testing Checklist

1. **Paths Page** (`/paths`)
   - [ ] All 4 paths display correctly
   - [ ] Programs show under each path
   - [ ] Zakat badges display correctly
   - [ ] Links work

2. **Path Detail** (`/paths/[slug]`)
   - [ ] Path info displays
   - [ ] Programs list shows
   - [ ] Can navigate to programs

3. **Campaigns Page** (`/campaigns`)
   - [ ] All campaigns display
   - [ ] Progress bars work
   - [ ] Zakat badges show

4. **Campaign Detail** (`/campaigns/[slug]`)
   - [ ] Campaign info correct
   - [ ] Progress bar works
   - [ ] Donors list displays
   - [ ] Gallery works

5. **Arabic/RTL**
   - [ ] All content switches correctly
   - [ ] RTL layout works
   - [ ] Zakat badges show Arabic text

---

## 11. Summary

| Before | After |
|--------|-------|
| Campaigns standalone | Campaigns linked to Programs |
| Programs nested in Paths | Programs as separate entities with `pathId` |
| No relationship tracking | Full hierarchy: Path → Program → Campaign |
| Inconsistent Zakat display | Unified ZakatBadge component |
| Hardcoded data | Ready for Appwrite integration |

The codebase is now prepared for:
1. ✅ Unified data hierarchy
2. ✅ Backward compatibility during migration
3. ✅ Appwrite database integration
4. ✅ Admin panel CRUD operations
5. ✅ Zakat eligibility system
