# Appwrite Database Schema for Sawaid Platform

**Last Updated:** 11-Jan-2026 10:00 PM

## Overview

This document defines the complete database schema for the Sawaid humanitarian organization platform using **Appwrite** as the backend-as-a-service.

**Schema Version:** 2.0 (displayOrder removed from all collections)

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATA HIERARCHY                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌───────────────┐                                                              │
│   │    PATHS      │  (4 main tracks - Top Level)                                │
│   │   1 ────┐     │  Examples: Education & Empowerment, Sponsoring Reformers    │
│   └─────────│─────┘                                                              │
│             │                                                                    │
│             │ 1:N (One Path has Many Programs)                                   │
│             ▼                                                                    │
│   ┌───────────────┐                                                              │
│   │   PROGRAMS    │  (Specific programs within each Path)                       │
│   │   N ────┐     │  Examples: Scholarship Program, Skills Training Center      │
│   └─────────│─────┘                                                              │
│             │                                                                    │
│             │ 1:N (One Program has Many Campaigns/Projects)                      │
│             ▼                                                                    │
│   ┌───────────────┐                                                              │
│   │   CAMPAIGNS   │  (Individual fundraising campaigns = Projects)              │
│   │   (Projects)  │  Examples: Emergency Food Drive, Clean Water for All        │
│   │   N ────┐     │                                                              │
│   └─────────│─────┘                                                              │
│             │                                                                    │
│             │ 1:N (One Campaign receives Many Donations)                         │
│             ▼                                                                    │
│   ┌───────────────┐                                                              │
│   │   DONATIONS   │  (Individual donation transactions)                         │
│   └───────────────┘                                                              │
│                                                                                  │
│   ┌───────────────┐     ┌───────────────┐     ┌───────────────┐                 │
│   │  VOLUNTEERS   │     │ MEDIA_ASSETS  │     │    POSTS      │                 │
│   └───────────────┘     └───────────────┘     └───────────────┘                 │
│                                                                                  │
│   ┌───────────────┐     ┌───────────────┐                                       │
│   │   SPONSORS    │     │   REPORTS     │                                       │
│   └───────────────┘     └───────────────┘                                       │
│                                                                                  │
└───────────────────────────────────────────── ────────────────────────────────────┘
```

---

## Database Configuration

### Database ID: `sawaid_db`

---

## Collection Schemas

### 1. Paths Collection

**Collection ID:** `paths`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier (Appwrite auto-gen)    |
| `slug`            | string   | ✅        | -       | URL-friendly identifier (unique)         |
| `titleEn`         | string   | ✅        | -       | English title                            |
| `titleAr`         | string   | ✅        | -       | Arabic title                             |
| `descriptionEn`   | string   | ❌        | null    | English description                      |
| `descriptionAr`   | string   | ❌        | null    | Arabic description                       |
| `icon`            | string   | ✅        | -       | Icon identifier (e.g., "GraduationCap")  |
| `coverImageUrl`   | string   | ❌        | null    | Cover image URL                          |
| `isActive`        | boolean  | ❌        | true    | Whether path is visible                  |
| `$createdAt`      | datetime | Auto     | -       | Creation timestamp                       |
| `$updatedAt`      | datetime | Auto     | -       | Last update timestamp                    |

**Indexes:**
- `slug` (unique)
- `isActive` (for filtering active paths)

**Note:** Sorting can be done on the client-side using `$createdAt` or alphabetically by `titleEn`/`titleAr`.

---

### 2. Programs Collection

**Collection ID:** `programs`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `pathId`          | string   | ✅        | -       | Reference to parent Path                 |
| `slug`            | string   | ✅        | -       | URL-friendly identifier (unique)         |
| `titleEn`         | string   | ✅        | -       | English title                            |
| `titleAr`         | string   | ✅        | -       | Arabic title                             |
| `summaryEn`       | string   | ❌        | null    | Short English summary                    |
| `summaryAr`       | string   | ❌        | null    | Short Arabic summary                     |
| `descriptionEn`   | string   | ❌        | null    | Full English description                 |
| `descriptionAr`   | string   | ❌        | null    | Full Arabic description                  |
| `zakatSupported`  | boolean  | ❌        | false   | 🟢 Zakat eligibility stamp               |
| `coverImageUrl`   | string   | ❌        | null    | Cover image URL                          |
| `isActive`        | boolean  | ❌        | true    | Whether program is visible               |
| `$createdAt`      | datetime | Auto     | -       | Creation timestamp                       |
| `$updatedAt`      | datetime | Auto     | -       | Last update timestamp                    |

**Indexes:**
- `slug` (unique)
- `pathId` + `isActive` (for listing programs by path)
- `zakatSupported` (for filtering Zakat-eligible programs)

**Note:** Sorting can be done on the client-side using `$createdAt` or alphabetically by title.

**Relationships:**
- **Belongs to:** Path (via `pathId`)
- **Has many:** Campaigns

---

### 3. Campaigns Collection (Projects)

**Collection ID:** `campaigns`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `programId`       | string   | ❌        | null    | Reference to parent Program (optional)   |
| `slug`            | string   | ✅        | -       | URL-friendly identifier (unique)         |
| `titleEn`         | string   | ✅        | -       | English title                            |
| `titleAr`         | string   | ✅        | -       | Arabic title                             |
| `summaryEn`       | string   | ❌        | null    | Short English summary                    |
| `summaryAr`       | string   | ❌        | null    | Short Arabic summary                     |
| `descriptionEn`   | string   | ❌        | null    | Full English description                 |
| `descriptionAr`   | string   | ❌        | null    | Full Arabic description                  |
| `goalAmount`      | double   | ✅        | 0       | Fundraising goal (QAR)                   |
| `raisedAmount`    | double   | ❌        | 0       | Amount raised so far (QAR)               |
| `currency`        | string   | ❌        | "QAR"   | Currency code                            |
| `isUrgent`        | boolean  | ❌        | false   | Mark as urgent/time-sensitive            |
| `zakatSupported`  | boolean  | ❌        | false   | 🟢 Zakat eligibility stamp               |
| `coverImageUrl`   | string   | ❌        | null    | Main campaign image URL                  |
| `galleryUrls`     | string[] | ❌        | []      | Array of gallery image URLs              |
| `startDate`       | datetime | ❌        | null    | Campaign start date                      |
| `endDate`         | datetime | ❌        | null    | Campaign end date                        |
| `isFeatured`      | boolean  | ❌        | false   | Show on homepage featured section        |
| `isActive`        | boolean  | ❌        | true    | Whether campaign is visible              |
| `$createdAt`      | datetime | Auto     | -       | Creation timestamp                       |
| `$updatedAt`      | datetime | Auto     | -       | Last update timestamp                    |

**Indexes:**
- `slug` (unique)
- `programId` + `isActive` (for listing campaigns by program)
- `isUrgent` + `isActive` (for urgent campaigns)
- `isFeatured` + `isActive` (for homepage featured)
- `zakatSupported` (for filtering Zakat-eligible campaigns)

**Relationships:**
- **Belongs to (optional):** Program (via `programId`)
- **Has many:** Donations

**Note:** `programId` is optional to allow standalone campaigns that aren't tied to a specific program.

---

### 4. Donations Collection

**Collection ID:** `donations`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `campaignId`      | string   | ❌        | null    | Reference to Campaign (optional)         |
| `programId`       | string   | ❌        | null    | Reference to Program (if general)        |
| `amount`          | double   | ✅        | -       | Donation amount                          |
| `currency`        | string   | ❌        | "QAR"   | Currency code                            |
| `donorName`       | string   | ❌        | null    | Donor display name                       |
| `donorEmail`      | string   | ❌        | null    | Donor email                              |
| `isAnonymous`     | boolean  | ❌        | false   | Hide donor name publicly                 |
| `isRecurring`     | boolean  | ❌        | false   | Monthly recurring donation               |
| `paymentRef`      | string   | ❌        | null    | Stripe payment intent ID                 |
| `status`          | string   | ❌        | pending | pending, completed, failed, refunded     |
| `donationType`    | string   | ❌        | general | general, zakat, sadaqah, etc.            |
| `message`         | string   | ❌        | null    | Optional donor message                   |
| `$createdAt`      | datetime | Auto     | -       | Creation timestamp                       |

**Indexes:**
- `campaignId` + `status` (for campaign donation totals)
- `status` (for filtering by payment status)
- `donorEmail` (for donor history lookup)
- `$createdAt` (for recent donations)

---

### 5. Volunteers Collection

**Collection ID:** `volunteers`

| Attribute             | Type     | Required | Default | Description                              |
| --------------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`                 | string   | Auto     | -       | Unique identifier                        |
| `firstName`           | string   | ✅        | -       | Volunteer first name (max 64 chars)      |
| `lastName`            | string   | ✅        | -       | Volunteer last name (max 64 chars)       |
| `email`               | email    | ✅        | -       | Contact email                            |
| `phone`               | string   | ❌        | null    | Phone number (max 50 chars)              |
| `positionId`          | string   | ✅        | -       | Desired volunteer position (max 50)      |
| `country`             | string   | ✅        | -       | Country of residence (max 64 chars)      |
| `dateOfBirth`         | datetime | ✅        | -       | Date of birth (minimum age 16)           |
| `qualification`       | string   | ✅        | -       | Educational qualification (max 64 chars) |
| `currentOccupation`   | string   | ✅        | -       | Current occupation (max 64 chars)        |
| `weekyHours`          | double   | ✅        | -       | Available hours per week (min 0)         |
| `skills`              | string   | ❌        | null    | Skills/expertise (max 256 chars)         |
| `volunteerExperience` | string   | ❌        | null    | Previous volunteer experience (max 256)  |
| `message`             | string   | ❌        | null    | Application message (max 2000 chars)     |
| `$createdAt`          | datetime | Auto     | -       | Application date                         |

