# Sawaed Al-Islah - Appwrite Backend Roadmap & Implementation Guide

**Version**: 2.0 (Appwrite Migration)  
**Date**: December 20, 2025  
**Context**: Transitioning from Supabase SQL design to Appwrite (NoSQL/Relational) for a dual-application architecture (Public Website + Admin Portal).

---

## 1. Architecture Overview

### Dual-App Setup
We will use a **Single Appwrite Project** to serve both applications. This ensures data consistency and centralized authentication.

1.  **Public Website** (`sawaed-public`): Read-only access to most content; Write access only for "Public Forms" (Volunteers, Contact, Donations).
2.  **Admin Portal** (`sawaed-admin`): Restricted access application for managing content, viewing submissions, and handling platform settings.

### Core Technology Stack
-   **Backend**: Appwrite Cloud (or Self-Hosted)
-   **Database**: Appwrite Database (Collections & Relationships)
-   **Auth**: Appwrite Authentication (Email/Password + Teams)
-   **Storage**: Appwrite Storage (Buckets for Media, Covers, Reports)
-   **Functions**: Appwrite Functions (Node.js) for Stripe Webhooks & Advanced Logic (if needed).

---

## 2. Appwrite Project Setup

### 2.1 Project Initialization
1.  **Create Project**: Name it `Sawaed Al-Islah Platform`.
2.  **Platform Additions**:
    -   Add Web Platform for Public Site (e.g., `localhost:3000` / `sawaed.org`).
    -   Add Web Platform for Admin Portal (e.g., `localhost:3001` / `admin.sawaed.org`).
3.  **API Keys**:
    -   Create a "Server Internal" API Key with `role:all` scope (Use strictly in Server Components / API Routes / Functions). **Never expose this to the client.**

### 2.2 Teams & Roles
Instead of a custom `admin_users` collection, we will leverage **Appwrite Teams** for robust permission management.

1.  **Team**: `Admins` (`team:admins`)
    -   **Roles**:
        -   `owner` (Super Admin)
        -   `editor` (Content Manager)
        -   `finance` (Donation Manager)
        -   `volunteer_coordinator`

*Strategy*: When an admin logs in, check their Team membership to grant access to the Admin Portal. Use Appwrite's JWT for server-side verification.

---

## 3. Database Schema (Collections)

**Database Name**: `sawaed_core`

### 3.1 Naming Conventions
-   **Collection IDs**: CamelCase or snake_case (e.g., `campaigns`, `mediaAssets`).
-   **Attribute IDs**: snake_case (e.g., `title_en`, `is_urgent`).

### 3.2 Collection Definitions

#### 1. Paths (`paths`)
*High-level program tracks.*
-   **Attributes**:
    -   `slug` (String, 128 chars, Required, Unique)
    -   `title_en` (String, 255 chars, Required)
    -   `title_ar` (String, 255 chars, Required)
    -   `description_en` (String, 5000 chars, Nullable)
    -   `description_ar` (String, 5000 chars, Nullable)
    -   `icon` (String, 50 chars, Required, Default: 'Heart')
    -   `order_priority` (Integer, Required, Default: 0)
    -   `status` (String, 20 chars, Required, Enum: `active`, `inactive`)
-   **Indexes**:
    -   `idx_slug` (Key, Unique, [`slug`])
    -   `idx_status` (Key, [`status`])
-   **Permissions**:
    -   Read: `Any`
    -   Write: `team:admins`

#### 2. Programs (`programs`)
*Specific projects under a path.*
-   **Attributes**:
    -   `slug` (String, 128 chars, Required, Unique)
    -   `title_en` (String, 255 chars, Required)
    -   `title_ar` (String, 255 chars, Required)
    -   `summary_en` (String, 500 chars, Nullable)
    -   `summary_ar` (String, 500 chars, Nullable)
    -   `description_en` (String, 10000 chars, Nullable - Rich Text)
    -   `description_ar` (String, 10000 chars, Nullable - Rich Text)
    -   `cover_image_url` (Url, Nullable)
    -   `gallery_images` (Url Array, Nullable)
    -   `zakat_supported` (Boolean, Required, Default: false)
    -   `status` (String, 20 chars, Required, Enum: `draft`, `published`, `archived`)
    -   `target_amount` (Float, Nullable)
    -   `current_amount` (Float, Default: 0)
    -   `start_date` (DateTime, Nullable)
    -   `end_date` (DateTime, Nullable)
-   **Relationships**:
    -   **Many-to-One** to `paths` (Attribute: `path`) -> On Delete: `Cascade` or `Set Null`.
-   **Indexes**:
    -   `idx_slug` (Key, Unique, [`slug`])
    -   `idx_status` (Key, [`status`])
-   **Permissions**:
    -   Read: `Any` (or filter by status='published' in query)
    -   Write: `team:admins`

