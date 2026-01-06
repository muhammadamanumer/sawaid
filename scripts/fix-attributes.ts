import { Client, Databases, ID } from 'node-appwrite';
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function addMissingAttributes() {
    console.log('Adding missing attributes to paths collection...\n');

    // Check current state
    const coll = await databases.getCollection(DATABASE_ID, 'paths');
    const existingKeys = new Set(coll.attributes.map((a: any) => a.key));
    console.log('Existing attributes:', Array.from(existingKeys));

    // Add icon if missing
    if (!existingKeys.has('icon')) {
        try {
            await databases.createStringAttribute(DATABASE_ID, 'paths', 'icon', 50, true, 'Heart');
            console.log('✅ Created icon attribute');
            await delay(2000); // Wait for Appwrite to process
        } catch (e: any) {
            console.log('icon error:', e.message);
        }
    }

    // Add order_priority if missing
    if (!existingKeys.has('order_priority')) {
        try {
            await databases.createIntegerAttribute(DATABASE_ID, 'paths', 'order_priority', true, undefined, undefined, 0);
            console.log('✅ Created order_priority attribute');
            await delay(2000);
        } catch (e: any) {
            console.log('order_priority error:', e.message);
        }
    }

    // Add status if missing
    if (!existingKeys.has('status')) {
        try {
            await databases.createEnumAttribute(DATABASE_ID, 'paths', 'status', ['active', 'inactive'], true, 'active');
            console.log('✅ Created status attribute');
            await delay(2000);
        } catch (e: any) {
            console.log('status error:', e.message);
        }
    }

    // Now do the same for campaigns
    console.log('\nAdding missing attributes to campaigns collection...');
    const campColl = await databases.getCollection(DATABASE_ID, 'campaigns');
    const campKeys = new Set(campColl.attributes.map((a: any) => a.key));
    console.log('Existing attributes:', Array.from(campKeys));

    const campaignAttrs = [
        { key: 'is_urgent', fn: () => databases.createBooleanAttribute(DATABASE_ID, 'campaigns', 'is_urgent', true, false) },
        { key: 'zakatSupported', fn: () => databases.createBooleanAttribute(DATABASE_ID, 'campaigns', 'zakatSupported', true, false) },
        { key: 'is_featured', fn: () => databases.createBooleanAttribute(DATABASE_ID, 'campaigns', 'is_featured', true, false) },
        { key: 'status', fn: () => databases.createEnumAttribute(DATABASE_ID, 'campaigns', 'status', ['active', 'completed', 'cancelled'], true, 'active') },
    ];

    for (const attr of campaignAttrs) {
        if (!campKeys.has(attr.key)) {
            try {
                await attr.fn();
                console.log(`✅ Created ${attr.key} attribute`);
                await delay(2000);
            } catch (e: any) {
                console.log(`${attr.key} error:`, e.message);
            }
        }
    }

    // Programs
    console.log('\nAdding missing attributes to programs collection...');
    const progColl = await databases.getCollection(DATABASE_ID, 'programs');
    const progKeys = new Set(progColl.attributes.map((a: any) => a.key));
    console.log('Existing attributes:', Array.from(progKeys));

    const programAttrs = [
        { key: 'zakatSupported', fn: () => databases.createBooleanAttribute(DATABASE_ID, 'programs', 'zakatSupported', true, false) },
        { key: 'status', fn: () => databases.createEnumAttribute(DATABASE_ID, 'programs', 'status', ['draft', 'published', 'archived'], true, 'published') },
    ];

    for (const attr of programAttrs) {
        if (!progKeys.has(attr.key)) {
            try {
                await attr.fn();
                console.log(`✅ Created ${attr.key} attribute`);
                await delay(2000);
            } catch (e: any) {
                console.log(`${attr.key} error:`, e.message);
            }
        }
    }

    // volunteer_positions
    console.log('\nAdding missing attributes to volunteer_positions collection...');
    const volColl = await databases.getCollection(DATABASE_ID, 'volunteer_positions');
    const volKeys = new Set(volColl.attributes.map((a: any) => a.key));
    console.log('Existing attributes:', Array.from(volKeys));

    const volAttrs = [
        { key: 'type', fn: () => databases.createEnumAttribute(DATABASE_ID, 'volunteer_positions', 'type', ['remote', 'onsite', 'hybrid'], true, 'remote') },
        { key: 'status', fn: () => databases.createEnumAttribute(DATABASE_ID, 'volunteer_positions', 'status', ['active', 'inactive'], true, 'active') },
    ];

    for (const attr of volAttrs) {
        if (!volKeys.has(attr.key)) {
            try {
                await attr.fn();
                console.log(`✅ Created ${attr.key} attribute`);
                await delay(2000);
            } catch (e: any) {
                console.log(`${attr.key} error:`, e.message);
            }
        }
    }

    console.log('\n✅ Done adding attributes. Wait 30 seconds for Appwrite to fully process, then run seed script.');
}

addMissingAttributes().catch(console.error);
