# Sawaed Al-Islah Platform# Firebase Studio

## Education & Humanitarian Aid Organization Website

This is a NextJS starter in Firebase Studio.

<div align="center">

To get started, take a look at src/app/page.tsx.

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-Private-red)

*Building Generations of Reformers*

[English](#english) | [العربية](#arabic)

</div>

---

## English

### 🌟 Project Overview

The **Sawaed Al-Islah Platform** is a bilingual (Arabic/English) website for a non-profit education and humanitarian organization. The platform showcases programs, campaigns, and achievements while facilitating donations, volunteering, and transparent reporting.

**Mission**: Supporting displaced individuals, refugees, and underserved communities through education, empowerment, and humanitarian aid.

### 🎨 Branding & Design

- **Primary Color**: Green `#1B7B3A` (HSL: 139, 64%, 29%)
- **Accent Colors**: Light gray and white
- **Fonts**: 
  - Arabic: Cairo
  - English: Poppins
- **Design Philosophy**: Minimal, clean, mobile-first, and accessible

### 🗂️ Site Structure

#### Navigation Menu (Top Bar)
1. About Us (من نحن)
2. Paths (المسارات)
3. Campaigns (الحملات)
4. Media Gallery (معرض الوسائط)
5. Volunteer (تطوع)
6. Transparency (الشفافية)
7. Contact Us (اتصل بنا)

*Note: "News & Challenges" appear only at the bottom of the homepage*

### 🛤️ The Four Paths

1. **Education & Empowerment** (التعليم والتمكين)
   - Quality education and skills training programs
   
2. **Sponsoring Reformers** (رعاية المصلحين)
   - Supporting individuals committed to positive change
   
3. **Educational Nurseries** (الحضانات التعليمية)
   - Early childhood education programs
   
4. **General Reform Programs** (برامج الإصلاح العامة)
   - Comprehensive community development initiatives

### ✨ Key Features

#### Homepage
- **Hero Section**: Rotating background images (3), title, subtitle, optional intro video popup
- **Call-to-Action Buttons**: 
  - Donation Fields
  - Register as Sponsor
  - Volunteer Now
- **Achievements Section**: Animated counters with key statistics
- **Featured Campaigns**: Showcase of active fundraising campaigns
- **Four Paths Section**: Display paths with related programs/projects
- **Quranic Verse**: *"I only intend reform as much as I am able. And my success is not but through Allah."* (Hud: 88)
- **News & Challenges**: Latest updates and announcements

#### Zakat Stamp System 🟢🔴
- **Green Stamp**: "Zakat Supported" - visible on eligible campaigns/projects
- **Red Stamp**: "Zakat Not Supported"
- Admin-controlled toggle system
- Persistent in database
- Displayed on all campaign/project cards

#### Multilingual Support
- Arabic (AR) with RTL support
- English (EN) with LTR layout
- Dynamic language switching
- Locale-specific fonts and formatting

### 🛠️ Tech Stack

**Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **State**: React Hooks
- **Icons**: Lucide React

**Backend** (Recommended - Upcoming)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Email**: Resend / SendGrid
- **Payments**: Stripe

**Why Supabase?**
- ✅ Generous free tier (perfect for small-scale)
- ✅ Hosted PostgreSQL with instant REST/GraphQL APIs
- ✅ Built-in Auth, Storage, and Row-Level Security
- ✅ Excellent Next.js integration
- ✅ No infrastructure management needed
- ✅ Fast setup (minutes, not days)

### 📦 Installation & Setup

#### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

#### Quick Start

```powershell
# Clone the repository
git clone https://github.com/muhammadamanumer/sawaid.git
cd sawaid

# Install dependencies
npm install

# Create environment file
New-Item -Path .env.local -ItemType File

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

#### Environment Variables

Create a `.env.local` file in the root directory:

```env
# App Configuration
NEXT_PUBLIC_MAINTENANCE=0
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Supabase (Coming Soon)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (Coming Soon)
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email (Coming Soon)
RESEND_API_KEY=your_resend_key
```

### 📁 Project Structure

```
sawaid/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About Us page
│   │   ├── campaigns/         # Campaigns listing & details
│   │   ├── contact/           # Contact page
│   │   ├── donate/            # Donation page
│   │   ├── gallery/           # Media gallery
│   │   ├── paths/             # Four main paths page
│   │   ├── transparency/      # Financial reports
│   │   ├── volunteer/         # Volunteer portal
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── shared/            # Logo, etc.
│   │   ├── ui/                # Shadcn UI components
│   │   ├── campaign-card.tsx  # Campaign display card
│   │   ├── donate-form.tsx    # Donation form
│   │   └── progress-bar.tsx   # Animated progress bar
│   ├── hooks/
│   │   ├── use-translation.tsx # i18n hook
│   │   └── use-toast.ts       # Toast notifications
│   ├── lib/
│   │   ├── data.ts            # Static data (campaigns, paths)
│   │   ├── translations.ts    # AR/EN translations
│   │   ├── types.ts           # TypeScript types
│   │   └── utils.ts           # Utility functions
│   ├── ai/                    # AI integrations (optional)
│   ├── middleware.ts          # Route middleware
│   └── i18n-config.ts         # i18n configuration
├── public/
│   └── Logo/                  # Logo assets
├── docs/
│   └── blueprint.md           # Technical blueprint
├── components.json            # Shadcn UI config
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── README.md                  # This file
└── ROADMAP.md                 # Development roadmap
```

### 🚀 Development Roadmap

See [ROADMAP.md](./ROADMAP.md) for the detailed phased development plan.

#### Phase 0: ✅ Foundation (Completed)
- [x] Fix middleware to allow all routes
- [x] Update branding to green (#1B7B3A)
- [x] Configure Cairo/Poppins fonts
- [x] Update navigation order (removed News from top, added Paths)
- [x] Add Paths page with 4 main tracks
- [x] Implement Zakat stamps on campaign cards
- [x] Update translations for all new sections

#### Phase 1: 🎨 Static Website Design (Current - Days 1-4)
- [ ] Redesign homepage hero with 3 rotating background images
- [ ] Update hero title to "Sawaed Al-Islah Foundation — Building Generations of Reformers"
- [ ] Add 3 CTA buttons (Donation Fields, Register as Sponsor, Volunteer Now)
- [ ] Replace "Global Impact" with "Achievements" section (animated counters)
- [ ] Add Paths section below Featured Campaigns with dynamic programs
- [ ] Add Quranic verse section (Hud: 88) in green-styled block
- [ ] Move News & Challenges to homepage footer only
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Mobile responsiveness testing

#### Phase 2: 🗄️ Backend & CMS Setup (Days 5-7)
- [ ] Create Supabase project (free tier)
- [ ] Design and implement database schema:
  - `paths` table (4 main tracks)
  - `programs` table (linked to paths)
  - `campaigns` table (with zakatSupported field)
  - `donations` table (Stripe payment tracking)
  - `volunteers` table (application submissions)
  - `media_assets` table (gallery items)
  - `posts` table (news/challenges)
  - `reports` table (transparency documents)
- [ ] Set up Row-Level Security (RLS) policies
- [ ] Create Next.js API routes for data fetching
- [ ] Replace hardcoded data with dynamic database queries
- [ ] Implement ISR/SSR for performance

#### Phase 3: 📝 Forms & Email Integration (Day 8)
- [ ] Wire volunteer form to Supabase
- [ ] Wire contact form to Supabase
- [ ] Integrate Resend for email notifications (free tier)
- [ ] Add honeypot spam protection
- [ ] Implement server-side rate limiting
- [ ] Add form validation and error handling

#### Phase 4: 👨‍💼 Admin Panel (Days 9-11)
- [ ] Implement Supabase Auth (magic link for admins)
- [ ] Create protected `/admin` routes
- [ ] Build CRUD interfaces:
  - Manage Paths
  - Manage Programs/Projects
  - Manage Campaigns (with Zakat toggle)
  - Manage Media Gallery
  - Manage News/Posts
  - Upload Transparency Reports
  - View Donations & Volunteers
- [ ] Add rich text editor for content
- [ ] Implement image upload to Supabase Storage

#### Phase 5: 💳 Payment Integration (Days 12-14)
- [ ] Set up Stripe account
- [ ] Create donation API routes:
  - `/api/donations/create-intent` (one-time & recurring)
  - `/api/webhooks/stripe` (payment processing)
- [ ] Implement donation form with amount selection
- [ ] Add campaign-specific donation routing
- [ ] Set up Stripe webhooks to update `raised_amount`
- [ ] Send email receipts via Resend
- [ ] Test with Stripe test cards

#### Phase 6: 📊 Transparency & Reports (Day 15)
- [ ] Upload transparency report PDFs to Supabase Storage
- [ ] Index reports in database
- [ ] Create public transparency page with download links
- [ ] Add optional charts from aggregated data
- [ ] Implement AR/EN content for reports

#### Phase 7: 📸 Media Gallery (Days 16-17)
- [ ] Implement Supabase Storage for media uploads
- [ ] Create media gallery grid with filters
- [ ] Add support for images and videos (YouTube/Vimeo embeds)
- [ ] Implement lazy loading and thumbnails
- [ ] Add AR/EN captions and metadata

#### Phase 8: 🔍 SEO & Analytics (Day 18)
- [ ] Generate `sitemap.xml`
- [ ] Configure `robots.txt`
- [ ] Add metadata and OpenGraph images to all pages
- [ ] Set up analytics (Plausible or Google Analytics)
- [ ] Test SEO with Lighthouse

#### Phase 9: 🔒 Security & Performance (Day 19)
- [ ] Add CSRF protection on admin forms
- [ ] Implement rate limiting on all POST endpoints
- [ ] Add input validation and sanitization
- [ ] Run Lighthouse audit (target: 90+ scores)
- [ ] Optimize images and fonts
- [ ] Enable Vercel Edge caching

#### Phase 10: 🚀 Launch (Day 20)
- [ ] Deploy to Vercel production
- [ ] Configure custom domain + SSL
- [ ] Set up uptime monitoring (UptimeRobot or Cronitor)
- [ ] Final QA testing (AR/EN, mobile, desktop)
- [ ] Prepare launch announcement

### 🎯 Current Sprint: UI Completion

**Active Tasks:**
1. ⏳ Redesign homepage hero section with rotating images
2. ⏳ Add 3 CTA buttons with proper routing
3. ⏳ Create Achievements section with animated counters
4. ⏳ Add Paths section on homepage showing 4 tracks + programs
5. ⏳ Style Quranic verse section in green
6. ⏳ Move News & Challenges to homepage footer

**Completed:**
- ✅ Fixed middleware (all routes accessible)
- ✅ Updated color scheme to green #1B7B3A
- ✅ Configured Cairo/Poppins fonts
- ✅ Updated navigation (About, Paths, Campaigns, Gallery, Volunteer, Transparency, Contact)
- ✅ Created `/paths` page with 4 main tracks
- ✅ Added Zakat stamps to campaign cards (green/red badges)
- ✅ Updated translations for all new sections

**Acceptance Criteria:**
- ✅ All pages reachable without redirects
- ✅ Green branding (#1B7B3A) applied consistently
- ✅ Cairo font for Arabic, Poppins for English
- ✅ Navigation order matches technical scope
- ✅ Zakat stamps visible on campaigns
- ⏳ Homepage matches design spec (hero, CTAs, achievements, paths, verse, footer news)
- ⏳ Mobile-friendly and accessible (WCAG 2.1 AA)

### 🐛 Known Issues & Next Steps

**Resolved:**
- [x] ~~Middleware redirecting all pages to homepage~~ → Fixed in Phase 0
- [x] ~~Navigation missing "Paths" link~~ → Added
- [x] ~~No Zakat support indicators~~ → Green/Red badges implemented

**To Do:**
- [ ] Replace placeholder images with actual brand assets
- [ ] Complete homepage redesign (hero, CTAs, verse section)
- [ ] Add animated counter components for Achievements
- [ ] Wire forms to backend (no database yet)
- [ ] Set up Supabase project and migrate static data

### 📊 Database Schema (Supabase)

See [ROADMAP.md - Section 7](./ROADMAP.md#7-data-model-supabase-sql-minimal-mvp) for complete SQL schema including:
- Paths & Programs (with Zakat support)
- Campaigns & Donations
- Volunteers & Applications
- Media Assets & Gallery
- News/Posts & Reports
- Row-Level Security policies

### 🤝 Contributing

This is a private project for a non-profit organization. For inquiries about contributions or partnerships, please contact the project maintainer.

### 📞 Support & Contact

- **Organization**: Sawaed Al-Islah Foundation
- **Repository**: [github.com/muhammadamanumer/sawaid](https://github.com/muhammadamanumer/sawaid)
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Branch**: `main`

### 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or modification is prohibited.

© 2025 Sawaed Al-Islah Foundation. All rights reserved.

---

## Arabic

<div dir="rtl" lang="ar">

### 🌟 نظرة عامة على المشروع

**منصة سواعد الإصلاح** هي موقع ويب ثنائي اللغة (عربي/إنجليزي) لمنظمة تعليمية وإنسانية غير ربحية. تعرض المنصة البرامج والحملات والإنجازات مع تسهيل التبرعات والتطوع وإعداد التقارير الشفافة.

**الرسالة**: دعم النازحين واللاجئين والمجتمعات المحرومة من خلال التعليم والتمكين والمساعدات الإنسانية.

### 🎨 الهوية والتصميم

- **اللون الأساسي**: الأخضر `#1B7B3A`
- **الألوان المساعدة**: رمادي فاتح وأبيض
- **الخطوط**:
  - العربية: Cairo
  - الإنجليزية: Poppins
- **فلسفة التصميم**: بسيط، نظيف، متجاوب مع الأجهزة المحمولة، وسهل الوصول

### 🗂️ هيكل الموقع

#### القائمة العلوية
1. من نحن
2. المسارات (جديد)
3. الحملات
4. معرض الوسائط
5. تطوع
6. الشفافية
7. اتصل بنا

*ملاحظة: تظهر "الأخبار والتحديات" فقط في أسفل الصفحة الرئيسية*

### 🛤️ المسارات الأربعة

1. **التعليم والتمكين**
   - برامج تعليم عالية الجودة وتدريب على المهارات

2. **رعاية المصلحين**
   - دعم الأفراد الملتزمين بالتغيير الإيجابي

3. **الحضانات التعليمية**
   - برامج التعليم المبكر للأطفال

4. **برامج الإصلاح العامة**
   - مبادرات شاملة لتنمية المجتمع

### ✨ الميزات الرئيسية

#### الصفحة الرئيسية
- **قسم العنوان الرئيسي**: صور خلفية دوارة (3)، عنوان "مؤسسة سواعد الإصلاح — بناء أجيال المصلحين"
- **أزرار الحث على اتخاذ إجراء**:
  - مجالات التبرع
  - سجل كراعٍ
  - تطوع الآن
- **قسم الإنجازات**: عدادات متحركة مع إحصائيات رئيسية
- **الحملات المميزة**: عرض الحملات النشطة لجمع التبرعات
- **قسم المسارات الأربعة**: عرض المسارات مع البرامج/المشاريع ذات الصلة
- **الآية القرآنية**: ﴿إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ﴾ (هود: 88)
- **الأخبار والتحديات**: آخر التحديثات والإعلانات (أسفل الصفحة فقط)

#### نظام ختم الزكاة 🟢🔴
- **الختم الأخضر**: "يمكن التبرع من أموال الزكاة" - يظهر على الحملات/المشاريع المؤهلة
- **الختم الأحمر**: "لا يمكن التبرع من أموال الزكاة"
- نظام تبديل يتحكم فيه المسؤول من لوحة التحكم
- يُحفظ في قاعدة البيانات
- يُعرض على جميع بطاقات الحملات/المشاريع تلقائيًا

#### الدعم متعدد اللغات
- العربية مع دعم الاتجاه من اليمين إلى اليسار (RTL)
- الإنجليزية مع تخطيط من اليسار إلى اليمين (LTR)
- التبديل الديناميكي للغة
- خطوط وتنسيق خاص باللغة

### 🛠️ التقنيات المستخدمة

**الواجهة الأمامية**
- **الإطار**: Next.js 14 (App Router)
- **اللغة**: TypeScript
- **التنسيق**: Tailwind CSS + Shadcn UI
- **الأيقونات**: Lucide React

**الخادم** (موصى به - قادم)
- **قاعدة البيانات**: Supabase (PostgreSQL)
- **المصادقة**: Supabase Auth
- **التخزين**: Supabase Storage
- **البريد الإلكتروني**: Resend / SendGrid
- **الدفع**: Stripe

**لماذا Supabase؟**
- ✅ خطة مجانية سخية (مثالية للمشاريع الصغيرة)
- ✅ قاعدة بيانات PostgreSQL مع REST/GraphQL فوري
- ✅ مصادقة وتخزين وأمان مدمج
- ✅ تكامل ممتاز مع Next.js
- ✅ لا حاجة لإدارة البنية التحتية
- ✅ إعداد سريع (دقائق، وليس أيام)

### 📦 التثبيت والإعداد

```powershell
# استنساخ المستودع
git clone https://github.com/muhammadamanumer/sawaid.git
cd sawaid

# تثبيت التبعيات
npm install

# إنشاء ملف البيئة
New-Item -Path .env.local -ItemType File

# تشغيل خادم التطوير
npm run dev

# فتح المتصفح وانتقل إلى
# http://localhost:3000
```

### 🚀 خارطة الطريق

راجع [ROADMAP.md](./ROADMAP.md) للحصول على خطة التطوير التفصيلية المرحلية.

#### المرحلة 0: ✅ الأساس (مكتمل)
- [x] إصلاح middleware للسماح بجميع المسارات
- [x] تحديث العلامة التجارية إلى اللون الأخضر #1B7B3A
- [x] تكوين خطوط Cairo/Poppins
- [x] تحديث ترتيب التنقل (إزالة الأخبار من الأعلى، إضافة المسارات)
- [x] إضافة صفحة المسارات مع 4 مسارات رئيسية
- [x] تنفيذ أختام الزكاة على بطاقات الحملات
- [x] تحديث الترجمات لجميع الأقسام الجديدة

#### المرحلة الحالية: 🎨 تصميم الموقع الثابت (الأيام 1-4)
- [ ] إعادة تصميم قسم العنوان الرئيسي مع 3 صور دوارة
- [ ] إضافة 3 أزرار حث على اتخاذ إجراء
- [ ] استبدال "تأثيرنا العالمي" بقسم "إنجازاتنا"
- [ ] إضافة قسم المسارات أسفل الحملات المميزة
- [ ] إضافة قسم الآية القرآنية بتصميم أخضر
- [ ] نقل الأخبار والتحديات إلى أسفل الصفحة الرئيسية

### 📞 الاتصال

- **المنظمة**: مؤسسة سواعد الإصلاح
- **المستودع**: [github.com/muhammadamanumer/sawaid](https://github.com/muhammadamanumer/sawaid)
- **البريد الإلكتروني**: للاستفسارات عن المساهمات أو الشراكات

### 📄 الترخيص

هذا المشروع خاص وسري. يُحظر النسخ أو التوزيع أو التعديل غير المصرح به.

© 2025 مؤسسة سواعد الإصلاح. جميع الحقوق محفوظة.

</div>

---

<div align="center">

**صُنع بـ ❤️ من أجل القضايا الإنسانية**

**Made with ❤️ for humanitarian causes**

</div>