#### 3. Campaigns (`campaigns`)
*Fundraising initiatives.*
-   **Attributes**:
    -   `slug` (String, 128 chars, Required, Unique)
    -   `title_en` (String, 255 chars, Required)
    -   `title_ar` (String, 255 chars, Required)
    -   `description_en` (String, 10000 chars, Nullable - Rich Text)
    -   `description_ar` (String, 10000 chars, Nullable - Rich Text)
    -   `goal_amount` (Float, Required)
    -   `raised_amount` (Float, Required, Default: 0.0)
    -   `currency` (String, 3 chars, Required, Default: 'QAR')
    -   `is_urgent` (Boolean, Required, Default: false)
    -   `zakat_supported` (Boolean, Required, Default: false)
    -   `is_featured` (Boolean, Required, Default: false)
    -   `cover_image_url` (Url, Nullable)
    -   `gallery_images` (Url Array, Nullable)
    -   `start_date` (DateTime, Nullable)
    -   `end_date` (DateTime, Nullable)
    -   `status` (String, 20 chars, Required, Enum: `active`, `completed`, `cancelled`)
-   **Relationships**:
    -   **Many-to-One** to `programs` (Attribute: `program`) -> Optional.
-   **Indexes**:
    -   `idx_featured` (Key, [`is_featured`])
    -   `idx_status` (Key, [`status`])
    -   `idx_urgent` (Key, [`is_urgent`])
-   **Permissions**:
    -   Read: `Any`
    -   Write: `team:admins`

#### 4. Donations (`donations`)
*Transaction records.*
-   **Attributes**:
    -   `donor_first_name` (String, 255 chars, Required)
    -   `donor_last_name` (String, 255 chars, Required)
    -   `donor_email` (Email, Required)
    -   `donor_phone` (String, 50 chars, Nullable)
    -   `amount` (Float, Required)
    -   `currency` (String, 3 chars, Required)
    -   `donation_type` (String, 20 chars, Required, Enum: `onetime`, `monthly`)
    -   `zakat_eligible` (Boolean, Required, Default: false)
    -   `is_anonymous` (Boolean, Required, Default: false)
    -   `message` (String, 1000 chars, Nullable)
    -   `stripe_payment_intent_id` (String, 255 chars, Nullable)
    -   `stripe_session_id` (String, 255 chars, Nullable)
    -   `payment_status` (String, 20 chars, Required, Default: `pending`)
    -   `receipt_sent` (Boolean, Required, Default: false)
-   **Relationships**:
    -   **Many-to-One** to `campaigns` (Attribute: `campaign`) -> Optional.
-   **Indexes**:
    -   `idx_payment_status` (Key, [`payment_status`])
    -   `idx_email` (Key, [`donor_email`])
-   **Permissions**:
    -   Read: `team:admins` (Privacy critical)
    -   Create: `Any` (Public donation form)
    -   Update: `team:admins` or Server Function (Webhooks)
    -   Delete: `team:admins` (owner only)

#### 5. Volunteers (`volunteers`)
*Application submissions.*
-   **Attributes**:
    -   `full_name` (String, 255 chars, Required)
    -   `email` (Email, Required)
    -   `phone` (String, 50 chars, Nullable)
    -   `message` (String, 2000 chars, Nullable)
    -   `cv_url` (Url, Nullable)
    -   `status` (String, 20 chars, Required, Default: `new`)
    -   `admin_notes` (String, 5000 chars, Nullable)
    -   `source` (String, 50 chars, Default: `website`)
-   **Relationships**:
    -   **Many-to-One** to `volunteer_positions` (Attribute: `position`) -> Optional.
-   **Permissions**:
    -   Read: `team:admins`
    -   Create: `Any`
    -   Update: `team:admins`

#### 6. Volunteer Positions (`volunteer_positions`)
*Open roles.*
-   **Attributes**:
    -   `slug` (String, 128 chars, Required, Unique)
    -   `title_en` (String, 255 chars, Required)
    -   `title_ar` (String, 255 chars, Required)
    -   `description_en` (String, 5000 chars, Nullable)
    -   `description_ar` (String, 5000 chars, Nullable)
    -   `location_en` (String, 100 chars, Nullable)
    -   `location_ar` (String, 100 chars, Nullable)
    -   `type` (String, 50 chars, Required, Default: `remote`)
    -   `status` (String, 20 chars, Required, Default: `active`)
-   **Permissions**:
    -   Read: `Any`
    -   Write: `team:admins`

#### 7. Media Assets (`media_assets`)
*Centralized gallery handling.*
-   **Attributes**:
    -   `type` (String, 20 chars, Required, Enum: `image`, `video`)
    -   `title_en` (String, 255 chars, Nullable)
    -   `title_ar` (String, 255 chars, Nullable)
    -   `url` (Url, Required)
    -   `thumbnail_url` (Url, Nullable)
    -   `category` (String, 50 chars, Nullable)
    -   `alt_text_en` (String, 255 chars, Nullable)
    -   `alt_text_ar` (String, 255 chars, Nullable)
    -   `tags` (String Array, Nullable)
-   **Indexes**:
    -   `idx_category` (Key, [`category`])
-   **Permissions**:
    -   Read: `Any`
    -   Write: `team:admins`

