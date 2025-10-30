# Admin Portal Requirements Document
## Sawaed Al-Islah Platform - Content Management System

**Document Version**: 1.0  
**Date**: October 31, 2025  
**Project**: Admin Portal for Dynamic Content Management  
**Platform**: Next.js (App Router) + Supabase/Appwrite

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Context](#project-context)
3. [Functional Requirements](#functional-requirements)
4. [Technical Requirements](#technical-requirements)
5. [Database Schema](#database-schema)
6. [User Roles & Permissions](#user-roles--permissions)
7. [API Endpoints](#api-endpoints)
8. [UI/UX Requirements](#uiux-requirements)
9. [Security Requirements](#security-requirements)
10. [Cost Analysis](#cost-analysis)
11. [Database Recommendation](#database-recommendation)
12. [Implementation Phases](#implementation-phases)
13. [Success Metrics](#success-metrics)

---

## Executive Summary

### Purpose
Develop a comprehensive Admin Portal to enable dynamic management of the Sawaed Al-Islah Platform, transitioning from static content to a fully database-driven system.

### Key Objectives
- Enable non-technical staff to manage all website content
- Support bilingual content management (Arabic/English)
- Handle donations, campaigns, volunteers, and transparency reporting
- Provide real-time analytics and reporting
- Ensure secure, role-based access control
- Maintain cost-effectiveness with zero or minimal monthly costs

### Current State
- **Frontend**: Next.js 15.3.3 with TypeScript, fully functional
- **Styling**: Tailwind CSS + Shadcn UI components
- **i18n**: Custom translation system (Arabic/English) with RTL support
- **Content**: Currently static data in `src/lib/data.ts`
- **Payments**: Stripe integration implemented (needs database persistence)
- **Deployment**: Configured for Vercel

### Target State
- Fully dynamic content management
- Separate admin application or integrated admin routes
- Database-backed content with real-time updates
- Role-based access control
- Analytics dashboard
- Automated reporting and notifications

---

## Project Context

### Current Website Structure

**Main Public Pages:**
1. **Home** (`/`) - Hero, Achievements, Featured Campaigns, 4 Paths, News
2. **About Us** (`/about`) - Organization information
3. **Paths** (`/paths`) - 4 main program tracks with sub-programs
4. **Campaigns** (`/campaigns`) - Fundraising campaigns with progress
5. **Media Gallery** (`/gallery`) - Photos and videos
6. **Volunteer** (`/volunteer`) - Volunteer positions and application
7. **Transparency** (`/transparency`) - Financial reports and allocation
8. **Contact** (`/contact`) - Contact form and information
9. **Donate** (`/donate`) - Donation form with Stripe integration

**The Four Paths:**
1. Education & Empowerment (التعليم والتمكين)
2. Sponsoring Reformers (رعاية المصلحين)
3. Educational Nurseries (الحضانات التعليمية)
4. General Reform Programs (برامج الإصلاح العامة)

**Current Data Models (Static):**
- Campaigns (with Zakat eligibility, goals, raised amounts)
- Paths (program categories)
- Programs/Projects (under each path)
- Volunteer Positions
- FAQ Items
- Financial Allocations
- Media Assets

---

## Functional Requirements

### 1. Content Management

#### 1.1 Paths Management
**Requirements:**
- Create, Read, Update, Delete (CRUD) operations for paths
- Bilingual content (English & Arabic)
- Slug generation for URLs
- Icon selection from predefined set
- Order/priority management
- Enable/Disable paths
- Associated programs listing

**Fields:**
- ID (UUID)
- Slug (unique, auto-generated)
- Title (EN/AR)
- Description (EN/AR)
- Icon identifier
- Order/Priority (integer)
- Status (active/inactive)
- Created/Updated timestamps
- Created by admin user

#### 1.2 Programs/Projects Management
**Requirements:**
- CRUD operations for programs
- Associate programs with specific paths
- Zakat eligibility toggle
- Image upload and management
- Rich text editor for descriptions
- Status management (draft, published, archived)

**Fields:**
- ID (UUID)
- Path ID (foreign key)
- Slug (unique)
- Title (EN/AR)
- Summary (EN/AR, short)
- Description (EN/AR, rich text)
- Cover Image URL
- Zakat Supported (boolean)
- Status (draft/published/archived)
- Start Date / End Date
- Target Amount (optional)
- Current Amount (optional)
- Gallery Images (array)
- Created/Updated timestamps

#### 1.3 Campaigns Management
**Requirements:**
- CRUD operations for fundraising campaigns
- Goal and current amount tracking
- Zakat eligibility designation
- Urgent campaign flagging
- Campaign duration (start/end dates)
- Link to associated program (optional)
- Donor recognition settings
- Image gallery management
- Auto-calculated progress percentage

**Fields:**
- ID (UUID)
- Program ID (foreign key, optional)
- Slug (unique)
- Title (EN/AR)
- Description (EN/AR, rich text)
- Goal Amount (numeric)
- Raised Amount (numeric, auto-updated from donations)
- Currency (QAR/USD/EUR/GBP)
- Urgent Flag (boolean)
- Zakat Supported (boolean)
- Cover Image URL
- Gallery Images (array)
- Start Date
- End Date
- Status (active/completed/cancelled)
- Featured (boolean)
- Created/Updated timestamps

#### 1.4 News & Posts Management
**Requirements:**
- Create articles/news/challenges
- Rich text editor with media embedding
- Category assignment (news, challenge, update, announcement)
- Featured posts
- Publishing schedule
- SEO meta fields

**Fields:**
- ID (UUID)
- Slug (unique)
- Title (EN/AR)
- Excerpt (EN/AR)
- Body (EN/AR, rich text)
- Cover Image URL
- Category (news/challenge/update/announcement)
- Tags (array)
- Featured (boolean)
- Published At (timestamp, nullable)
- Status (draft/published/archived)
- SEO Title (EN/AR)
- SEO Description (EN/AR)
- Created/Updated timestamps

#### 1.5 Media Gallery Management
**Requirements:**
- Upload images and videos
- Organize by categories
- Bulk upload support
- Image optimization and thumbnail generation
- Video embedding (YouTube/Vimeo links or direct upload)
- Tag and search functionality
- Usage tracking (where media is used)

**Fields:**
- ID (UUID)
- Type (image/video)
- Title (EN/AR)
- Description (EN/AR)
- URL (full-size)
- Thumbnail URL
- Category (field-work/education/infrastructure/events)
- Location
- Date Taken
- Tags (array)
- File Size
- Dimensions (width/height)
- Alt Text (EN/AR, for accessibility)
- Created/Updated timestamps

#### 1.6 Transparency Reports Management
**Requirements:**
- Upload annual/quarterly reports (PDF)
- Financial data visualization inputs
- Report metadata management
- Public visibility controls

**Fields:**
- ID (UUID)
- Year/Quarter
- Title (EN/AR)
- Description (EN/AR)
- PDF URL
- Report Type (annual/quarterly/special)
- Financial Summary (JSON structure)
- Published (boolean)
- Created/Updated timestamps

#### 1.7 Volunteer Management
**Requirements:**
- View volunteer applications
- Filter and search applications
- Status management (new/reviewed/accepted/rejected)
- Communication tracking
- Notes and comments
- Export to CSV
- Position management (create/edit volunteer positions)

**Fields (Applications):**
- ID (UUID)
- Full Name
- Email
- Phone
- Position Applied For
- Message/Cover Letter
- Resume/CV URL (optional)
- Status (new/reviewed/contacted/accepted/rejected)
- Admin Notes (rich text)
- Source (website/direct/referral)
- Created/Updated timestamps

**Fields (Positions):**
- ID
- Title (EN/AR)
- Description (EN/AR)
- Requirements (EN/AR, array)
- Location (EN/AR)
- Type (remote/onsite/hybrid)
- Status (active/inactive)
- Created/Updated timestamps

#### 1.8 Donations Management
**Requirements:**
- View all donation records
- Filter by campaign, date, amount, status
- Export donation reports
- Donor information (respecting anonymity)
- Stripe payment status tracking
- Receipt generation and resending
- Recurring donation management
- Refund processing

**Fields:**
- ID (UUID)
- Campaign ID (foreign key, nullable)
- Donor First Name
- Donor Last Name
- Donor Email
- Donor Phone (optional)
- Amount
- Currency
- Donation Type (one-time/monthly)
- Zakat Eligible (boolean, from campaign)
- Anonymous (boolean)
- Message (text)
- Stripe Payment Intent ID
- Stripe Session ID
- Payment Status (pending/completed/failed/refunded)
- Receipt Sent (boolean)
- Created/Updated timestamps

#### 1.9 Contact Messages Management
**Requirements:**
- View contact form submissions
- Status tracking (new/read/replied/archived)
- Reply functionality
- Tag and categorize messages
- Search and filter

**Fields:**
- ID (UUID)
- Name
- Email
- Phone (optional)
- Subject
- Message (text)
- Status (new/read/replied/archived)
- Priority (low/medium/high)
- Admin Notes (text)
- Replied At (timestamp)
- Created timestamp

### 2. Dashboard & Analytics

#### 2.1 Main Dashboard
**Requirements:**
- Real-time statistics overview
- Key performance indicators (KPIs):
  - Total donations (this month, this year, all-time)
  - Active campaigns count
  - Total donors
  - Volunteer applications (pending/total)
  - Unread contact messages
  - Website visits (if analytics integrated)
- Recent activities feed
- Quick actions panel
- Alerts and notifications

#### 2.2 Financial Analytics
**Requirements:**
- Donation trends (daily/weekly/monthly/yearly)
- Campaign performance comparison
- Donation by campaign breakdown
- Donation by currency breakdown
- Average donation amount
- Recurring vs one-time donations ratio
- Zakat vs non-Zakat donations
- Export financial reports (Excel/CSV/PDF)
- Charts and visualizations

#### 2.3 Campaign Analytics
**Requirements:**
- Individual campaign performance
- Goal vs actual raised
- Donation velocity (rate of donations)
- Donor demographics (anonymized)
- Best performing campaigns
- Completion predictions
- Share and engagement metrics (if social integrated)

#### 2.4 Content Analytics
**Requirements:**
- Page views by content type
- Most viewed paths/programs
- Most popular news/posts
- Gallery item views
- Download counts for reports
- Search terms (if search implemented)

### 3. User Management & Authentication

#### 3.1 Admin User Management
**Requirements:**
- User registration (invite-only)
- Email verification
- Password reset
- Multi-factor authentication (optional)
- Session management
- Activity logging

**Roles:**
1. **Super Admin**
   - Full access to all features
   - User management
   - System settings
   - Delete critical records
   
2. **Content Manager**
   - CRUD for paths, programs, campaigns, posts, media
   - Cannot delete campaigns with donations
   - Cannot manage users
   
3. **Donation Manager**
   - View and manage donations
   - Issue refunds
   - Download reports
   - Cannot modify campaigns
   
4. **Volunteer Coordinator**
   - Manage volunteer applications
   - Manage volunteer positions
   - Limited access to other modules
   
5. **Viewer/Auditor**
   - Read-only access
   - Can export reports
   - Cannot modify data

**Fields (Admin Users):**
- ID (UUID)
- Email (unique)
- Full Name
- Role
- Avatar URL
- Status (active/suspended)
- Email Verified (boolean)
- Last Login
- Created/Updated timestamps

### 4. Settings & Configuration

#### 4.1 General Settings
**Requirements:**
- Site name and tagline (EN/AR)
- Contact information
- Social media links
- Currency preferences
- Timezone settings
- Maintenance mode toggle

#### 4.2 Email Settings
**Requirements:**
- SMTP configuration or service API keys
- Email templates management
- Automated email toggles:
  - Donation receipts
  - Volunteer application confirmations
  - Contact form auto-replies
  - Campaign updates to donors

#### 4.3 Payment Settings
**Requirements:**
- Stripe API keys management (with test/live mode)
- Default currency
- Minimum donation amount
- Supported currencies
- Recurring donation settings

#### 4.4 Localization Settings
**Requirements:**
- Default language
- Available languages
- Date/time formats
- Number formats

---

## Technical Requirements

### 1. Technology Stack

#### Frontend (Admin Portal)
- **Framework**: Next.js 14/15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Forms**: React Hook Form + Zod validation
- **Rich Text Editor**: TipTap or similar
- **Charts**: Recharts or Chart.js
- **File Upload**: React Dropzone
- **State Management**: React Context or Zustand (minimal, most data from API)
- **Authentication**: Next-Auth or Supabase Auth / Appwrite Auth

#### Backend/API
- **API Routes**: Next.js API routes (App Router)
- **Database Client**: @supabase/supabase-js or appwrite SDK
- **Validation**: Zod schemas
- **File Storage**: Supabase Storage or Appwrite Storage
- **Email**: Resend or SendGrid
- **Payments**: Stripe (already integrated)

#### Database
- **Option 1**: Supabase (PostgreSQL)
- **Option 2**: Appwrite (MariaDB)

### 2. Deployment Architecture

**Option A: Separate Admin App**
- Subdomain: `admin.sawaedalisla.org`
- Separate Next.js project
- Shared database and API layer
- Pros: Clear separation, independent deployments
- Cons: More maintenance, code duplication

**Option B: Integrated Admin Routes** (Recommended)
- Routes under `/admin/*`
- Same Next.js project
- Protected by middleware
- Pros: Shared code, easier maintenance, single deployment
- Cons: Potential complexity in routing

**Recommendation**: Option B (Integrated) for MVP, can separate later if needed.

### 3. Performance Requirements
- Admin dashboard load time: < 2 seconds
- CRUD operations response: < 1 second
- Image upload: Support files up to 10MB
- Batch operations: Handle up to 100 items
- Real-time updates: Optional websockets for live stats

### 4. Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile responsive (tablet minimum)

### 5. Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Proper ARIA labels
- Color contrast compliance

---

## Database Schema

### Core Tables

#### 1. **paths**
```sql
CREATE TABLE paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  icon TEXT NOT NULL DEFAULT 'Heart',
  order_priority INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active', -- active|inactive
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_paths_status ON paths(status);
CREATE INDEX idx_paths_order ON paths(order_priority);
```

#### 2. **programs**
```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id UUID REFERENCES paths(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  summary_en TEXT,
  summary_ar TEXT,
  description_en TEXT, -- rich text/HTML
  description_ar TEXT, -- rich text/HTML
  cover_image_url TEXT,
  gallery_images TEXT[], -- array of URLs
  zakat_supported BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft', -- draft|published|archived
  target_amount NUMERIC(12,2),
  current_amount NUMERIC(12,2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_programs_path ON programs(path_id);
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_programs_zakat ON programs(zakat_supported);
```

#### 3. **campaigns**
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT, -- rich text
  description_ar TEXT, -- rich text
  goal_amount NUMERIC(12,2) NOT NULL,
  raised_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'qar', -- qar|usd|eur|gbp
  urgent BOOLEAN NOT NULL DEFAULT false,
  zakat_supported BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  gallery_images TEXT[],
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'active', -- active|completed|cancelled
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_featured ON campaigns(featured);
CREATE INDEX idx_campaigns_urgent ON campaigns(urgent);
CREATE INDEX idx_campaigns_zakat ON campaigns(zakat_supported);
```

#### 4. **donations**
```sql
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  donor_first_name TEXT NOT NULL,
  donor_last_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL,
  donation_type TEXT NOT NULL, -- one-time|monthly
  zakat_eligible BOOLEAN NOT NULL DEFAULT false,
  anonymous BOOLEAN NOT NULL DEFAULT false,
  message TEXT,
  stripe_payment_intent_id TEXT,
  stripe_session_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending|completed|failed|refunded
  receipt_sent BOOLEAN NOT NULL DEFAULT false,
  receipt_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_donations_campaign ON donations(campaign_id);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_email ON donations(donor_email);
CREATE INDEX idx_donations_created ON donations(created_at DESC);
```

#### 5. **volunteers**
```sql
CREATE TABLE volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position_id TEXT, -- references volunteer_positions or just text
  message TEXT,
  cv_url TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- new|reviewed|contacted|accepted|rejected
  admin_notes TEXT,
  source TEXT DEFAULT 'website', -- website|direct|referral
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_volunteers_created ON volunteers(created_at DESC);
```

#### 6. **volunteer_positions**
```sql
CREATE TABLE volunteer_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  requirements_en TEXT[], -- array of requirement strings
  requirements_ar TEXT[],
  location_en TEXT,
  location_ar TEXT,
  position_type TEXT, -- remote|onsite|hybrid
  status TEXT NOT NULL DEFAULT 'active', -- active|inactive
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_volunteer_positions_status ON volunteer_positions(status);
```

#### 7. **posts** (News/Challenges)
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_ar TEXT,
  body_en TEXT, -- rich text
  body_ar TEXT, -- rich text
  cover_image_url TEXT,
  category TEXT NOT NULL, -- news|challenge|update|announcement
  tags TEXT[],
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft', -- draft|published|archived
  seo_title_en TEXT,
  seo_title_ar TEXT,
  seo_description_en TEXT,
  seo_description_ar TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_published ON posts(published_at DESC);
```

#### 8. **media_assets**
```sql
CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- image|video
  title_en TEXT,
  title_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT, -- field-work|education|infrastructure|events
  location TEXT,
  date_taken DATE,
  tags TEXT[],
  file_size INTEGER, -- bytes
  width INTEGER,
  height INTEGER,
  alt_text_en TEXT,
  alt_text_ar TEXT,
  usage_count INTEGER DEFAULT 0, -- how many times referenced
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_media_type ON media_assets(type);
CREATE INDEX idx_media_category ON media_assets(category);
CREATE INDEX idx_media_created ON media_assets(created_at DESC);
```

#### 9. **reports** (Transparency Reports)
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  quarter INTEGER, -- 1|2|3|4 or NULL for annual
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  pdf_url TEXT NOT NULL,
  report_type TEXT NOT NULL, -- annual|quarterly|special
  financial_summary JSONB, -- structured financial data for charts
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_reports_year ON reports(year DESC);
CREATE INDEX idx_reports_published ON reports(published);
```

#### 10. **contact_messages**
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- new|read|replied|archived
  priority TEXT DEFAULT 'medium', -- low|medium|high
  admin_notes TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);
```

#### 11. **admin_users**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL, -- super_admin|content_manager|donation_manager|volunteer_coordinator|viewer
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active|suspended
  email_verified BOOLEAN NOT NULL DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_status ON admin_users(status);
```

#### 12. **admin_activity_logs**
```sql
CREATE TABLE admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL, -- created|updated|deleted|viewed
  entity_type TEXT NOT NULL, -- campaign|path|program|etc.
  entity_id UUID,
  details JSONB, -- additional context
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON admin_activity_logs(admin_user_id);
CREATE INDEX idx_activity_logs_created ON admin_activity_logs(created_at DESC);
```

#### 13. **settings**
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);
```

### Row Level Security (RLS) Policies

**For Supabase (PostgreSQL):**

```sql
-- Enable RLS on all tables
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies for published content
CREATE POLICY "Public read active paths" ON paths FOR SELECT USING (status = 'active');
CREATE POLICY "Public read published programs" ON programs FOR SELECT USING (status = 'published');
CREATE POLICY "Public read active campaigns" ON campaigns FOR SELECT USING (status IN ('active', 'completed'));
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (status = 'published' AND published_at <= NOW());
CREATE POLICY "Public read media" ON media_assets FOR SELECT USING (true);
CREATE POLICY "Public read published reports" ON reports FOR SELECT USING (published = true);

-- Public insert for forms
CREATE POLICY "Anyone can submit volunteer" ON volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies (assuming authenticated user context)
-- These would use auth.uid() in Supabase or similar in Appwrite
-- Full admin access policies would be defined based on the auth system
```

---

## User Roles & Permissions

### Permission Matrix

| Feature/Action | Super Admin | Content Manager | Donation Manager | Volunteer Coordinator | Viewer |
|---|:---:|:---:|:---:|:---:|:---:|
| **Dashboard Access** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Paths - View** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Paths - Create/Edit** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Paths - Delete** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Programs - View** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Programs - Create/Edit** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Programs - Delete** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Campaigns - View** | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Campaigns - Create/Edit** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Campaigns - Delete** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Zakat Toggle** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Posts - View** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Posts - Create/Edit/Publish** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Posts - Delete** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Media - View** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Media - Upload** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Media - Delete** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Donations - View** | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Donations - Refund** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Donations - Export** | ✅ | ❌ | ✅ | ❌ | ✅ |
| **Volunteers - View** | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Volunteers - Manage** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Volunteers - Export** | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Contact - View** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Contact - Reply** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Reports - View** | ✅ | ✅ | ✅ | ❌ | ✅ |
| **Reports - Upload** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Settings - View** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Settings - Edit** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **User Management** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Activity Logs** | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## API Endpoints

### Public API (Frontend Access)

#### Paths
- `GET /api/paths` - List all active paths
- `GET /api/paths/[slug]` - Get specific path with programs

#### Programs
- `GET /api/programs` - List published programs (with filters)
- `GET /api/programs/[slug]` - Get specific program
- `GET /api/paths/[pathSlug]/programs` - Programs by path

#### Campaigns
- `GET /api/campaigns` - List active campaigns (with filters: urgent, featured)
- `GET /api/campaigns/[slug]` - Get specific campaign with donation stats

#### Posts
- `GET /api/posts` - List published posts (with pagination, category filter)
- `GET /api/posts/[slug]` - Get specific post

#### Media
- `GET /api/media` - List media assets (with filters)
- `GET /api/media/[id]` - Get specific media

#### Reports
- `GET /api/reports` - List published reports
- `GET /api/reports/[id]` - Get specific report

#### Forms
- `POST /api/volunteers` - Submit volunteer application
- `POST /api/contact` - Submit contact message

#### Donations (Stripe)
- `POST /api/stripe/checkout` - Create checkout session (existing)
- `POST /api/stripe/webhook` - Stripe webhook handler (existing)
- `GET /api/stripe/session?session_id=xxx` - Get session details (existing)

### Admin API (Protected Routes)

#### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Admin logout
- `GET /api/admin/auth/me` - Get current admin user
- `POST /api/admin/auth/reset-password` - Password reset

#### Dashboard
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/dashboard/recent-activity` - Recent activities

#### Paths (Admin)
- `GET /api/admin/paths` - List all paths (including inactive)
- `POST /api/admin/paths` - Create path
- `GET /api/admin/paths/[id]` - Get path details
- `PATCH /api/admin/paths/[id]` - Update path
- `DELETE /api/admin/paths/[id]` - Delete path

#### Programs (Admin)
- `GET /api/admin/programs` - List all programs
- `POST /api/admin/programs` - Create program
- `GET /api/admin/programs/[id]` - Get program
- `PATCH /api/admin/programs/[id]` - Update program
- `DELETE /api/admin/programs/[id]` - Delete program
- `PATCH /api/admin/programs/[id]/zakat` - Toggle Zakat status

#### Campaigns (Admin)
- `GET /api/admin/campaigns` - List all campaigns
- `POST /api/admin/campaigns` - Create campaign
- `GET /api/admin/campaigns/[id]` - Get campaign
- `PATCH /api/admin/campaigns/[id]` - Update campaign
- `DELETE /api/admin/campaigns/[id]` - Delete campaign
- `PATCH /api/admin/campaigns/[id]/zakat` - Toggle Zakat status

#### Posts (Admin)
- `GET /api/admin/posts` - List all posts
- `POST /api/admin/posts` - Create post
- `GET /api/admin/posts/[id]` - Get post
- `PATCH /api/admin/posts/[id]` - Update post
- `DELETE /api/admin/posts/[id]` - Delete post
- `POST /api/admin/posts/[id]/publish` - Publish post

#### Media (Admin)
- `GET /api/admin/media` - List all media
- `POST /api/admin/media/upload` - Upload media file
- `PATCH /api/admin/media/[id]` - Update media metadata
- `DELETE /api/admin/media/[id]` - Delete media

#### Volunteers (Admin)
- `GET /api/admin/volunteers` - List volunteer applications
- `GET /api/admin/volunteers/[id]` - Get application details
- `PATCH /api/admin/volunteers/[id]` - Update application status
- `POST /api/admin/volunteers/[id]/notes` - Add admin notes
- `GET /api/admin/volunteers/export` - Export to CSV

#### Volunteer Positions (Admin)
- `GET /api/admin/volunteer-positions` - List positions
- `POST /api/admin/volunteer-positions` - Create position
- `PATCH /api/admin/volunteer-positions/[id]` - Update position
- `DELETE /api/admin/volunteer-positions/[id]` - Delete position

#### Donations (Admin)
- `GET /api/admin/donations` - List all donations (with filters)
- `GET /api/admin/donations/[id]` - Get donation details
- `POST /api/admin/donations/[id]/refund` - Process refund
- `POST /api/admin/donations/[id]/resend-receipt` - Resend receipt
- `GET /api/admin/donations/export` - Export donations

#### Contact Messages (Admin)
- `GET /api/admin/contact` - List contact messages
- `GET /api/admin/contact/[id]` - Get message details
- `PATCH /api/admin/contact/[id]` - Update message status
- `POST /api/admin/contact/[id]/reply` - Send reply email

#### Reports (Admin)
- `GET /api/admin/reports` - List all reports
- `POST /api/admin/reports` - Create/upload report
- `PATCH /api/admin/reports/[id]` - Update report
- `DELETE /api/admin/reports/[id]` - Delete report

#### Settings (Admin)
- `GET /api/admin/settings` - Get all settings
- `PATCH /api/admin/settings/[key]` - Update specific setting

#### Users (Admin - Super Admin only)
- `GET /api/admin/users` - List admin users
- `POST /api/admin/users` - Create admin user (invite)
- `PATCH /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Deactivate user

#### Activity Logs (Admin)
- `GET /api/admin/activity-logs` - View activity logs

---

## UI/UX Requirements

### Design System
- **Consistent with public site**: Use same Tailwind + Shadcn UI components
- **Admin-specific theme**: Darker sidebar, professional feel
- **Color scheme**: 
  - Primary: Green #1B7B3A (same as public site)
  - Accent: Goldenrod #D9A92B
  - Background: Light gray/white
  - Sidebar: Dark charcoal #333333

### Layout
- **Sidebar navigation** (collapsible on mobile)
- **Top bar** with:
  - Search (global)
  - Notifications bell
  - User menu (avatar, name, logout)
  - Language switcher (EN/AR)
- **Main content area** with breadcrumbs
- **Responsive**: Mobile tablet, desktop

### Key Admin Pages

#### 1. Login Page
- Email/password form
- "Forgot Password" link
- "Remember Me" checkbox
- Branding/logo

#### 2. Dashboard
- Stats cards (4-6 key metrics)
- Charts:
  - Donation trend line chart
  - Campaign performance bar chart
  - Pie chart for donation distribution
- Recent activities table
- Quick actions buttons

#### 3. Content List Pages (Paths, Programs, Campaigns, Posts, Media)
- Data table with:
  - Search/filter bar
  - Column sorting
  - Pagination
  - Bulk actions (delete, status change)
  - Quick edit icons
- "Create New" button (prominent)
- Export button
- Status badges (active, draft, archived)

#### 4. Content Edit/Create Forms
- Tabbed interface for EN/AR content
- Rich text editor for long descriptions
- Image upload with preview
- Drag-drop for galleries
- Auto-save drafts
- Preview button
- Save, Publish, Delete actions

#### 5. Donations Page
- Advanced filters (date range, campaign, amount range, status)
- Summary stats at top
- Exportable table
- Detail modal with:
  - Donor info
  - Payment details
  - Refund option
  - Resend receipt button

#### 6. Volunteers Page
- Kanban board OR table view toggle
- Status columns (New, Reviewed, Contacted, Accepted, Rejected)
- Quick status update
- Detail drawer with:
  - Full application
  - Admin notes section
  - Timeline of status changes

#### 7. Media Library
- Grid view with thumbnails
- Upload area (drag-drop, multi-file)
- Filter by type, category, date
- Click to preview/edit metadata
- Copy URL button

#### 8. Settings Page
- Grouped settings (General, Email, Payment, etc.)
- Form controls
- Test email/payment buttons
- Save confirmation

#### 9. User Management
- Table of admin users
- Invite new user form
- Role badges
- Last login info
- Suspend/activate toggles

### Notifications
- Toast notifications for:
  - Successful actions
  - Errors
  - Warnings
- In-app notification bell for:
  - New donations
  - New volunteer applications
  - New contact messages
  - Campaign milestones

### Loading States
- Skeleton screens for tables
- Loading spinners for actions
- Progress bars for uploads

### Error Handling
- Friendly error messages
- Retry buttons where applicable
- Fallback UI for failed loads

---

## Security Requirements

### Authentication & Authorization
1. **Secure Authentication**
   - Email/password with strong password requirements
   - Password hashing (bcrypt or argon2)
   - Session management with HTTP-only cookies
   - Optional: Multi-factor authentication (MFA)
   - Account lockout after failed attempts

2. **Role-Based Access Control (RBAC)**
   - Enforce permissions on both client and server
   - API middleware to check user role
   - UI elements hidden based on permissions

3. **Session Security**
   - Session timeout after inactivity (30 minutes)
   - Secure session storage
   - Logout on browser close option

### Data Security
1. **Input Validation**
   - Zod schemas for all form inputs
   - Server-side validation (never trust client)
   - XSS prevention (sanitize rich text)
   - SQL injection prevention (parameterized queries via ORM)

2. **File Upload Security**
   - Validate file types and sizes
   - Scan for malware (if budget allows)
   - Serve files from separate domain or CDN
   - Generate unique file names

3. **API Security**
   - Rate limiting (prevent DDoS)
   - CORS configuration
   - CSRF protection for state-changing operations
   - API key rotation

### Data Privacy
1. **PII Protection**
   - Encrypt sensitive data at rest
   - HTTPS everywhere (in transit)
   - Donor anonymity respected
   - GDPR/data protection compliance

2. **Audit Logging**
   - Log all admin actions
   - IP address and timestamp tracking
   - Immutable logs

### Infrastructure Security
1. **Environment Variables**
   - Never commit secrets to git
   - Use Vercel environment variables
   - Separate test/production keys

2. **Database Security**
   - Row Level Security (RLS) enabled
   - Service role key only on server
   - Regular backups
   - Encryption at rest

3. **Third-Party Services**
   - Stripe: Use webhook signatures
   - Email: API keys secured
   - Storage: Signed URLs with expiration

---

## Cost Analysis

### Assumptions
- **Traffic**: 
  - Public site: ~10,000 visitors/month
  - Admin portal: 5-10 active users
- **Storage**: 
  - Images/videos: ~5GB first year, growing 2GB/year
  - Database: < 1GB for first year
- **Emails**: ~500 emails/month (receipts, notifications)
- **Donations**: 200 transactions/month (varies)

### Option 1: Supabase

#### Free Tier Limits
- **Database**: 500MB (PostgreSQL)
- **Storage**: 1GB
- **Bandwidth**: 2GB
- **Authentication**: Unlimited users
- **Realtime**: Included
- **Edge Functions**: 500K invocations/month

#### Pro Tier ($25/month)
- **Database**: 8GB included, then $0.125/GB
- **Storage**: 100GB included, then $0.021/GB
- **Bandwidth**: 50GB included, then $0.09/GB
- **No project pause**
- **Daily backups**
- **Email support**

#### Projected Costs (Year 1)

**Months 1-6 (MVP Phase): FREE**
- Database: < 500MB
- Storage: < 1GB
- Bandwidth: < 2GB/month
- **Cost: $0/month**

**Months 7-12 (Growth Phase): Pro Tier**
- Database: ~2GB
- Storage: ~5GB
- Bandwidth: ~10GB/month
- **Cost: $25/month**

**Year 1 Total: ~$150**

#### Scaling Costs (Year 2 Projection)
- Pro tier: $25/month
- Additional storage: 10GB = 100GB included (no extra cost)
- Additional bandwidth: 20GB = 50GB included (no extra cost)
- **Year 2 Total: ~$300**

### Option 2: Appwrite

#### Self-Hosted (Free, but requires server)
- **VPS Required**: DigitalOcean Droplet ($12-24/month)
- **Maintenance**: Your time/effort
- **Backups**: Manual or automated scripts
- **SSL**: Free (Let's Encrypt)
- **Scaling**: Manual horizontal scaling

#### Appwrite Cloud (Currently in Beta/Waitlist)
- **Free Tier**: TBD (not publicly available yet)
- **Paid Tiers**: Pricing not announced
- **Note**: As of October 2025, Appwrite Cloud is not fully launched

#### Projected Costs (Year 1) - Self-Hosted

**VPS Hosting (DigitalOcean/Hetzner):**
- Basic Droplet: $12/month (2GB RAM, 1 vCPU, 50GB SSD)
- Better Droplet: $24/month (4GB RAM, 2 vCPU, 80GB SSD)

**Backup Storage:**
- DigitalOcean Spaces (S3-compatible): $5/month for 250GB

**Year 1 Total (Self-Hosted): ~$204-$348**

**Considerations:**
- Requires server management skills
- More control but more responsibility
- Setup time investment
- Security updates manual

### Additional Service Costs (Both Options)

#### Vercel (Frontend Hosting)
- **Hobby Tier**: FREE
  - 100GB bandwidth
  - Unlimited requests
  - Perfect for MVP
- **Pro Tier**: $20/month (if needed later)
  - Advanced analytics
  - Team collaboration

#### Stripe (Payments)
- **No monthly fee**
- **Transaction fees**: 2.9% + 30¢ per transaction
- **Example**: $10,000/month donations = ~$320 in fees
  - This is a cost of doing business, not infrastructure

#### Email Service (Resend or SendGrid)
- **Resend**: 
  - Free: 100 emails/day (3,000/month)
  - Paid: $20/month for 50,000 emails
- **SendGrid**:
  - Free: 100 emails/day
  - Essentials: $20/month for 50,000 emails

**Year 1 Email Cost: $0** (free tier sufficient)

#### Domain & SSL
- **Domain**: ~$12/year (already owned)
- **SSL**: FREE (Vercel includes)

### Total Cost Comparison

#### Option A: Supabase + Vercel
| Period | Supabase | Vercel | Email | Total/Month |
|---|---|---|---|---|
| Months 1-6 | $0 | $0 | $0 | **$0** |
| Months 7-12 | $25 | $0 | $0 | **$25** |
| **Year 1 Total** | | | | **~$150** |

#### Option B: Appwrite (Self-Hosted) + Vercel
| Period | VPS | Backup | Vercel | Email | Total/Month |
|---|---|---|---|---|---|
| Months 1-12 | $12-24 | $5 | $0 | $0 | **$17-29** |
| **Year 1 Total** | | | | | **~$204-$348** |

### Cost Analysis Summary

**Cheapest Start**: Supabase (literally $0 for first 6 months)
**Lowest Year 1**: Supabase (~$150)
**Most Control**: Appwrite Self-Hosted
**Best for Growth**: Supabase (scales automatically)
**Best for Non-Technical Team**: Supabase (managed service)

### Hidden Costs Consideration

**Supabase:**
- ✅ No hidden costs
- ✅ Clear pricing
- ✅ Easy to predict
- ❌ Vendor lock-in (but data exportable)

**Appwrite Self-Hosted:**
- ⚠️ Server admin time (your time = money)
- ⚠️ Security management
- ⚠️ Backup/disaster recovery planning
- ⚠️ Potential downtime costs
- ✅ No vendor lock-in

---

## Database Recommendation

### Winner: **Supabase** 🏆

### Reasoning

#### 1. **Cost-Effectiveness for Your Use Case**
- **Zero cost to start** (critical for non-profit MVP)
- Free tier covers first 6 months comfortably
- $25/month after that is predictable and affordable
- No surprise costs or server management fees

#### 2. **Technical Fit**
- **PostgreSQL**: Robust, mature, excellent for relational data
- **Row Level Security (RLS)**: Perfect for multi-role admin system
- **Realtime**: Can add live dashboard updates later
- **Storage**: Integrated file storage (images, PDFs)
- **Full-text Search**: Built-in for searching content
- **PostgREST**: Auto-generated REST API
- **Edge Functions**: Serverless functions if needed

#### 3. **Developer Experience**
- **Excellent Next.js integration** with official libraries
- **TypeScript support** out of the box
- **Great documentation** and active community
- **Auth built-in**: Supabase Auth handles admin login
- **SQL migrations**: Version-controlled schema changes
- **Studio UI**: Visual database management

#### 4. **Time to Market**
- Setup in minutes, not hours
- No server provisioning
- No security hardening needed
- Focus on features, not infrastructure

#### 5. **Scalability**
- Automatic scaling (don't worry about traffic spikes)
- Easy upgrade path (just change tier)
- Connection pooling included
- Global CDN for storage

#### 6. **Your Context**
- You mentioned "no cost" preference → Supabase free tier
- Non-technical team likely → Managed service better
- Deployed on Vercel → Supabase pairs perfectly
- Next.js expertise → Supabase has best Next.js docs

### When Appwrite Might Be Better
- If you already have DevOps expertise
- If you need on-premise deployment (data sovereignty)
- If you want document-based flexibility (Appwrite's DB)
- If Appwrite Cloud launches with better pricing

### Recommendation for Your Roadmap

**Phase 1 (Months 1-6): Supabase Free Tier**
- Set up database with all tables
- Implement authentication
- Build admin portal
- Launch MVP
- **Cost: $0**

**Phase 2 (Months 7-12): Supabase Pro**
- Upgrade when you hit limits or need backups
- Add daily backups for security
- Scale as donations grow
- **Cost: $25/month**

**Optional: Hybrid Approach**
- Use Supabase for database + auth + storage
- Add Appwrite Functions if Supabase Edge Functions insufficient
- But likely unnecessary; Supabase covers all needs

### Migration Path (If Needed Later)
- Supabase data is PostgreSQL → easy to export
- Can migrate to self-hosted PostgreSQL anytime
- Not locked in, just convenient

---

## Implementation Phases

### Phase 0: Planning & Setup (Week 1)
**Duration**: 3-5 days

**Tasks:**
- Finalize requirements (this document)
- Set up Supabase project
- Configure environment variables
- Set up admin authentication flow
- Create initial database schema
- Set up basic admin routes structure

**Deliverables:**
- Supabase project live
- Database tables created
- Admin login page functional
- Environment configured

**Team:**
- 1 Developer

### Phase 1: Core Admin Infrastructure (Weeks 2-3)
**Duration**: 10-14 days

**Tasks:**
- Implement admin authentication (Supabase Auth)
- Build admin layout (sidebar, top bar)
- Create dashboard with basic stats
- Implement role-based access control middleware
- Set up API route structure
- Create reusable admin UI components (tables, forms)

**Deliverables:**
- Admin can log in
- Dashboard shows placeholder stats
- Routing works
- Protected routes enforced

**Team:**
- 1 Developer

### Phase 2: Content Management (Weeks 4-6)
**Duration**: 15-20 days

**Tasks:**
- **Paths Management**: CRUD interface
- **Programs Management**: CRUD interface with rich text editor
- **Campaigns Management**: CRUD with Zakat toggle
- **Posts Management**: CRUD with publishing workflow
- **Media Library**: Upload, organize, tag
- Implement image upload to Supabase Storage
- Connect admin forms to database
- Build public API endpoints for fetching data

**Deliverables:**
- Admin can manage all content types
- Public site fetches data from database (not hardcoded)
- Images upload and display correctly

**Team:**
- 1-2 Developers

### Phase 3: Donations & Volunteers (Week 7)
**Duration**: 5-7 days

**Tasks:**
- Donations management page (view, filter, export)
- Update Stripe webhook to save to database
- Receipt resend functionality
- Volunteers management page
- Volunteer positions CRUD
- Contact messages management
- Email notifications setup (Resend)

**Deliverables:**
- All donations in database
- Admin can view and manage volunteers
- Email notifications working

**Team:**
- 1 Developer

### Phase 4: Reporting & Analytics (Week 8)
**Duration**: 5-7 days

**Tasks:**
- Dashboard real-time stats
- Financial analytics charts
- Campaign performance analytics
- Transparency reports upload and management
- Export functionality (CSV, Excel)
- Activity logs implementation

**Deliverables:**
- Dashboard shows live data
- Charts and visualizations working
- Reports can be uploaded and downloaded

**Team:**
- 1 Developer

### Phase 5: Settings & Users (Week 9)
**Duration**: 3-5 days

**Tasks:**
- Admin user management (invite, roles, suspend)
- Settings management interface
- Email templates customization
- General site settings (contact info, social links)

**Deliverables:**
- Super admin can manage users
- Settings can be updated via UI

**Team:**
- 1 Developer

### Phase 6: Testing & Refinement (Week 10)
**Duration**: 5-7 days

**Tasks:**
- End-to-end testing of all workflows
- Security audit (XSS, CSRF, SQL injection)
- Performance optimization
- Mobile responsiveness check
- Accessibility audit
- Bug fixes
- User acceptance testing (UAT)

**Deliverables:**
- All major bugs fixed
- Security vulnerabilities addressed
- Performance benchmarks met

**Team:**
- 1 Developer + 1 QA/Tester

### Phase 7: Documentation & Training (Week 11)
**Duration**: 3-5 days

**Tasks:**
- Admin user manual (with screenshots)
- Video tutorials for common tasks
- Developer documentation
- Deployment checklist
- Training sessions for admin staff

**Deliverables:**
- Complete user manual
- Training videos
- Technical documentation

**Team:**
- 1 Developer + 1 Technical Writer (or same developer)

### Phase 8: Launch & Monitoring (Week 12)
**Duration**: 2-3 days

**Tasks:**
- Final deployment to production
- Migration of existing data to database
- Set up monitoring (error tracking, uptime)
- Final security review
- Go-live checklist
- Post-launch support plan

**Deliverables:**
- Admin portal live in production
- Data migrated successfully
- Monitoring active
- Team trained

**Team:**
- 1 Developer + Stakeholders

### Total Timeline: **10-12 weeks** (2.5-3 months)

### Resource Requirements
- **Primary Developer**: 1 full-time (or 2 part-time)
- **QA/Tester**: 1 part-time (weeks 10-12)
- **Optional**: 1 Designer for admin UI polish
- **Stakeholder Availability**: For UAT and training

---

## Success Metrics

### Launch Success Criteria (Month 1)
- ✅ All admin users can log in successfully
- ✅ 100% of static content migrated to database
- ✅ All CRUD operations functional with zero data loss
- ✅ Public site loads content from database in < 2 seconds
- ✅ Zero security vulnerabilities (based on audit)
- ✅ Mobile responsive admin interface
- ✅ Admin staff trained and comfortable using system

### Operational Metrics (Ongoing)
1. **Performance**
   - Admin dashboard load time: < 2 seconds
   - API response time: < 500ms (p95)
   - Image upload success rate: > 99%
   - Database query time: < 100ms (p95)

2. **Reliability**
   - Uptime: > 99.9% (less than 44 minutes downtime/month)
   - Error rate: < 0.1% of requests
   - Successful donation processing: > 99%

3. **Usability**
   - Admin task completion rate: > 95%
   - Average time to publish content: < 5 minutes
   - User satisfaction score: > 4/5

4. **Business Impact**
   - Content update frequency: 3+ times/week
   - Campaign creation time: < 15 minutes
   - Donation data accuracy: 100%
   - Volunteer response time: < 48 hours

### Key Performance Indicators (KPIs)

**Content Management:**
- Number of campaigns published per month
- Number of posts published per month
- Media assets uploaded per month
- Average time from creation to publication

**Donations:**
- Total donations processed via system
- Average donation amount
- Recurring donation conversion rate
- Donation error rate

**Engagement:**
- Volunteer applications processed per month
- Contact messages response time
- Admin user active sessions per week

**Technical:**
- Database storage used vs. available
- API call volume and trends
- Error logs and resolution time
- Security incidents (target: 0)

---

## Appendix

### A. Glossary

- **Zakat**: Islamic charitable giving, specific campaigns eligible
- **Path**: One of four main program categories
- **Program/Project**: Specific initiative under a path
- **Campaign**: Fundraising drive with monetary goal
- **RLS**: Row Level Security (database security feature)
- **CRUD**: Create, Read, Update, Delete operations
- **RTL**: Right-to-Left (Arabic text direction)
- **SSR**: Server-Side Rendering
- **ISR**: Incremental Static Regeneration

### B. References

- **Supabase Documentation**: https://supabase.com/docs
- **Next.js App Router**: https://nextjs.org/docs/app
- **Stripe API**: https://stripe.com/docs/api
- **Shadcn UI**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/docs

### C. Contact & Escalation

**For Questions on This Document:**
- Technical Lead: [Your Name/Email]
- Product Owner: [Stakeholder Name/Email]

**For Development Issues:**
- Supabase Support: support@supabase.io
- Vercel Support: support@vercel.com

---

## Document Approval

**Prepared By**: AI Assistant (GitHub Copilot)  
**Date**: October 31, 2025  
**Version**: 1.0  

**Review & Approval:**
- [ ] Project Owner: _____________________ Date: _______
- [ ] Technical Lead: _____________________ Date: _______
- [ ] Finance/Budget: _____________________ Date: _______

---

## Next Steps

1. **Review this document** with stakeholders
2. **Get budget approval** for Supabase Pro tier (~$150/year)
3. **Create Supabase account** and project
4. **Set up development environment**
5. **Begin Phase 0** of implementation
6. **Schedule weekly check-ins** during development

---

**End of Requirements Document**
