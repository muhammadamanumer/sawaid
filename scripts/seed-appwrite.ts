import { Client, Databases, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const API_KEY = process.env.APPWRITE_API_KEY!;
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const DATABASE_ID = 'sawaed_core';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

// Get available attributes for a collection
async function getAvailableAttrs(collId: string): Promise<Set<string>> {
    const coll = await databases.getCollection(DATABASE_ID, collId);
    return new Set(coll.attributes.filter((a: any) => a.status === 'available').map((a: any) => a.key));
}

// Filter object to only include available attributes
function filterData(data: Record<string, any>, availableKeys: Set<string>): Record<string, any> {
    const filtered: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
        if (availableKeys.has(key)) {
            filtered[key] = value;
        }
    }
    return filtered;
}

async function seed() {
    console.log('🌱 Starting adaptive seed process...\n');

    // Get available attributes for each collection
    const pathsAttrs = await getAvailableAttrs('paths');
    const programsAttrs = await getAvailableAttrs('programs');
    const campaignsAttrs = await getAvailableAttrs('campaigns');
    const positionsAttrs = await getAvailableAttrs('volunteer_positions');

    console.log('Available attributes:');
    console.log('  paths:', Array.from(pathsAttrs).join(', '));
    console.log('  programs:', Array.from(programsAttrs).join(', '));
    console.log('  campaigns:', Array.from(campaignsAttrs).join(', '));
    console.log('  positions:', Array.from(positionsAttrs).join(', '));
    console.log('');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    for (const collId of ['paths', 'programs', 'campaigns', 'volunteer_positions']) {
        try {
            const docs = await databases.listDocuments(DATABASE_ID, collId, []);
            for (const doc of docs.documents) {
                await databases.deleteDocument(DATABASE_ID, collId, doc.$id);
            }
            console.log(`   Cleared ${collId}`);
        } catch (e) { /* ignore */ }
    }

    // Seed Paths
    console.log('\n📂 Seeding Paths...');
    const pathsData = [
        { slug: 'education-empowerment', title_en: 'Education & Empowerment', title_ar: 'التعليم والتمكين', descriptionEn: 'Providing quality education and skills training.', description_ar: 'توفير تعليم عالي الجودة وتدريب على المهارات.', icon: 'GraduationCap', order_priority: 1, status: 'active' },
        { slug: 'sponsoring-reformers', title_en: 'Sponsoring Reformers', title_ar: 'رعاية المصلحين', descriptionEn: 'Supporting emerging community leaders.', description_ar: 'دعم قادة المجتمع الناشئين.', icon: 'Users', order_priority: 2, status: 'active' },
        { slug: 'educational-nurseries', title_en: 'Educational Nurseries', title_ar: 'الحضانات التعليمية', descriptionEn: 'Early childhood education centers.', description_ar: 'مراكز التعليم المبكر للأطفال.', icon: 'Baby', order_priority: 3, status: 'active' },
        { slug: 'general-reform-programs', title_en: 'General Reform Programs', title_ar: 'برامج الإصلاح العامة', descriptionEn: 'Sustainable community development.', description_ar: 'التنمية المجتمعية المستدامة.', icon: 'Heart', order_priority: 4, status: 'active' },
    ];

    const pathIdMap: Record<string, string> = {};
    for (const path of pathsData) {
        try {
            const filtered = filterData(path, pathsAttrs);
            const doc = await databases.createDocument(DATABASE_ID, 'paths', ID.unique(), filtered);
            pathIdMap[path.slug] = doc.$id;
            console.log(`   ✅ ${path.titleEn}`);
        } catch (e: any) {
            console.log(`   ❌ ${path.titleEn}: ${e.message}`);
        }
    }

    // Seed Programs
    console.log('\n📂 Seeding Programs...');
    const programsData = [
        { slug: 'scholarship-program', title_en: 'Scholarship Program', title_ar: 'برنامج المنح الدراسية', summary_en: 'Scholarships for students', summary_ar: 'منح للطلاب', cover_image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', zakatSupported: true, pathId: pathIdMap['education-empowerment'], status: 'published' },
        { slug: 'skills-training', title_en: 'Skills Training Center', title_ar: 'مركز التدريب المهني', summary_en: 'Vocational training', summary_ar: 'تدريب مهني', cover_image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', zakatSupported: false, pathId: pathIdMap['education-empowerment'], status: 'published' },
        { slug: 'community-leaders', title_en: 'Community Leaders Program', title_ar: 'برنامج قادة المجتمع', summary_en: 'Leadership development', summary_ar: 'تطوير القيادة', cover_image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', zakatSupported: true, pathId: pathIdMap['sponsoring-reformers'], status: 'published' },
    ];

    for (const program of programsData) {
        try {
            const filtered = filterData(program, programsAttrs);
            await databases.createDocument(DATABASE_ID, 'programs', ID.unique(), filtered);
            console.log(`   ✅ ${program.titleEn}`);
        } catch (e: any) {
            console.log(`   ❌ ${program.titleEn}: ${e.message}`);
        }
    }

    // Seed Campaigns
    console.log('\n📂 Seeding Campaigns...');
    const campaignsData = [
        { slug: 'emergency-food-drive', title_en: 'Emergency Food Drive', title_ar: 'حملة الغذاء الطارئة', descriptionEn: 'Food supplies for families in need.', description_ar: 'مواد غذائية للعائلات المحتاجة.', goal_amount: 180000, raised_amount: 85000, currency: 'QAR', is_urgent: true, zakatSupported: true, is_featured: true, cover_image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800', status: 'active' },
        { slug: 'clean-water-for-all', title_en: 'Clean Water for All', title_ar: 'مياه نظيفة للجميع', descriptionEn: 'Water wells and purification.', description_ar: 'آبار المياه والتنقية.', goal_amount: 270000, raised_amount: 248000, currency: 'QAR', is_urgent: false, zakatSupported: false, is_featured: true, cover_image_url: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800', status: 'active' },
        { slug: 'education-support', title_en: 'Education Support Program', title_ar: 'برنامج دعم التعليم', descriptionEn: 'School supplies for children.', description_ar: 'لوازم مدرسية للأطفال.', goal_amount: 90000, raised_amount: 41000, currency: 'QAR', is_urgent: false, zakatSupported: true, is_featured: true, cover_image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', status: 'active' },
    ];

    for (const campaign of campaignsData) {
        try {
            const filtered = filterData(campaign, campaignsAttrs);
            await databases.createDocument(DATABASE_ID, 'campaigns', ID.unique(), filtered);
            console.log(`   ✅ ${campaign.titleEn}`);
        } catch (e: any) {
            console.log(`   ❌ ${campaign.titleEn}: ${e.message}`);
        }
    }

    // Seed Volunteer Positions
    console.log('\n📂 Seeding Volunteer Positions...');
    const positionsData = [
        { slug: 'event-staff', title_en: 'Event Staff', title_ar: 'طاقم الفعاليات', type: 'onsite', status: 'active' },
        { slug: 'social-media', title_en: 'Social Media Coordinator', title_ar: 'منسق التواصل', type: 'remote', status: 'active' },
        { slug: 'grant-writer', title_en: 'Grant Writer', title_ar: 'كاتب المنح', type: 'remote', status: 'active' },
    ];

    for (const position of positionsData) {
        try {
            const filtered = filterData(position, positionsAttrs);
            await databases.createDocument(DATABASE_ID, 'volunteer_positions', ID.unique(), filtered);
            console.log(`   ✅ ${position.titleEn}`);
        } catch (e: any) {
            console.log(`   ❌ ${position.titleEn}: ${e.message}`);
        }
    }

    // Verify
    console.log('\n📊 Verification:');
    for (const collId of ['paths', 'programs', 'campaigns', 'volunteer_positions']) {
        const result = await databases.listDocuments(DATABASE_ID, collId, []);
        console.log(`   ${collId}: ${result.total} documents`);
    }

    console.log('\n🎉 Seed complete!');
}

seed().catch(console.error);