**Indexes:**
- `email` (unique, for duplicate prevention)
- `positionId` (for filtering by position)

**Notes:**
- Field name `weekyHours` in database is intentional (matches existing schema)
- Age validation: minimum 16 years old
- All text fields have maximum length constraints for data integrity

---

### 6. Sponsors Collection

**Collection ID:** `sponsors`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `organizationName`| string   | ✅        | -       | Sponsor organization name                |
| `contactName`     | string   | ✅        | -       | Primary contact person                   |
| `email`           | string   | ✅        | -       | Contact email                            |
| `phone`           | string   | ❌        | null    | Phone number                             |
| `website`         | string   | ❌        | null    | Organization website                     |
| `message`         | string   | ❌        | null    | Sponsorship interest message             |
| `sponsorType`     | string   | ❌        | general | general, corporate, individual           |
| `logoUrl`         | string   | ❌        | null    | Sponsor logo URL                         |
| `isDisplayed`     | boolean  | ❌        | false   | Show on website (after approval)         |
| `status`          | string   | ❌        | new     | new, approved, active, inactive          |
| `$createdAt`      | datetime | Auto     | -       | Application date                         |

---

### 7. Media Assets Collection

**Collection ID:** `media_assets`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `type`            | string   | ✅        | -       | image, video                             |
| `titleEn`         | string   | ❌        | null    | English title                            |
| `titleAr`         | string   | ❌        | null    | Arabic title                             |
| `url`             | string   | ✅        | -       | Full media URL                           |
| `thumbnailUrl`    | string   | ❌        | null    | Thumbnail URL (for videos)               |
| `altText`         | string   | ❌        | null    | Accessibility alt text                   |
| `tags`            | string[] | ❌        | []      | Categorization tags                      |
| `campaignId`      | string   | ❌        | null    | Link to specific campaign                |
| `duration`        | integer  | ❌        | null    | Video duration in seconds                |
| `fileSize`        | integer  | ❌        | null    | File size in bytes                       |
| `mimeType`        | string   | ❌        | null    | MIME type (e.g., video/mp4)              |
| `$createdAt`      | datetime | Auto     | -       | Upload date                              |

