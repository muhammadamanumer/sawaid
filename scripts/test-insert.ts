import { Client, Databases, Query } from 'node-appwrite';
import dotenv from 'dotenv';
import * as fs from 'fs';

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

async function testInsert() {
    const logFile = 'scripts/test-output.log';
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + '\n');
    };

    fs.writeFileSync(logFile, '=== Test Output ===\n');
    log(`Endpoint: ${ENDPOINT}`);
    log(`Project: ${PROJECT_ID}`);
    log(`Database: ${DATABASE_ID}`);

    // First, list the attributes of 'paths' collection
    try {
        const coll = await databases.getCollection(DATABASE_ID, 'paths');
        log(`\nPaths collection has ${coll.attributes.length} attributes:`);
        for (const attr of coll.attributes) {
            log(`  - ${(attr as any).key}: ${(attr as any).type} (required: ${(attr as any).required}, default: ${(attr as any).default})`);
        }
    } catch (e: any) {
        log(`Failed to get collection: ${e.message}`);
    }

    // Try inserting
    try {
        log('\nAttempting insert...');
        const result = await databases.createDocument(
            DATABASE_ID,
            'paths',
            'test-path-123',
            {
                slug: 'test-path-123',
                title_en: 'Test Path',
                title_ar: 'مسار تجريبي',
                icon: 'Heart',
                order_priority: 1,
            }
        );
        log(`SUCCESS! Doc ID: ${result.$id}`);
    } catch (e: any) {
        log(`ERROR: ${e.message}`);
        log(`Type: ${e.type}`);
        log(`Code: ${e.code}`);
        log(`Response: ${e.response}`);
    }

    log('\nDone. Check scripts/test-output.log for full output.');
}

testInsert().catch(e => {
    fs.appendFileSync('scripts/test-output.log', `UNCAUGHT: ${e.message}\n`);
    console.error(e);
});
