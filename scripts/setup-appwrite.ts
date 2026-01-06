import { Client, Databases, Storage, ID, Permission, Role, Compression } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const API_KEY = process.env.APPWRITE_API_KEY;
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1'; // Default to cloud
const DATABASE_NAME = 'sawaed_core';

if (!PROJECT_ID || !API_KEY) {
    console.error('❌ Error: NEXT_PUBLIC_APPWRITE_PROJECT_ID and APPWRITE_API_KEY must be set in .env.local');
    console.error('Current Values:', {
        PROJECT_ID: PROJECT_ID ? (PROJECT_ID.substring(0, 4) + '***') : 'undefined',
        API_KEY: API_KEY ? '***' : 'undefined',
        ENDPOINT: ENDPOINT
    });
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

async function setup() {
    console.log('🚀 Starting Appwrite Setup...');
    console.log(`📡 Endpoint: ${ENDPOINT}`);
    console.log(`🆔 Project ID: ${PROJECT_ID}`);


    // 1. Create Database
    let dbId = DATABASE_NAME;
    try {
        await databases.get(DATABASE_NAME);
        console.log(`✅ Database '${DATABASE_NAME}' already exists.`);
    } catch (error) {
        try {
            await databases.create(DATABASE_NAME, DATABASE_NAME);
            console.log(`✅ Created Database '${DATABASE_NAME}'.`);
        } catch (createError) {
            console.log(`ℹ️  Note: Database might have different ID structure, trying to proceed if it exists or failing safely.`);
        }
    }

    // Helper to create collection if not exists
    const createCollection = async (id: string, name: string, permissions: string[] = []) => {
        try {
            await databases.getCollection(DATABASE_NAME, id);
            console.log(`✅ Collection '${name}' (${id}) already exists.`);
        } catch (error) {
            await databases.createCollection(DATABASE_NAME, id, name, permissions);
            console.log(`✅ Created Collection '${name}' (${id}).`);
        }
        // We intentionally don't handle attributes update here to simplify, 
        // we just try to create attributes and ignore if they exist.
    };

    // Helper to create string attribute
    const createString = async (collId: string, key: string, size: number, required: boolean, def?: string, array: boolean = false) => {
        try {
            await databases.createStringAttribute(DATABASE_NAME, collId, key, size, required, def, array);
            console.log(`   + Attribute '${key}' created.`);
        } catch (e) { /* Ignore if exists */ }
    };

    // Helper to create other attributes
    const createInteger = async (collId: string, key: string, required: boolean, min?: number, max?: number, def?: number) => {
        try { await databases.createIntegerAttribute(DATABASE_NAME, collId, key, required, min, max, def); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };
    const createFloat = async (collId: string, key: string, required: boolean, min?: number, max?: number, def?: number) => {
        try { await databases.createFloatAttribute(DATABASE_NAME, collId, key, required, min, max, def); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };
    const createBoolean = async (collId: string, key: string, required: boolean, def?: boolean) => {
        try { await databases.createBooleanAttribute(DATABASE_NAME, collId, key, required, def); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };
    const createUrl = async (collId: string, key: string, required: boolean, def?: string, array: boolean = false) => {
        try { await databases.createUrlAttribute(DATABASE_NAME, collId, key, required, def, array); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };
    const createEmail = async (collId: string, key: string, required: boolean, def?: string, array: boolean = false) => {
        try { await databases.createEmailAttribute(DATABASE_NAME, collId, key, required, def, array); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };
    const createDatetime = async (collId: string, key: string, required: boolean, def?: string, array: boolean = false) => {
        try { await databases.createDatetimeAttribute(DATABASE_NAME, collId, key, required, def, array); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };
    const createEnum = async (collId: string, key: string, elements: string[], required: boolean, def?: string, array: boolean = false) => {
        try { await databases.createEnumAttribute(DATABASE_NAME, collId, key, elements, required, def, array); console.log(`   + Attribute '${key}' created.`); } catch (e) { }
    };


    // --- 1. Paths ---
    await createCollection('paths', 'Paths', [
        Permission.read(Role.any()),
        Permission.write(Role.team('admins')), // Admins can write
    ]);
    await createString('paths', 'slug', 128, true);
    await createString('paths', 'title_en', 255, true);
    await createString('paths', 'title_ar', 255, true);
    await createString('paths', 'descriptionEn', 5000, false);
    await createString('paths', 'description_ar', 5000, false);
    await createString('paths', 'icon', 50, true, 'Heart');
    await createInteger('paths', 'order_priority', true, undefined, undefined, 0);
    await createEnum('paths', 'status', ['active', 'inactive'], true, 'active');

    // --- 2. Programs ---
    await createCollection('programs', 'Programs', [
        Permission.read(Role.any()),
        Permission.write(Role.team('admins')),
    ]);
    await createString('programs', 'slug', 128, true);
    await createString('programs', 'title_en', 255, true);
    await createString('programs', 'title_ar', 255, true);
    await createString('programs', 'summary_en', 500, false);
    await createString('programs', 'summary_ar', 500, false);
    await createString('programs', 'descriptionEn', 10000, false);
    await createString('programs', 'description_ar', 10000, false);
    await createUrl('programs', 'cover_image_url', false);
    await createUrl('programs', 'gallery_images', false, undefined, true);
    await createBoolean('programs', 'zakatSupported', true, false);
    await createEnum('programs', 'status', ['draft', 'published', 'archived'], true, 'draft');
    await createFloat('programs', 'target_amount', false);
    await createFloat('programs', 'current_amount', false, undefined, undefined, 0.0);
    await createDatetime('programs', 'start_date', false);
    await createDatetime('programs', 'end_date', false);
    // Relationships (Create manually or via advanced script - sticking to fields for now or simple relation if easy)
    // Appwrite Node SDK requires creating relationship attribute specifically.
    // We will assume 'pathId' string for now or try to create relationship if supported well in this version.
    // Using String ID for simplicity in script, can replace with Relationship in UI or advanced script.
    await createString('programs', 'pathId', 255, false); // Foreign Key manual

    // --- 3. Campaigns ---
    await createCollection('campaigns', 'Campaigns', [
        Permission.read(Role.any()),
        Permission.write(Role.team('admins')),
    ]);
    await createString('campaigns', 'slug', 128, true);
    await createString('campaigns', 'title_en', 255, true);
    await createString('campaigns', 'title_ar', 255, true);
    await createString('campaigns', 'descriptionEn', 10000, false);
    await createString('campaigns', 'description_ar', 10000, false);
    await createFloat('campaigns', 'goal_amount', true);
    await createFloat('campaigns', 'raised_amount', true, undefined, undefined, 0.0);
    await createString('campaigns', 'currency', 3, true, 'QAR');
    await createBoolean('campaigns', 'is_urgent', true, false);
    await createBoolean('campaigns', 'zakatSupported', true, false);
    await createBoolean('campaigns', 'is_featured', true, false);
    await createUrl('campaigns', 'cover_image_url', false);
    await createUrl('campaigns', 'gallery_images', false, undefined, true);
    await createEnum('campaigns', 'status', ['active', 'completed', 'cancelled'], true, 'active');
    await createString('campaigns', 'program_id', 255, false); // Link to programs

    // --- 4. Donations ---
    await createCollection('donations', 'Donations', [
        Permission.create(Role.any()),        // Public can donate
        Permission.read(Role.team('admins')), // Only admins read
        Permission.update(Role.team('admins')),
        Permission.delete(Role.team('admins')),
    ]);
    await createString('donations', 'donor_first_name', 255, true);
    await createString('donations', 'donor_last_name', 255, true);
    await createEmail('donations', 'donor_email', true);
    await createString('donations', 'donor_phone', 50, false);
    await createFloat('donations', 'amount', true);
    await createString('donations', 'currency', 3, true);
    await createEnum('donations', 'donation_type', ['onetime', 'monthly'], true);
    await createBoolean('donations', 'zakat_eligible', true, false);
    await createBoolean('donations', 'is_anonymous', true, false);
    await createString('donations', 'message', 1000, false);
    await createString('donations', 'stripe_payment_intent_id', 255, false);
    await createString('donations', 'stripe_session_id', 255, false);
    await createString('donations', 'payment_status', 20, true, 'pending');
    await createBoolean('donations', 'receipt_sent', true, false);
    await createString('donations', 'campaign_id', 255, false); // Link to campaign

    // --- 5. Volunteers ---
    await createCollection('volunteers', 'Volunteers', [
        Permission.create(Role.any()),
        Permission.read(Role.team('admins')),
        Permission.update(Role.team('admins')),
    ]);
    await createString('volunteers', 'full_name', 255, true);
    await createEmail('volunteers', 'email', true);
    await createString('volunteers', 'phone', 50, false);
    await createString('volunteers', 'message', 2000, false);
    await createUrl('volunteers', 'cv_url', false);
    await createString('volunteers', 'status', 20, true, 'new');
    await createString('volunteers', 'position_id', 255, false);

    // --- 6. Volunteer Positions ---
    await createCollection('volunteer_positions', 'Volunteer Positions', [
        Permission.read(Role.any()),
        Permission.write(Role.team('admins')),
    ]);
    await createString('volunteer_positions', 'slug', 128, true);
    await createString('volunteer_positions', 'title_en', 255, true);
    await createString('volunteer_positions', 'title_ar', 255, true);
    await createEnum('volunteer_positions', 'type', ['remote', 'onsite', 'hybrid'], true, 'remote');
    await createEnum('volunteer_positions', 'status', ['active', 'inactive'], true, 'active');

    // --- 7. Media Assets ---
    await createCollection('media_assets', 'Media Assets', [
        Permission.read(Role.any()),
        Permission.write(Role.team('admins')),
    ]);
    await createEnum('media_assets', 'type', ['image', 'video'], true);
    await createUrl('media_assets', 'url', true);
    await createString('media_assets', 'title_en', 255, false);

    // --- 8. Contact Messages ---
    await createCollection('contact_messages', 'Contact Messages', [
        Permission.create(Role.any()),
        Permission.read(Role.team('admins')),
        Permission.update(Role.team('admins')),
    ]);
    await createString('contact_messages', 'name', 255, true);
    await createEmail('contact_messages', 'email', true);
    await createString('contact_messages', 'subject', 255, true);
    await createString('contact_messages', 'message', 5000, true);
    await createString('contact_messages', 'status', 20, true, 'new');

    // --- 9. Posts (News) ---
    await createCollection('posts', 'Posts', [
        Permission.read(Role.any()),
        Permission.write(Role.team('admins')),
    ]);
    await createString('posts', 'slug', 128, true);
    await createString('posts', 'title_en', 255, true);
    await createString('posts', 'title_ar', 255, true);
    await createString('posts', 'category', 50, true);
    await createEnum('posts', 'status', ['draft', 'published', 'archived'], true, 'draft');


    // --- Buckets ---
    try {
        await storage.getBucket('campaign-covers');
        console.log(`✅ Bucket 'campaign-covers' already exists.`);
    } catch {
        // createBucket(bucketId, name, permissions, fileSecurity, enabled, maximumFileSize, allowedFileExtensions, compression, encryption, antivirus)
        await storage.createBucket(
            'campaign-covers',
            'Campaign Covers',
            [Permission.read(Role.any()), Permission.write(Role.team('admins'))],
            false, // fileSecurity
            true, // enabled
            5000000, // maxFileSize (5MB)
            ['jpg', 'jpeg', 'png', 'webp'], // allowedFileExtensions
            Compression.Gzip // compression
        );
        console.log(`✅ Bucket 'campaign-covers' created.`);
    }

    try {
        await storage.getBucket('gallery');
        console.log(`✅ Bucket 'gallery' already exists.`);
    } catch {
        await storage.createBucket(
            'gallery',
            'Gallery',
            [Permission.read(Role.any()), Permission.write(Role.team('admins'))],
            false,
            true,
            10000000, // 10MB
            ['jpg', 'jpeg', 'png', 'webp'],
            Compression.Gzip
        );
        console.log(`✅ Bucket 'gallery' created.`);
    }

    console.log('🎉 Setup Complete! You can now use Appwrite.');
}

setup().catch(console.error);