**Indexes:**
- `type` (for filtering by media type)
- `campaignId` (for campaign-specific gallery)

**Note:** Gallery items are sorted by `$createdAt` (newest first) on the client-side.

---

### 8. Posts Collection (News/Updates)

**Collection ID:** `posts`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `slug`            | string   | ✅        | -       | URL-friendly identifier (unique)         |
| `titleEn`         | string   | ✅        | -       | English title                            |
| `titleAr`         | string   | ✅        | -       | Arabic title                             |
| `excerptEn`       | string   | ❌        | null    | English summary/excerpt                  |
| `excerptAr`       | string   | ❌        | null    | Arabic summary/excerpt                   |
| `contentEn`       | string   | ❌        | null    | Full English content (Markdown/HTML)     |
| `contentAr`       | string   | ❌        | null    | Full Arabic content (Markdown/HTML)      |
| `coverImageUrl`   | string   | ❌        | null    | Featured image URL                       |
| `category`        | string   | ❌        | news    | news, update, story, challenge           |
| `authorName`      | string   | ❌        | null    | Author name                              |
| `publishedAt`     | datetime | ❌        | null    | Publication date                         |
| `isPublished`     | boolean  | ❌        | false   | Whether post is visible                  |
| `$createdAt`      | datetime | Auto     | -       | Creation date                            |

