import { Client, Databases, Query } from 'node-appwrite';
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

async function diagnose() {
    console.log('🔍 Diagnosing Appwrite Collections...\n');

    const collections = ['paths', 'programs', 'campaigns', 'donations', 'volunteers', 'volunteer_positions', 'posts'];

    for (const collId of collections) {
        try {
            const coll = await databases.getCollection(DATABASE_ID, collId);
            console.log(`\n📂 ${coll.name} (${collId})`);
            console.log(`   Attributes: ${coll.attributes.length}`);

            // List attributes
            for (const attr of coll.attributes) {
                console.log(`   - ${(attr as any).key}: ${(attr as any).type} (status: ${(attr as any).status})`);
            }

            // Try to list documents
            const docs = await databases.listDocuments(DATABASE_ID, collId, [Query.limit(5)]);
            console.log(`   Documents: ${docs.total}`);
            if (docs.documents.length > 0) {
                console.log(`   Sample: ${JSON.stringify(docs.documents[0], null, 2).substring(0, 200)}...`);
            }
        } catch (e: any) {
            console.log(`❌ Error with ${collId}: ${e.message}`);
        }
    }
}

diagnose().catch(console.error);
