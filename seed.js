import { Client, Databases, Permission, Role, ID } from 'node-appwrite';

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
    endpoint: 'https://sgp.cloud.appwrite.io/v1', // Or your self-hosted endpoint
    projectId: 'sawaid',             // Replace with your Project ID
    apiKey: 'standard_79187b663468a4a2b4ebd061d5e12ef8e1a399e2a6f5e4a87ad266b38236a44fc300d02e4318953158b8bb12da2e2f65f4567706eba1ec473235575011a8c7445dcea7b8b05e4739706a529f249ad7c6ac2ada45b3ed598cbb2d87a72cf4e04751cc082d9d9b17fab0918bdc6b9f965c1ec41628fc1f269152b09e7f25364903',                   // Replace with your API Key
    dbId: 'sawaid_db_test',                   // Database ID from your spec
    dbName: 'Sawaid Platform DB'
};

const client = new Client()
    .setEndpoint(CONFIG.endpoint)
    .setProject(CONFIG.projectId)
    .setKey(CONFIG.apiKey);

const databases = new Databases(client);

// ==========================================
// 2. SCHEMA DEFINITION
// ==========================================
// ==========================================
// 2. SCHEMA DEFINITION (CORRECTED)
// ==========================================
const SCHEMA = [
    {
        name: 'paths',
        id: 'paths',
        permissions: [
            Permission.read(Role.any()),
            Permission.write(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'slug', type: 'string', size: 255, required: true },
            { key: 'titleEn', type: 'string', size: 255, required: true },
            { key: 'titleAr', type: 'string', size: 255, required: true },
            { key: 'descriptionEn', type: 'string', size: 2000, required: false },
            { key: 'descriptionAr', type: 'string', size: 2000, required: false },
            { key: 'icon', type: 'string', size: 100, required: true },
            { key: 'coverImageUrl', type: 'url', required: false },
            { key: 'displayOrder', type: 'integer', required: false, default: 0 },
            { key: 'isActive', type: 'boolean', required: false, default: true },
        ],
        indexes: [
            { key: 'idx_slug', type: 'unique', attributes: ['slug'] },
            { key: 'idx_sort_active', type: 'key', attributes: ['isActive', 'displayOrder'] }
        ]
    },
    {
        name: 'programs',
        id: 'programs',
        permissions: [
            Permission.read(Role.any()),
            Permission.write(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'pathId', type: 'string', size: 50, required: true },
            { key: 'slug', type: 'string', size: 255, required: true },
            { key: 'titleEn', type: 'string', size: 255, required: true },
            { key: 'titleAr', type: 'string', size: 255, required: true },
            { key: 'summaryEn', type: 'string', size: 1000, required: false },
            { key: 'summaryAr', type: 'string', size: 1000, required: false },
            { key: 'descriptionEn', type: 'string', size: 2000, required: false }, // REDUCED SIZE
            { key: 'descriptionAr', type: 'string', size: 2000, required: false }, // REDUCED SIZE
            { key: 'zakatSupported', type: 'boolean', required: false, default: false },
            { key: 'coverImageUrl', type: 'url', required: false },
            { key: 'displayOrder', type: 'integer', required: false, default: 0 },
            { key: 'isActive', type: 'boolean', required: false, default: true },
        ],
        indexes: [
            { key: 'idx_slug', type: 'unique', attributes: ['slug'] },
            { key: 'idx_path_list', type: 'key', attributes: ['pathId', 'isActive', 'displayOrder'] },
            { key: 'idx_zakat', type: 'key', attributes: ['zakatSupported'] }
        ]
    },
    {
        name: 'campaigns',
        id: 'campaigns',
        permissions: [
            Permission.read(Role.any()),
            Permission.write(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'programId', type: 'string', size: 50, required: false },
            { key: 'slug', type: 'string', size: 255, required: true },
            { key: 'titleEn', type: 'string', size: 255, required: true },
            { key: 'titleAr', type: 'string', size: 255, required: true },
            { key: 'summaryEn', type: 'string', size: 1000, required: false },
            { key: 'summaryAr', type: 'string', size: 1000, required: false },
            { key: 'descriptionEn', type: 'string', size: 2000, required: false }, // REDUCED SIZE
            { key: 'descriptionAr', type: 'string', size: 2000, required: false }, // REDUCED SIZE
            { key: 'goalAmount', type: 'double', required: true }, // REMOVED DEFAULT
            { key: 'raisedAmount', type: 'double', required: false, default: 0 },
            { key: 'currency', type: 'string', size: 10, required: false, default: 'QAR' },
            { key: 'isUrgent', type: 'boolean', required: false, default: false },
            { key: 'zakatSupported', type: 'boolean', required: false, default: false },
            { key: 'coverImageUrl', type: 'url', required: false },
            { key: 'galleryUrls', type: 'url', required: false, array: true },
            { key: 'startDate', type: 'datetime', required: false },
            { key: 'endDate', type: 'datetime', required: false },
            { key: 'isFeatured', type: 'boolean', required: false, default: false },
            { key: 'isActive', type: 'boolean', required: false, default: true },
            { key: 'beneficiaryCount', type: 'integer', required: false },
            { key: 'location', type: 'string', size: 255, required: false },
        ],
        indexes: [
            { key: 'idx_slug', type: 'unique', attributes: ['slug'] },
            { key: 'idx_prog_active', type: 'key', attributes: ['programId', 'isActive'] },
            { key: 'idx_urgent', type: 'key', attributes: ['isUrgent', 'isActive'] },
            { key: 'idx_featured', type: 'key', attributes: ['isFeatured', 'isActive'] },
            { key: 'idx_zakat', type: 'key', attributes: ['zakatSupported'] }
        ]
    },
    {
        name: 'donations',
        id: 'donations',
        permissions: [
            Permission.create(Role.any()),
            Permission.read(Role.team('admins')),
            Permission.read(Role.user(ID.custom('owner'))),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'campaignId', type: 'string', size: 50, required: false },
            { key: 'programId', type: 'string', size: 50, required: false },
            { key: 'amount', type: 'double', required: true },
            { key: 'currency', type: 'string', size: 10, required: false, default: 'QAR' },
            { key: 'donorName', type: 'string', size: 255, required: false },
            { key: 'donorEmail', type: 'email', required: false },
            { key: 'isAnonymous', type: 'boolean', required: false, default: false },
            { key: 'isRecurring', type: 'boolean', required: false, default: false },
            { key: 'paymentRef', type: 'string', size: 255, required: false },
            { key: 'status', type: 'string', size: 50, required: false, default: 'pending' },
            { key: 'donationType', type: 'string', size: 50, required: false, default: 'general' },
            { key: 'message', type: 'string', size: 2000, required: false },
            { key: 'receiptUrl', type: 'url', required: false },
        ],
        indexes: [
            { key: 'idx_campaign_stats', type: 'key', attributes: ['campaignId', 'status'] },
            { key: 'idx_status', type: 'key', attributes: ['status'] },
            { key: 'idx_donor_email', type: 'key', attributes: ['donorEmail'] },
            { key: 'idx_created', type: 'key', attributes: ['$createdAt'] }
        ]
    },
    {
        name: 'volunteers',
        id: 'volunteers',
        permissions: [
            Permission.create(Role.any()),
            Permission.read(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'fullName', type: 'string', size: 255, required: true },
            { key: 'email', type: 'email', required: true },
            { key: 'phone', type: 'string', size: 50, required: false },
            { key: 'positionId', type: 'string', size: 50, required: false },
            { key: 'skills', type: 'string', size: 255, required: false, array: true },
            { key: 'availability', type: 'string', size: 1000, required: false },
            { key: 'message', type: 'string', size: 2000, required: false },
            { key: 'status', type: 'string', size: 50, required: false, default: 'new' },
            { key: 'resumeUrl', type: 'url', required: false },
        ],
        indexes: [
            { key: 'idx_status', type: 'key', attributes: ['status'] },
            { key: 'idx_email', type: 'unique', attributes: ['email'] }
        ]
    },
    {
        name: 'sponsors',
        id: 'sponsors',
        permissions: [
            Permission.create(Role.any()),
            Permission.read(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'organizationName', type: 'string', size: 255, required: true },
            { key: 'contactName', type: 'string', size: 255, required: true },
            { key: 'email', type: 'email', required: true },
            { key: 'phone', type: 'string', size: 50, required: false },
            { key: 'website', type: 'url', required: false },
            { key: 'message', type: 'string', size: 2000, required: false },
            { key: 'sponsorType', type: 'string', size: 50, required: false, default: 'general' },
            { key: 'logoUrl', type: 'url', required: false },
            { key: 'isDisplayed', type: 'boolean', required: false, default: false },
            { key: 'status', type: 'string', size: 50, required: false, default: 'new' },
        ]
    },
    {
        name: 'media_assets',
        id: 'media_assets',
        permissions: [
            Permission.read(Role.any()),
            Permission.write(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'type', type: 'string', size: 20, required: true },
            { key: 'titleEn', type: 'string', size: 255, required: false },
            { key: 'titleAr', type: 'string', size: 255, required: false },
            { key: 'url', type: 'url', required: true },
            { key: 'thumbnailUrl', type: 'url', required: false },
            { key: 'altText', type: 'string', size: 255, required: false }, // REDUCED SIZE
            { key: 'tags', type: 'string', size: 50, required: false, array: true },
            { key: 'campaignId', type: 'string', size: 50, required: false },
            { key: 'displayOrder', type: 'integer', required: false, default: 0 },
            { key: 'duration', type: 'integer', required: false },
            { key: 'fileSize', type: 'integer', required: false },
            { key: 'mimeType', type: 'string', size: 100, required: false },
        ],
        indexes: [
            { key: 'idx_type', type: 'key', attributes: ['type'] },
            { key: 'idx_campaign', type: 'key', attributes: ['campaignId'] },
            { key: 'idx_sort', type: 'key', attributes: ['displayOrder'] }
        ]
    },
    {
        name: 'posts',
        id: 'posts',
        permissions: [
            Permission.read(Role.any()),
            Permission.write(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'slug', type: 'string', size: 255, required: true },
            { key: 'titleEn', type: 'string', size: 255, required: true },
            { key: 'titleAr', type: 'string', size: 255, required: true },
            { key: 'excerptEn', type: 'string', size: 1000, required: false },
            { key: 'excerptAr', type: 'string', size: 1000, required: false },
            { key: 'contentEn', type: 'string', size: 100000, required: false }, // KEPT LARGE (Appwrite converts > 16k to MediumText automatically)
            { key: 'contentAr', type: 'string', size: 100000, required: false },
            { key: 'coverImageUrl', type: 'url', required: false },
            { key: 'category', type: 'string', size: 50, required: false, default: 'news' },
            { key: 'authorName', type: 'string', size: 100, required: false },
            { key: 'publishedAt', type: 'datetime', required: false },
            { key: 'isPublished', type: 'boolean', required: false, default: false },
            { key: 'metaTitle', type: 'string', size: 100, required: false },
            { key: 'metaDescription', type: 'string', size: 200, required: false },
            { key: 'tags', type: 'string', size: 50, required: false, array: true },
        ],
        indexes: [
            { key: 'idx_slug', type: 'unique', attributes: ['slug'] },
            { key: 'idx_pub_date', type: 'key', attributes: ['isPublished', 'publishedAt'] },
            { key: 'idx_category', type: 'key', attributes: ['category', 'isPublished'] }
        ]
    },
    {
        name: 'reports',
        id: 'reports',
        permissions: [
            Permission.read(Role.any()),
            Permission.write(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'year', type: 'integer', required: true },
            { key: 'titleEn', type: 'string', size: 255, required: true },
            { key: 'titleAr', type: 'string', size: 255, required: true },
            { key: 'descriptionEn', type: 'string', size: 1000, required: false },
            { key: 'descriptionAr', type: 'string', size: 1000, required: false },
            { key: 'pdfUrl', type: 'url', required: true },
            { key: 'reportType', type: 'string', size: 50, required: false, default: 'annual' },
            { key: 'isPublished', type: 'boolean', required: false, default: true },
            { key: 'coverImageUrl', type: 'url', required: false },
            { key: 'fileSize', type: 'integer', required: false },
        ],
        indexes: [
            { key: 'idx_year_sort', type: 'key', attributes: ['year', 'isPublished'] },
            { key: 'idx_type', type: 'key', attributes: ['reportType', 'isPublished'] }
        ]
    },
    {
        name: 'contact_submissions',
        id: 'contact_submissions',
        permissions: [
            Permission.create(Role.any()),
            Permission.read(Role.team('admins')),
            Permission.update(Role.team('admins')),
            Permission.delete(Role.team('admins')),
        ],
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'email', type: 'email', required: true },
            { key: 'phone', type: 'string', size: 50, required: false },
            { key: 'subject', type: 'string', size: 255, required: false },
            { key: 'message', type: 'string', size: 5000, required: true },
            { key: 'status', type: 'string', size: 50, required: false, default: 'new' },
        ]
    }
];