**Indexes:**
- `slug` (unique)
- `isPublished` + `publishedAt` (for published posts sorted by date)
- `category` + `isPublished` (for filtering by category)

---

### 9. Reports Collection (Transparency)

**Collection ID:** `reports`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `year`            | integer  | ✅        | -       | Report year                              |
| `titleEn`         | string   | ✅        | -       | English title                            |
| `titleAr`         | string   | ✅        | -       | Arabic title                             |
| `descriptionEn`   | string   | ❌        | null    | English description                      |
| `descriptionAr`   | string   | ❌        | null    | Arabic description                       |
| `pdfUrl`          | string   | ✅        | -       | PDF document URL                         |
| `reportType`      | string   | ❌        | annual  | annual, quarterly, project               |
| `isPublished`     | boolean  | ❌        | true    | Whether report is visible                |
| `$createdAt`      | datetime | Auto     | -       | Upload date                              |

**Indexes:**
- `year` + `isPublished` (for sorted reports)
- `reportType` + `isPublished` (for filtering)

---

### 10. Contact Submissions Collection

**Collection ID:** `contact_submissions`

| Attribute         | Type     | Required | Default | Description                              |
| ----------------- | -------- | -------- | ------- | ---------------------------------------- |
| `$id`             | string   | Auto     | -       | Unique identifier                        |
| `name`            | string   | ✅        | -       | Sender name                              |
| `email`           | string   | ✅        | -       | Sender email                             |
| `phone`           | string   | ❌        | null    | Phone number                             |
| `subject`         | string   | ❌        | null    | Message subject                          |
| `message`         | string   | ✅        | -       | Message content                          |
| `status`          | string   | ❌        | new     | new, read, replied, archived             |
| `$createdAt`      | datetime | Auto     | -       | Submission date                          |

---

## Appwrite Setup Instructions

### Step 1: Create Database

```bash
# Using Appwrite CLI or Console
# Create database: sawaid_db
```

### Step 2: Create Collections

For each collection above, create it in the Appwrite Console with the specified attributes.

### Step 3: Configure Permissions

**Read Permissions (Public):**
```
- paths: ["role:all"]
- programs: ["role:all"]
- campaigns: ["role:all"]
- media_assets: ["role:all"]
- posts: ["role:all"] (where isPublished = true)
- reports: ["role:all"] (where isPublished = true)
```

