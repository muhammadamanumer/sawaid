import { Client, Databases } from 'node-appwrite';
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

async function check() {
    const collections = ['paths', 'programs', 'campaigns', 'volunteer_positions'];

    for (const collId of collections) {
        console.log(`\n=== ${collId} ===`);
        try {
            const coll = await databases.getCollection(DATABASE_ID, collId);
            for (const attr of coll.attributes) {
                const a = attr as any;
                console.log(`  ${a.key}: ${a.type} [status: ${a.status}]`);
            }
        } catch (e: any) {
            console.log(`  Error: ${e.message}`);
        }
    }
}

check().catch(console.error);