#### 8. Posts (`posts`)
*News, updates, success stories.*
-   **Attributes**:
    -   `slug` (String, 128 chars, Required, Unique)
    -   `title_en` (String, 255 chars, Required)
    -   `title_ar` (String, 255 chars, Required)
    -   `excerpt_en` (String, 500 chars, Nullable)
    -   `excerpt_ar` (String, 500 chars, Nullable)
    -   `body_en` (String, 10000+ chars, Nullable)
    -   `body_ar` (String, 10000+ chars, Nullable)
    -   `cover_image_url` (Url, Nullable)
    -   `category` (String, 50 chars, Required)
    -   `is_featured` (Boolean, Default: false)
    -   `published_at` (DateTime, Nullable)
    -   `status` (String, 20 chars, Default: `draft`)
-   **Permissions**:
    -   Read: `Any`
    -   Write: `team:admins`

#### 9. Reports (`reports`)
*Transparency inputs.*
-   **Attributes**:
    -   `year` (Integer, Required)
    -   `title_en` (String, 255 chars, Required)
    -   `title_ar` (String, 255 chars, Required)
    -   `pdf_url` (Url, Required)
    -   `is_published` (Boolean, Default: false)
-   **Permissions**:
    -   Read: `Any`
    -   Write: `team:admins`

#### 10. Contact Messages (`contact_messages`)
-   **Attributes**:
    -   `name` (String, 255 chars, Required)
    -   `email` (Email, Required)
    -   `subject` (String, 255 chars, Required)
    -   `message` (String, 5000 chars, Required)
    -   `status` (String, 20 chars, Default: `new`)
-   **Permissions**:
    -   Read: `team:admins`
    -   Create: `Any`
    -   Update: `team:admins`

---

## 4. Storage Buckets

1.  **Campaign Covers** (`campaign-covers`)
    -   Public Read: Yes
    -   Files: Images only (jpg, png, webp)
    -   Max Size: 5MB
2.  **Gallery** (`gallery`)
    -   Public Read: Yes
    -   Files: Images (jpg, png, webp) initially.
    -   Max Size: 10MB
3.  **Reports** (`reports-docs`)
    -   Public Read: Yes
    -   Files: PDF only.
    -   Max Size: 20MB
4.  **Resumes** (`volunteer-cvs`)
    -   Public Read: **NO** (Restricted to `team:admins`)
    -   Files: PDF, DOCX.
    -   Max Size: 5MB

---

## 5. Security & Permission Strategy

### 5.1 Public Access (The Website)
-   The public user is `role:any`.
-   **Read**: Allowed on content collections (`posts`, `campaigns`, `paths`, etc.) where `status=published`.
-   **Write**: Allowed ONLY on submission collections (`contact_messages`, `volunteers`, `donations`).
    -   *Crucial*: Public CANNOT read `contact_messages` or `volunteers` back. Only Write.

### 5.2 Admin Access (However admin logs in)
-   Admins must belong to the Appwrite Team `Admins`.
-   **Read/Write**: Full access to all collections based on team membership (`team:admins`).

### 5.3 API Key Usage
-   **Public Website**: Uses the `Client Side` integration (Project ID + Endpoint) for reads.
-   **Public Website (Server Actions)**: Uses `API Key` for privileged actions if needed (like submitting a sensitive form without exposing logic, though strictly Appwrite SDK client-side write is safe if Permissions are set to `role:any` for create). *Recommendation*: Use Server Actions with `node-appwrite` and an API key for cleaner validation before submission.
-   **Admin Portal**: Uses `Client Side` for Auth, but likely Server Components with `API Key` for heavy lifting/fetching restricted data.

---

## 6. Implementation Roadmap

### Phase 1: Foundation (Days 1-2)
1.  Initialize Appwrite Project.
2.  Create all Collections defined in Section 3 via Appwrite Console.
3.  Setup Relationships between collections.
4.  Create Storage Buckets with strict file limitations.
5.  Generate Types for TypeScript (using `appwrite-cli` or manual interfaces).

### Phase 2: Core Admin Integration (Days 3-5)
1.  Connect **Admin Portal** to Appwrite.
2.  Build Authentication Flow (Login/Logout using Appwrite Auth).
3.  Implement "Protected Route" wrapper that checks `account.get()` and team membership.
4.  Build CRUD tables (using Shadcn UI data-table) for `Paths` and `Campaigns`.

### Phase 3: Public Site Integration (Days 6-8)
1.  Replace static `data.ts` in Public Site with Appwrite fetches (`databases.listDocuments`).
2.  Implement `Zakat` badge logic based on boolean attributes.
3.  Connect "Volunteer" and "Contact" forms to write to Appwrite.

### Phase 4: Payments & Advanced Logic (Days 9-11)
1.  Implement Stripe Payment Intent API (Next.js API Route).
2.  Create Appwrite Function or Next.js Webhook handler to:
    -   Receive Stripe Webhook (`payment_intent.succeeded`).
    -   Update `donations` collection status to `completed`.
    -   Increment `campaigns.raised_amount` (Atomic update).

### Phase 5: Dashboard & Analytics (Days 12+)
1.  Build Admin Dashboard aggregating stats:
    -   `donations.sum('amount')` (Appwrite supports aggregation now or manual calc).
    -   Count of `volunteers` with status `new`.
2.  Polish & Launch.