**Write Permissions (Admin Only):**
```
- All collections: ["team:admins"] or specific user IDs
```

**Public Write (Form Submissions):**
```
- volunteers: ["role:all"] for create only
- sponsors: ["role:all"] for create only
- contact_submissions: ["role:all"] for create only
- donations: ["role:all"] for create only (validated via Stripe webhook)
```

### Step 4: Create Indexes

Create the indexes listed under each collection for optimal query performance.

---

## API Endpoints (Next.js App Routes)

### Public GET Endpoints

```
GET /api/paths                    → List all active paths
GET /api/paths/[slug]             → Get path details with programs
GET /api/programs                 → List all active programs
GET /api/programs/[slug]          → Get program details with campaigns
GET /api/campaigns                → List all active campaigns
GET /api/campaigns?featured=true  → Featured campaigns for homepage
GET /api/campaigns?urgent=true    → Urgent campaigns
GET /api/campaigns?zakat=true     → Zakat-eligible campaigns
GET /api/campaigns/[slug]         → Campaign details
GET /api/media                    → Media gallery
GET /api/posts                    → Published news/updates
GET /api/reports                  → Published transparency reports
```

### Public POST Endpoints (Forms)

```
POST /api/volunteers              → Submit volunteer application
POST /api/sponsors                → Submit sponsor registration
POST /api/contact                 → Submit contact form
POST /api/donations/checkout      → Create Stripe checkout session
```

### Admin Endpoints (Protected)

```
# CRUD for all collections (implement in separate admin project)
```

---

## Zakat Eligibility System

### How It Works:

1. **Admin toggles** `zakatSupported` boolean on Programs or Campaigns
2. **Frontend displays** visual stamps:
   - 🟢 **Green stamp**: "Zakat Supported" / "✓ زكاة"
   - 🔴 **Red stamp**: "Zakat Not Supported" / "✗ غير مؤهل للزكاة"

### Implementation:

```tsx
// Component for Zakat Badge
function ZakatBadge({ supported }: { supported: boolean }) {
  return (
    <Badge 
      variant={supported ? "default" : "destructive"}
      className={supported 
        ? "bg-green-500/10 text-green-600 border-green-500" 
        : "bg-red-500/10 text-red-600 border-red-500"
      }
    >
      {supported ? "✓ Zakat Supported" : "✗ Not Zakat Eligible"}
    </Badge>
  );
}
```

---

## Migration from Static Data

### Current State:
- `paths` and `programs` are in [src/lib/data.ts](src/lib/data.ts)
- `campaigns` exist but are NOT linked to programs

### Migration Steps:

1. **Add `programId` to campaigns** in static data first
2. **Create Appwrite collections** with schema above
3. **Seed initial data** from static files
4. **Create API routes** to fetch from Appwrite
5. **Update components** to use API data with fallback to static

---

## Environment Variables

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key  # Server-side only

# Database ID
NEXT_PUBLIC_APPWRITE_DATABASE_ID=sawaid_db
```

---

## Summary

| Collection            | Purpose                                    | Relationships              |
| --------------------- | ------------------------------------------ | -------------------------- |
| `paths`               | 4 main organizational tracks               | Has many: Programs         |
| `programs`            | Specific programs within paths             | Belongs to: Path, Has many: Campaigns |
| `campaigns`           | Individual fundraising projects            | Belongs to: Program (optional) |
| `donations`           | Donation transactions                      | Belongs to: Campaign       |
| `volunteers`          | Volunteer applications                     | Independent               |
| `sponsors`            | Sponsor registrations                      | Independent               |
| `media_assets`        | Gallery images/videos                      | Optional: Campaign link    |
| `posts`               | News and updates                           | Independent               |
| `reports`             | Transparency documents                     | Independent               |
| `contact_submissions` | Contact form entries                       | Independent               |

This schema supports the **Paths → Programs → Campaigns** hierarchy while allowing flexibility for standalone campaigns and comprehensive donor/volunteer management.