// ==========================================
// 3. UTILITY FUNCTIONS
// ==========================================
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createDatabase() {
    try {
        await databases.get(CONFIG.dbId);
        console.log(`✅ Database '${CONFIG.dbId}' already exists.`);
    } catch (error) {
        if (error.code === 404) {
            await databases.create(CONFIG.dbId, CONFIG.dbName);
            console.log(`✅ Database '${CONFIG.dbId}' created.`);
        } else {
            throw error;
        }
    }
}

async function createAttribute(collectionId, attr) {
    try {
        // Check if exists first to avoid error spam
        await databases.getAttribute(CONFIG.dbId, collectionId, attr.key);
        console.log(`   - Attribute '${attr.key}' already exists.`);
    } catch (error) {
        console.log(`   + Creating attribute '${attr.key}' (${attr.type})...`);
        try {
            switch (attr.type) {
                case 'string':
                    await databases.createStringAttribute(CONFIG.dbId, collectionId, attr.key, attr.size || 255, attr.required, attr.default, attr.array || false);
                    break;
                case 'integer':
                    await databases.createIntegerAttribute(CONFIG.dbId, collectionId, attr.key, attr.required, 0, 2147483647, attr.default, attr.array || false);
                    break;
                case 'double':
                    await databases.createFloatAttribute(CONFIG.dbId, collectionId, attr.key, attr.required, 0, null, attr.default, attr.array || false);
                    break;
                case 'boolean':
                    await databases.createBooleanAttribute(CONFIG.dbId, collectionId, attr.key, attr.required, attr.default, attr.array || false);
                    break;
                case 'email':
                    await databases.createEmailAttribute(CONFIG.dbId, collectionId, attr.key, attr.required, attr.default, attr.array || false);
                    break;
                case 'url':
                    await databases.createUrlAttribute(CONFIG.dbId, collectionId, attr.key, attr.required, attr.default, attr.array || false);
                    break;
                case 'datetime':
                    await databases.createDatetimeAttribute(CONFIG.dbId, collectionId, attr.key, attr.required, attr.default, attr.array || false);
                    break;
                default:
                    console.error(`   ! Unknown Type: ${attr.type}`);
            }
            // Add a tiny delay to allow Appwrite to register the attribute request
            await sleep(200); 
        } catch (creationError) {
            console.error(`   !!! Failed to create attribute ${attr.key}:`, creationError.message);
        }
    }
}

async function createIndex(collectionId, index) {
    try {
        await databases.getIndex(CONFIG.dbId, collectionId, index.key);
        console.log(`   - Index '${index.key}' already exists.`);
    } catch (error) {
        console.log(`   + Creating index '${index.key}'...`);
        try {
            // Wait for attributes to be "available" before indexing
            // In a real script, you might poll attribute status, but a sleep helps significantly
            await sleep(1000); 
            await databases.createIndex(CONFIG.dbId, collectionId, index.key, index.type, index.attributes);
        } catch (creationError) {
            // Often fails if attributes are still processing. 
            console.error(`   !!! Failed to create index ${index.key}. Attributes might still be processing. Run script again in 1 minute.`);
        }
    }
}

// ==========================================
// 4. MAIN EXECUTION
// ==========================================
async function init() {
    console.log('🚀 Starting Sawaid DB Initialization...');
    
    // 1. Database
    await createDatabase();

    // 2. Collections
    for (const col of SCHEMA) {
        console.log(`\n👉 Processing Collection: ${col.name}`);
        
        try {
            await databases.getCollection(CONFIG.dbId, col.id);
            console.log(`   - Collection exists.`);
        } catch (error) {
            if (error.code === 404) {
                await databases.createCollection(CONFIG.dbId, col.id, col.name, col.permissions);
                console.log(`   ✅ Created collection.`);
            }
        }

        // 3. Attributes
        console.log(`   - Checking Attributes...`);
        for (const attr of col.attributes) {
            await createAttribute(col.id, attr);
        }

        // 4. Indexes
        if (col.indexes && col.indexes.length > 0) {
            console.log(`   - Checking Indexes...`);
            // We wait a bit to ensure attributes are processed by Appwrite worker
            await sleep(2000); 
            for (const idx of col.indexes) {
                await createIndex(col.id, idx);
            }
        }
    }

    console.log('\n\n✅ Initialization Complete!');
    console.log('NOTE: If any indexes failed, it is likely because attributes were still "processing". Wait 1 minute and run the script again.');
}

init().catch(console.error);